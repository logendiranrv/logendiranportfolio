import React from 'react';
import { FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';

const timelineItems = [
  {
    type: "Internship",
    icon: <FaBriefcase />,
    title: "Web Development & AI Intern",
    organization: "Tech Innovation Labs",
    duration: "June 2024 – August 2024",
    description: "Built responsive frontend UI components using React and Tailwind CSS. Developed Python backend microservices for AI text parsing and integrated REST API endpoints.",
  },
  {
    type: "College Projects",
    icon: <FaGraduationCap />,
    title: "College Bus Management System",
    organization: "Nehru Institute of Information Technology",
    duration: "January 2024 – April 2024",
    description: "Engineered an enterprise fleet management and student registration system using Java, MySQL, HTML, and CSS. Optimized route scheduling queries for over 1,200 students.",
  },
  {
    type: "Personal Projects",
    icon: <FaCode />,
    title: "Full Stack & AI Web Applications",
    organization: "Independent Development",
    duration: "2023 – Present",
    description: "Designed and deployed multiple production-ready full-stack applications including Clinic Booking Portals and RAG Document Search engines using the MERN stack and Python.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience-minimal-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-minimal" data-aos="fade-up">
          <span className="section-label">04. EXPERIENCE & TRACK RECORD</span>
          <h2 className="section-title-minimal">Career & Projects Timeline</h2>
          <p className="section-desc-minimal">
            A chronological timeline of my professional internships, academic projects, and hands-on software development experience.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="minimal-timeline-wrapper">
          <div className="timeline-spine"></div>
          
          <div className="timeline-items-list">
            {timelineItems.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item-minimal"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="timeline-node-icon">
                  {item.icon}
                </div>

                <div className="timeline-content-card">
                  <div className="timeline-meta-row">
                    <span className="timeline-type-pill">{item.type}</span>
                    <span className="timeline-duration">{item.duration}</span>
                  </div>

                  <h3 className="timeline-item-title">{item.title}</h3>
                  <div className="timeline-org-name">{item.organization}</div>

                  <p className="timeline-item-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;