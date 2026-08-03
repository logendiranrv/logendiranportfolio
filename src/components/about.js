import React from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJs, 
  FaCss3Alt, 
  FaFigma 
} from 'react-icons/fa';
import { SiExpress, SiMongodb } from 'react-icons/si';

const techBadgesList = [
  { icon: <FaFigma className="tech-icon figma" />, label: 'Figma' },
  { icon: <FaReact className="tech-icon react" />, label: 'React' },
  { icon: <FaPython className="tech-icon python" />, label: 'Python' },
  { icon: <FaNodeJs className="tech-icon node" />, label: 'Node.js' },
  { icon: <SiExpress className="tech-icon express" />, label: 'Express' },
  { icon: <FaJs className="tech-icon js" />, label: 'JS' },
  { icon: <FaCss3Alt className="tech-icon css" />, label: 'CSS' },
  { icon: <SiMongodb className="tech-icon mongo" />, label: 'MongoDB' },
];

const About = () => {
  return (
    <section id="about" className="anurag-about-section">
      <div className="container">
        
        {/* Section Header */}
        <h2 className="gradient-heading-title" data-aos="fade-up">
          About
        </h2>

        {/* Bio Paragraph */}
        <p className="anurag-about-text" data-aos="fade-up">
          I'm a full stack developer looking for exciting engineering opportunities. I focus on writing clean, accessible code using modern web practices in React, Node.js, Express, MongoDB, and Python. Based in India, I'm enthusiastic about building scalable web applications and remote software products.
        </p>

        {/* Connected Tech Stack Tree Node */}
        <div className="tech-tree-wrapper" data-aos="fade-up">
          
          {/* Top Tech Nodes Array */}
          <div className="tech-nodes-row">
            {techBadgesList.map((item, idx) => (
              <div key={idx} className="tech-node-badge" title={item.label}>
                {item.icon}
              </div>
            ))}
          </div>

          {/* Connected SVG Branch Lines */}
          <div className="tree-lines-svg-container">
            <svg className="tree-svg" viewBox="0 0 800 120" preserveAspectRatio="none">
              <path d="M 100 0 C 100 60, 400 40, 400 120" stroke="url(#treeGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 200 0 C 200 60, 400 40, 400 120" stroke="url(#treeGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 300 0 C 300 60, 400 40, 400 120" stroke="url(#treeGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 400 0 C 400 60, 400 40, 400 120" stroke="url(#treeGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 500 0 C 500 60, 400 40, 400 120" stroke="url(#treeGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 600 0 C 600 60, 400 40, 400 120" stroke="url(#treeGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 700 0 C 700 60, 400 40, 400 120" stroke="url(#treeGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
              <defs>
                <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9d4edd" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Central Logo Core Orb */}
          <div className="logo-core-orb-container">
            <div className="orbital-ring ring-a"></div>
            <div className="orbital-ring ring-b"></div>
            <div className="logo-orb-circle">
              <img
                src="/logo.png"
                alt="Logendiran Core Logo"
                className="logo-orb-img"
                onError={(e) => {
                  e.target.src = "/profile.jpg";
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;