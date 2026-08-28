import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const fallbackProjects = [
  {
    title: "College Bus Management System",
    description: "Developed a system to manage college bus operations, enabling streamlined scheduling, route management, and student tracking.",
    technologies: ["HTML", "CSS", "Java", "MySQL"],
    github: "https://github.com/logendiranrv",
    demo: "https://github.com/logendiranrv",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Clinic Appointment Booking System",
    description: "Built a responsive clinic appointment booking web application enabling patients to schedule, reschedule, and cancel appointments online. Features doctor availability management and patient dashboard.",
    technologies: ["React JS", "JavaScript", "CSS", "MongoDB"],
    github: "https://github.com/logendiranrv",
    demo: "https://github.com/logendiranrv",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          setProjects(fallbackProjects);
        } else {
          setProjects(data);
        }
      } catch (err) {
        setProjects(fallbackProjects);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="recent-work-section">
      <div className="container">
        
        {/* Section Header */}
        <h2 className="gradient-heading-title" data-aos="fade-up">
          Recent Work
        </h2>
        <p className="section-desc-center" data-aos="fade-up">
          A collection of projects I've worked on.
        </p>

        {/* Alternating Zig-Zag Projects List */}
        <div className="recent-work-list">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className="recent-work-row"
                data-aos="fade-up"
              >
                {/* Text Content Block */}
                <div className="work-text-block">
                  <span className="featured-tag">Featured Project</span>
                  <h3 className="work-project-title">{proj.title}</h3>

                  <div className="work-description-card">
                    {proj.description}
                  </div>

                  {/* Tech Tags */}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="work-tech-tags" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.2rem', marginBottom: '1.2rem' }}>
                      {proj.technologies.map((tech, tIdx) => (
                        <span key={tIdx} style={{
                          padding: '0.35rem 0.85rem',
                          background: 'rgba(0, 210, 255, 0.08)',
                          border: '1px solid rgba(0, 210, 255, 0.25)',
                          color: '#00d2ff',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '600'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Social / Action Links */}
                  <div className="work-actions-flex">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-action-icon"
                        title="View GitHub Repository"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-action-icon"
                        title="View Live Demo"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    <a
                      href="https://linkedin.com/in/logendiran-r-24567a295"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-action-icon"
                      title="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;