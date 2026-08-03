import React, { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope, 
  FaReact, 
  FaPython, 
  FaNodeJs, 
  FaGitAlt, 
  FaDatabase, 
  FaFolderOpen, 
  FaFileDownload, 
  FaPaperPlane 
} from 'react-icons/fa';

const words = ["MCA Student", "Full Stack Developer", "Tech Enthusiast", "Problem Solver"];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  // Typing effect loop
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <section id="home" className="hero-centered">
      {/* Floating Tech Badges in Background */}
      <div className="floating-tech-badge tech-react"><FaReact /><span>React</span></div>
      <div className="floating-tech-badge tech-python"><FaPython /><span>Python</span></div>
      <div className="floating-tech-badge tech-node"><FaNodeJs /><span>Node.js</span></div>
      <div className="floating-tech-badge tech-git"><FaGitAlt /><span>Git</span></div>
      <div className="floating-tech-badge tech-db"><FaDatabase /><span>SQL</span></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-centered-content" data-aos="fade-up">
          
          {/* Fixed Clean Profile Avatar */}
          <div className="hero-avatar-wrapper">
            <img 
              src="/profile.jpg"
              alt="Logendiran R" 
              className="hero-avatar-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/180x180/3b82f6/ffffff?text=LR";
              }}
            />
          </div>

          <div className="hero-greeting">Hi 👋, I'm</div>
          <h1 className="hero-main-title">
            LOGENDIRAN <span className="highlight-blue">R</span>
          </h1>

          <h2 className="hero-typing-subtitle">
            &gt; <span className="typed-text">{text}</span><span className="typed-cursor">|</span>
          </h2>

          <p className="hero-description">
            Motivated and enthusiastic MCA graduate looking to kickstart 
            my career in web development. Building scalable, immersive applications with modern technologies.
          </p>

          {/* Action Buttons */}
          <div className="hero-action-buttons">
            <a href="#projects" className="btn-primary-purple">
              <FaFolderOpen /> View Projects
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-cyan">
              <FaFileDownload /> Download Resume
            </a>
            <a href="#contact" className="btn-dark-pill">
              <FaPaperPlane /> Contact Me
            </a>
          </div>

          {/* Social Icons Bar */}
          <div className="hero-social-row">
            <a href="https://github.com/logendiranrv" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="mailto:logendiranrv@gmail.com" className="hero-social-btn" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>

          {/* Key Stats Bar */}
          <div className="hero-stats-card">
            <div className="stat-item">
              <div className="stat-value">6+</div>
              <div className="stat-label">PROJECTS</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">MCA</div>
              <div className="stat-label">DEGREE</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">100+</div>
              <div className="stat-label">COMMITS</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;