import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaDownload } from 'react-icons/fa';

const Hero = () => {
  const words = ["MCA Student", "Aspiring Full Stack Developer", "Tech Enthusiast"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  // Typing effect loop
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      // Pause at full word
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
    <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Ambient Background Glows */}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content" data-aos="fade-up">
          <div className="profile-section">
            {/* Profile Picture */}
            <div className="profile-image-container">
              <img 
                src="/profile.jpg"
                alt="Logendiran R" 
                className="profile-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300/2563eb/ffffff?text=LR";
                }}
              />
            </div>
            
            <div className="profile-text">
              <h1>Hi <span className="waving-hand">👋</span>, I'm <span className="highlight">Logendiran R</span></h1>
              <h2>
                I am a <span className="typed-text">{text}</span><span className="typed-cursor">|</span>
              </h2>
              <p className="hero-text">
                Motivated and enthusiastic fresher in Computer Applications looking to kickstart 
                my career in a dynamic organization that encourages learning and professional growth.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;