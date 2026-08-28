import React from 'react';
import { FaBriefcase, FaCode } from 'react-icons/fa';

const timelineItems = [
  {
    type: "Training",
    icon: <FaCode />,
    title: "Python with AI",
    organization: "CSK Academy, Salem, Tamil Nadu",
    duration: "Dec 2024",
    description: "Completed training program focused on Python programming and Artificial Intelligence concepts.",
  },
  {
    type: "Internship",
    icon: <FaBriefcase />,
    title: "Full Stack Development Intern",
    organization: "CSK Academy, Salem, Tamil Nadu",
    duration: "Jul 2024",
    description: "Developed full stack applications utilizing both frontend and backend technologies.",
  },
  {
    type: "Internship",
    icon: <FaBriefcase />,
    title: "Web Development Intern",
    organization: "Odugaa Tech, Salem, Tamil Nadu",
    duration: "Aug 2023",
    description: "Worked on web development projects, gaining hands-on experience in building and deploying web applications.",
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