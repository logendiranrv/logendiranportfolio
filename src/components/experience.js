import React, { useState, useEffect } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const fallbackExperiences = [
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

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setExperiences(data);
        } else {
          setExperiences(fallbackExperiences);
        }
      } catch (err) {
        console.error('Error fetching experience, loading fallback:', err);
        setExperiences(fallbackExperiences);
      }
    };

    fetchExperiences();
  }, []);

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