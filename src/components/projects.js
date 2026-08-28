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
                className={`recent-work-row ${isEven ? 'row-normal' : 'row-reverse'}`}
                data-aos="fade-up"
              >
                {/* Text Content Block */}
                <div className="work-text-block">
                  <span className="featured-tag">Featured Project</span>
                  <h3 className="work-project-title">{proj.title}</h3>

                  <div className="work-description-card">
                    {proj.description}
                  </div>

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
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-action-icon"
                      title="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>

                {/* Image Preview Block */}
                <div className="work-image-block">
                  <div className="work-image-frame">
                    <img
                      src={proj.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
                      alt={proj.title}
                      className="work-preview-img"
                    />
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