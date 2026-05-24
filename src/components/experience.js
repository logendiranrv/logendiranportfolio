import React from 'react';
import { FaBriefcase } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      title: 'Python with AI',
      company: 'CSK Academy, Salem, Tamil Nadu',
      period: 'Dec 2024',
      description: 'Worked with Python and AI technologies'
    },
    {
      title: 'Full Stack Development Intern',
      company: 'CSK Academy, Salem, Tamil Nadu',
      period: 'Jul 2024',
      description: 'Gained experience in full stack development'
    },
    {
      title: 'Web Development Intern',
      company: 'Odugaa Tech, Salem, Tamil Nadu',
      period: 'Aug 2023',
      description: 'Completed web development internship'
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="experience-header">
                <div className="experience-icon">
                  <FaBriefcase />
                </div>
                <div className="experience-title">
                  <h3>{exp.title}</h3>
                  <p className="company">{exp.company}</p>
                </div>
                <span className="period">{exp.period}</span>
              </div>
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;