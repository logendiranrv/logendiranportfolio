import React from 'react';
import { FaCode, FaDatabase } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'College Bus Management System',
      technologies: ['HTML', 'CSS', 'Java', 'MySQL'],
      description: 'Developed a system to manage college bus operations including route management, student registration, and bus scheduling.',
      features: [
        'Route Management',
        'Student Registration',
        'Bus Scheduling',
        'Real-time Tracking'
      ]
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card" data-aos="fade-up" data-aos-delay={index * 100}>
              <h3>{project.title}</h3>
              
              <div className="tech-stack">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.features.map((feature, i) => (
                    <li key={i}>
                      <FaCode className="feature-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="project-aim">
                <FaDatabase className="aim-icon" />
                <span>Aim: To streamline college bus operations and improve efficiency</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;