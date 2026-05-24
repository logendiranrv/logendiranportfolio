import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const Education = () => {
  const education = [
    {
      degree: 'Master of Computer Application',
      institution: 'Nehru Institute of Information Technology and Management, Coimbatore, Tamil Nadu',
      year: 'May 2027',
      description: 'Currently pursuing'
    },
    {
      degree: 'Bachelor of Computer Application',
      institution: 'AVS College of Arts and Science, Salem, Tamil Nadu',
      year: 'Apr 2025',
      description: 'CGPA: 7.3 / 10'
    },
    {
      degree: 'XII (Higher Secondary)',
      institution: 'Sri Jothi Higher Secondary School, Tharamangalam, Salem, Tamil Nadu',
      year: '',
      description: 'Percentage: 78.83%'
    }
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="timeline">
          {education.map((edu, index) => (
            <div key={index} className="timeline-item" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="timeline-marker">
                <FaGraduationCap />
              </div>
              <div className="timeline-content">
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <div className="timeline-details">
                  <span className="year">{edu.year}</span>
                  <span className="description">{edu.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;