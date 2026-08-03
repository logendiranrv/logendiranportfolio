import React, { useState, useEffect } from 'react';
import telemetryAudio from '../utils/audio';

const bootLogs = [
  "BOOTING MISSION CONTROL...",
  "Loading Navigation Systems...",
  "Loading AI Modules...",
  "Connecting Satellites...",
  "Authenticating Commander...",
  "Mission Control Ready"
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress interval
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        // Random increment for realistic telemetry feel
        const inc = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + inc);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Map progress percentage to boot logs index
    const index = Math.min(
      bootLogs.length - 1,
      Math.floor((progress / 100) * bootLogs.length)
    );
    if (index !== logIndex) {
      setLogIndex(index);
      telemetryAudio.playTelemetryClick();
    }
  }, [progress, logIndex]);

  const handleLaunch = () => {
    telemetryAudio.playSuccessScan();
    setFadeOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  // Auto transition 1 second after 100% if user doesn't click
  useEffect(() => {
    if (isReady && !fadeOut) {
      const autoTimer = setTimeout(() => {
        telemetryAudio.playSuccessScan();
        setFadeOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }, 1200);
      return () => clearTimeout(autoTimer);
    }
  }, [isReady, fadeOut, onComplete]);

  return (
    <div className={`boot-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="boot-container">
        {/* NASA Telemetry Header */}
        <div className="boot-header">
          <div className="boot-badge">NASA / MC-2026</div>
          <div className="boot-status">SYSTEM INITIALIZATION</div>
        </div>

        {/* Orbiting Satellite Wireframe Icon */}
        <div className="boot-radar-circle">
          <div className="radar-sweep-line"></div>
          <div className="radar-core-dot"></div>
          <div className="orbit-ring">
            <div className="orbit-dot"></div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="boot-title">LOGENDIRAN</h1>
        <div className="boot-subtitle">MISSION CONTROL CENTER</div>

        {/* Terminal Boot Log Output */}
        <div className="boot-terminal">
          <div className="boot-terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="terminal-title">telemetry_boot.sh</span>
          </div>
          <div className="boot-terminal-body">
            {bootLogs.slice(0, logIndex + 1).map((log, i) => (
              <div key={i} className={`log-line ${i === logIndex ? 'active' : ''}`}>
                <span className="log-prefix">&gt;&gt;</span> {log}
                {i === logIndex && <span className="blinking-cursor">_</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="boot-progress-wrapper">
          <div className="boot-progress-text">
            <span>CORE BOOT SEQUENCE</span>
            <span className="progress-value">{progress}%</span>
          </div>
          <div className="boot-progress-track">
            <div
              className="boot-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
        </div>

        {/* Action Button once ready */}
        <button
          className={`boot-launch-btn interactive ${isReady ? 'ready' : ''}`}
          onClick={handleLaunch}
        >
          {isReady ? 'ENGAGE COMMAND CENTER →' : 'SYSTEM BOOTING...'}
        </button>

        {/* Footer telemetry notice */}
        <div className="boot-footer-note">
          SECURE QUANTUM TELEMETRY LINK • ENCRYPTION 256-BIT
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
