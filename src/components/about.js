import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        {/* Small profile picture in About section */}
        <div className="about-profile" data-aos="zoom-in">
          <img 
            src="/profile.jpg"  // Same image or different one
            alt="Logendiran R"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x200/2563eb/ffffff?text=LR";
            }}
          />
        </div>
        
        <div className="about-content">
          <div className="about-text" data-aos="fade-up" data-aos-delay="200">
            <p>
              I am a passionate Computer Applications student with strong programming skills in 
              languages like C, C++, Java, and Python, as well as web technologies. I am passionate 
              about problem-solving and teamwork, eager to contribute positively in the tech field.
            </p>
            <p>
              Currently pursuing my Master's in Computer Application at Nehru Institute of 
              Information Technology and Management, Coimbatore, with expected completion in May 2027.
            </p>
            <p>
              My technical expertise includes Full Stack Development with experience in React JS, 
              MongoDB, and various web technologies. I have completed internships where I gained 
              practical experience in web development and Python with AI.
            </p>
          </div>
          <div className="other-skills" data-aos="fade-up" data-aos-delay="400">
            <h3>Soft Skills</h3>
            <div className="skills-list">
              <span>Problem-Solving</span>
              <span>Communication</span>
              <span>Teamwork</span>
              <span>Adaptability</span>
              <span>Project Management</span>
              <span>Critical Thinking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;