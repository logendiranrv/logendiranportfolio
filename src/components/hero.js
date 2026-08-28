import React from 'react';
import { FaDownload } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="anurag-hero-section">
      {/* Background Ambient Purple Lighting */}
      <div className="hero-purple-light"></div>

      <div className="container">
        <div className="anurag-hero-grid" data-aos="fade-up">
          
          {/* Left Column: Text & CTA */}
          <div className="anurag-hero-left">
            
            <h1 className="anurag-hero-title">
              Hi, I’m Logendiran
            </h1>

            <h2 className="anurag-hero-subtitle">
              Full-Stack Developer
            </h2>

            <p className="anurag-hero-bio">
              Motivated and enthusiastic MCA graduate & Full-Stack Developer with strong programming skills in Java, Python, React JS, Node.js, and web technologies. Passionate about problem-solving, building responsive applications, and contributing positively to engineering teams.
            </p>

            <div className="anurag-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#contact" className="anurag-pill-btn">
                Contact
              </a>
              <a 
                href="/resume.pdf" 
                download="Logendiran_R_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="anurag-pill-btn-outline"
              >
                <FaDownload style={{ marginRight: '0.4rem' }} /> Download Resume
              </a>
            </div>

          </div>

          {/* Right Column: Profile Image over Purple/Magenta Radial Aura Glow */}
          <div className="anurag-hero-right">
            <div className="profile-aura-wrapper">
              <div className="aura-radial-glow"></div>
              <img
                src="/profile.jpg"
                alt="Logendiran R"
                className="anurag-profile-img"
                onError={(e) => {
                  e.target.src = "/logo.png";
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;