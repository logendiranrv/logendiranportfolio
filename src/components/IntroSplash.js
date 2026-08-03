import React, { useState, useEffect } from 'react';
import { FaTerminal, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const bootSequence = [
  "BOOT_SEQUENCE // KERNEL_INIT...",
  "DECRYPTION KEY ACCEPTED",
  "FETCHING DEVELOPER METRICS: LOGENDIRAN R",
  "COMPILING FULL STACK MODULES [REACT • NODE • MERN]",
  "SYSTEM MATRIX READY // ACCESS GRANTED"
];

const IntroSplash = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [seqIdx, setSeqIdx] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [readyToEnter, setReadyToEnter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setReadyToEnter(true);
          return 100;
        }
        return prev + 4;
      });
    }, 35);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const idx = Math.min(
      bootSequence.length - 1,
      Math.floor((progress / 100) * bootSequence.length)
    );
    setSeqIdx(idx);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const autoTimer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 600);
      }, 700);
      return () => clearTimeout(autoTimer);
    }
  }, [progress, onFinish]);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 600);
  };

  return (
    <div className={`cyber-intro-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Cyber Grid Background Accent */}
      <div className="cyber-grid-pattern"></div>
      <div className="cyber-laser-glow"></div>

      {/* Top Telemetry Bar */}
      <div className="cyber-top-telemetry">
        <div className="telemetry-pill">
          <FaShieldAlt className="pill-icon" />
          <span>ENCRYPTED PORTFOLIO SESSION</span>
        </div>
        <button onClick={handleEnter} className="cyber-skip-btn">
          <span>SKIP INTRO</span>
          <FaArrowRight />
        </button>
      </div>

      <div className="cyber-main-card">
        
        {/* Holographic Logo Scanner Container */}
        <div className="holo-scanner-wrapper">
          <div className="holo-laser-line"></div>
          <div className="holo-target-corner top-left"></div>
          <div className="holo-target-corner top-right"></div>
          <div className="holo-target-corner bottom-left"></div>
          <div className="holo-target-corner bottom-right"></div>

          <img
            src="/logo.png"
            alt="Logendiran R Logo"
            className="holo-logo-img"
            onError={(e) => {
              e.target.src = "/profile.jpg";
            }}
          />
        </div>

        {/* Title */}
        <div className="cyber-brand-title">LOGENDIRAN R</div>
        <div className="cyber-brand-subtitle">FULL STACK DEVELOPER // MERN & AI</div>

        {/* Live Terminal Stream Box */}
        <div className="cyber-terminal-box">
          <div className="terminal-header">
            <FaTerminal className="terminal-icon" />
            <span>CORE BOOT LOG</span>
          </div>
          <div className="terminal-body">
            <span className="term-prompt">&gt;_</span> {bootSequence[seqIdx]}
          </div>
        </div>

        {/* Futuristic Energy Gauge Progress Bar */}
        <div className="cyber-gauge-container">
          <div className="cyber-gauge-bar">
            <div
              className="cyber-gauge-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="gauge-spark"></div>
            </div>
          </div>
          <div className="cyber-gauge-metrics">
            <span>SYSTEM MATRIX LOAD</span>
            <span className="gauge-perc">{progress}%</span>
          </div>
        </div>

        {/* Action Button on Complete */}
        <button 
          onClick={handleEnter} 
          className={`cyber-enter-btn ${readyToEnter ? 'visible' : ''}`}
        >
          <span>LAUNCH PORTFOLIO</span>
          <FaArrowRight />
        </button>

      </div>

      {/* Cyber Footer */}
      <div className="cyber-bottom-footer">
        <span>LOGENDIRAN R • FULL STACK ARCHITECTURE</span>
      </div>
    </div>
  );
};

export default IntroSplash;
