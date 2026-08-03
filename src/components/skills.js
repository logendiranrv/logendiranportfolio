import React from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaPython, 
  FaJava, 
  FaCode, 
  FaGitAlt, 
  FaGithub, 
  FaTerminal, 
  FaRobot, 
  FaFire,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiPostman, SiFastapi } from 'react-icons/si';

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "JavaScript (ES6+)", icon: <FaJsSquare /> },
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "RESTful APIs", icon: <FaCode /> },
      { name: "FastAPI", icon: <SiFastapi /> },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Firebase", icon: <FaFire /> },
      { name: "Supabase", icon: <FaDatabase /> },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "Java", icon: <FaJava /> },
      { name: "C", icon: <FaCode /> },
      { name: "C++", icon: <FaCode /> },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "VS Code", icon: <FaTerminal /> },
    ],
  },
  {
    title: "AI & Other Technologies",
    skills: [
      { name: "Machine Learning", icon: <FaRobot /> },
      { name: "RAG Systems", icon: <FaCode /> },
      { name: "Prompt Engineering", icon: <FaRobot /> },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-minimal-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-minimal" data-aos="fade-up">
          <span className="section-label">02. TECHNICAL SKILLS</span>
          <h2 className="section-title-minimal">Capabilities & Stack</h2>
          <p className="section-desc-minimal">
            A comprehensive overview of technologies, frameworks, and tools I work with daily.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-cards-grid">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="skill-card-minimal"
              data-aos="fade-up"
              data-aos-delay={idx * 50}
            >
              <h3 className="skill-cat-title">{cat.title}</h3>
              <div className="skill-items-wrap">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-pill">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;