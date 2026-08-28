import React, { useState, useEffect, useRef } from 'react';
import { FaTerminal, FaTimes } from 'react-icons/fa';
import telemetryAudio from '../utils/audio';

const TerminalModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'LOGENDIRAN MISSION CONTROL COMMAND TERMINAL v4.0.9\nType "help" to view all available commands.',
    },
  ]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Global keydown listener for easter eggs when terminal is closed
  useEffect(() => {
    let keyBuffer = '';
    let timer = null;

    const handleKeyDown = (e) => {
      // Toggle terminal on ~ or ` key
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        onClose(!isOpen);
        return;
      }

      // If user is typing in an input/textarea, ignore easter egg key buffer
      if (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        keyBuffer += e.key.toLowerCase();

        clearTimeout(timer);
        timer = setTimeout(() => {
          keyBuffer = '';
        }, 1500);

        if (keyBuffer.endsWith('whoami')) {
          scrollToSection('about');
          keyBuffer = '';
        } else if (keyBuffer.endsWith('launch')) {
          scrollToSection('projects');
          keyBuffer = '';
        } else if (keyBuffer.endsWith('mission')) {
          scrollToSection('experience');
          keyBuffer = '';
        } else if (keyBuffer.endsWith('hireme')) {
          downloadResume();
          scrollToSection('contact');
          keyBuffer = '';
        } else if (keyBuffer.endsWith('help')) {
          onClose(true);
          keyBuffer = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      telemetryAudio.playTelemetryClick();
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Logendiran_R_Resume.pdf';
    link.target = '_blank';
    link.download = 'Logendiran_R_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    telemetryAudio.playSuccessScan();
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    telemetryAudio.playTelemetryClick();

    const newHistory = [...history, { type: 'user', text: `$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  whoami    - Access Mission Log & Commander Profile
  launch    - Jump directly to Missions Completed (Projects)
  mission   - Open Mission History (Timeline & Career)
  hireme    - Download Official Resume PDF & open Communication Center
  clear     - Clear terminal buffer
  exit      - Close command console`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: 'COMMANDER: Logendiran R\nROLE: Full Stack Developer (React / MERN / AI)\nSTATUS: Online & Ready for Operations',
        });
        scrollToSection('about');
        break;

      case 'launch':
        newHistory.push({
          type: 'output',
          text: 'LAUNCH SEQUENCE INITIATED... Navigating to Missions Completed.',
        });
        scrollToSection('projects');
        break;

      case 'mission':
        newHistory.push({
          type: 'output',
          text: 'ACCESSING MISSION HISTORY... Navigating to timeline.',
        });
        scrollToSection('experience');
        break;

      case 'hireme':
        newHistory.push({
          type: 'output',
          text: 'DOWNLOADING COMMANDER DOSSIER... Opening Communication Center.',
        });
        downloadResume();
        scrollToSection('contact');
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose(false);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for command manifest.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-modal-backdrop" onClick={() => onClose(false)}>
      <div
        className="terminal-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header">
          <div className="terminal-title-group">
            <FaTerminal className="term-icon" />
            <span>COMMANDER TELEMETRY CLI</span>
          </div>
          <button
            className="terminal-close-btn interactive"
            onClick={() => onClose(false)}
            aria-label="Close Terminal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="terminal-body">
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form className="terminal-input-row" onSubmit={handleCommandSubmit}>
          <span className="term-prompt">commander@nasa-mc:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type "help", "whoami", "launch", "mission", or "hireme"...'
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalModal;
