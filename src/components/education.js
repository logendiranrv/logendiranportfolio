import React, { useState, useEffect } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const fallbackEducation = [
  {
    degree: 'Master of Computer Application (MCA)',
    institution: 'Nehru Institute of Information Technology and Management, Coimbatore, Tamil Nadu',
    year: 'May 2027',
    description: 'Pursuing'
  },
  {
    degree: 'Bachelor of Computer Application (BCA)',
    institution: 'AVS College of Arts and Science, Salem, Tamil Nadu',
    year: 'Apr 2025',
    description: 'CGPA: 7.3 / 10'
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'Srii Jothi Higher Secondary School, Tharamangalam, Salem, Tamil Nadu',
    year: 'May 2022',
    description: 'Percentage: 78.83%'
  }
];

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setEducation(data);
        } else {
          setEducation(fallbackEducation);
        }
      } catch (err) {
        console.error('Error fetching education, loading fallback:', err);
        setEducation(fallbackEducation);
      }
    };

    fetchEducation();
  }, []);

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
                  {edu.year && <span className="year">{edu.year}</span>}
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