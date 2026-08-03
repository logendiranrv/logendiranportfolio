import React, { useState } from 'react';
import { FaPlay, FaCheckCircle, FaSpinner, FaTerminal, FaPaperPlane } from 'react-icons/fa';
import telemetryAudio from '../utils/audio';

const experiments = [
  {
    id: "EXP-01",
    title: "AI Chatbot Telemetry Engine",
    category: "Natural Language Processing",
    status: "Running",
    statusColor: "lime",
    progress: 88,
    details: "Autonomous conversational engine trained for contextual query routing and telemetry status updates.",
  },
  {
    id: "EXP-02",
    title: "Retrieval-Augmented Generation (RAG) Pipeline",
    category: "Vector Search & Embeddings",
    status: "Testing",
    statusColor: "orange",
    progress: 64,
    details: "High-density vector database chunking for instant document search across mission manuals.",
  },
  {
    id: "EXP-03",
    title: "Smart Clinic Booking & Scheduling System",
    category: "Predictive Queuing",
    status: "Completed",
    statusColor: "cyan",
    progress: 100,
    details: "Intelligent slot reservation and queue prediction model for healthcare environments.",
  },
];

const AiLab = () => {
  const [query, setQuery] = useState('');
  const [labLogs, setLabLogs] = useState([
    { type: 'sys', text: 'AI RESEARCH LAB MATRIX INITIALIZED • LLM MODEL LOADED: MISSION-GPT-4o' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    const userText = query.trim();
    setQuery('');
    telemetryAudio.playTelemetryClick();

    setLabLogs((prev) => [...prev, { type: 'user', text: `> RUN EXPERIMENT: "${userText}"` }]);
    setIsProcessing(true);

    setTimeout(() => {
      telemetryAudio.playSuccessScan();
      setIsProcessing(false);
      setLabLogs((prev) => [
        ...prev,
        {
          type: 'ai',
          text: `[QUANTUM TELEMETRY RESPONSE]\nExperiment results analyzed for "${userText}":\n• Model Accuracy: 99.4%\n• Latency: 142ms\n• Context: Commander Logendiran R's AI modules are operational and ready for mission deployment.`,
        },
      ]);
    }, 1200);
  };

  return (
    <section id="ai-lab" className="ai-research-lab-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-hud" data-aos="fade-up">
          <div className="hud-badge">EXPERIMENTAL MATRIX // NEURAL NETWORKS</div>
          <h2 className="section-title-hud">AI RESEARCH LAB</h2>
          <div className="hud-subline">ONGOING DEEP-LEARNING EXPERIMENTS & PROTOTYPES</div>
        </div>

        {/* Experiments Grid */}
        <div className="experiments-grid">
          {experiments.map((exp, idx) => (
            <div
              key={idx}
              className="experiment-card interactive"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="exp-card-header">
                <span className="exp-id">{exp.id}</span>
                <span className={`exp-status status-${exp.statusColor}`}>
                  {exp.status === 'Running' && <FaSpinner className="spinner-icon" />}
                  {exp.status === 'Testing' && <FaPlay className="play-icon" />}
                  {exp.status === 'Completed' && <FaCheckCircle />}
                  {exp.status.toUpperCase()}
                </span>
              </div>

              <h3 className="exp-title">{exp.title}</h3>
              <div className="exp-category">{exp.category}</div>
              <p className="exp-details">{exp.details}</p>

              {/* Animated Progress Signal */}
              <div className="exp-progress-wrapper">
                <div className="exp-progress-info">
                  <span>MODEL CONVERGENCE</span>
                  <span>{exp.progress}%</span>
                </div>
                <div className="exp-progress-track">
                  <div
                    className={`exp-progress-fill fill-${exp.statusColor}`}
                    style={{ width: `${exp.progress}%` }}
                  >
                    <div className="exp-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Signal Frequency Graph Bars */}
              <div className="exp-frequency-visualizer">
                <span className="bar" style={{ height: '40%' }}></span>
                <span className="bar" style={{ height: '80%' }}></span>
                <span className="bar" style={{ height: '60%' }}></span>
                <span className="bar" style={{ height: '100%' }}></span>
                <span className="bar" style={{ height: '70%' }}></span>
                <span className="bar" style={{ height: '90%' }}></span>
                <span className="bar" style={{ height: '50%' }}></span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Lab Simulator Console */}
        <div className="ai-lab-console" data-aos="fade-up">
          <div className="console-header">
            <div className="console-title">
              <FaTerminal /> LIVE AI EXPERIMENT SIMULATOR
            </div>
            <div className="console-status">
              <span className="dot-green"></span> MATRIX ONLINE
            </div>
          </div>

          <div className="console-body">
            {labLogs.map((item, idx) => (
              <div key={idx} className={`console-line line-${item.type}`}>
                <pre>{item.text}</pre>
              </div>
            ))}
            {isProcessing && (
              <div className="console-line line-processing">
                <FaSpinner className="spinner-icon" /> Executing neural inference across quantum nodes...
              </div>
            )}
          </div>

          <form className="console-input-form" onSubmit={handleQuerySubmit}>
            <input
              type="text"
              className="console-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Test an AI query (e.g. 'Query RAG latency', 'Check model status')..."
            />
            <button type="submit" className="console-submit-btn interactive">
              <FaPaperPlane /> RUN INFERENCE
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default AiLab;
