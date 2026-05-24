import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaJava, FaPython } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'HTML', icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS', icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'React JS', icon: <FaReact />, color: '#61DAFB' },
    { name: 'Java', icon: <FaJava />, color: '#007396' },
    { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'Git/GitHub', icon: <FaGitAlt />, color: '#F05032' }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Core Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card" data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;