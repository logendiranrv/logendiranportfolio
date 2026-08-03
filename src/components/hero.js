import React from 'react';

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
              Full-Stack Developer.
            </h2>

            <p className="anurag-hero-bio">
              A full stack developer building responsive and user-friendly web applications & apps. I focus on clean code and efficient design, ensuring seamless interactions that align with both user expectations and business objectives.
            </p>

            <div className="anurag-cta-row">
              <a href="#contact" className="anurag-pill-btn">
                Contact
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