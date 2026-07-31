import React, { useState, useEffect } from 'react';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const fallbackCertificates = [
  {
    name: 'Python with AI Internship Certificate',
    issuer: 'CSK Academy, Salem, Tamil Nadu',
    issue_date: 'Dec 2024',
    credential_url: ''
  },
  {
    name: 'Full Stack Development Intern Certificate',
    issuer: 'CSK Academy, Salem, Tamil Nadu',
    issue_date: 'Jul 2024',
    credential_url: ''
  },
  {
    name: 'Web Development Internship Certificate',
    issuer: 'Odugaa Tech, Salem, Tamil Nadu',
    issue_date: 'Aug 2023',
    credential_url: ''
  }
];

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setCertificates(data);
        } else {
          setCertificates(fallbackCertificates);
        }
      } catch (err) {
        console.error('Error fetching certificates, loading fallback:', err);
        setCertificates(fallbackCertificates);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certificates" className="certificates">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div style={styles.grid}>
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              style={styles.card} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
              className="certificate-card-hover"
            >
              <div style={styles.iconContainer}>
                <FaCertificate style={styles.icon} />
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{cert.name}</h3>
                <p style={styles.issuer}>{cert.issuer}</p>
                <div style={styles.footer}>
                  <span style={styles.date}>{cert.issue_date}</span>
                  {cert.credential_url && (
                    <a 
                      href={cert.credential_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={styles.link}
                    >
                      Verify <FaExternalLinkAlt style={{ marginLeft: '6px', fontSize: '0.8rem' }} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  card: {
    background: 'var(--light-color)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid var(--glass-border)',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: 'var(--glass-shadow)',
    display: 'flex',
    gap: '20px',
    transition: 'all 0.3s ease',
  },
  iconContainer: {
    width: '50px',
    height: '50px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: '1.5rem',
    color: '#ffffff',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    fontSize: '1.15rem',
    fontWeight: '600',
    color: 'var(--text-color)',
    marginBottom: '6px',
    lineHeight: '1.4',
  },
  issuer: {
    fontSize: '0.9rem',
    color: 'var(--secondary-color)',
    marginBottom: '15px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '12px',
    marginTop: 'auto',
  },
  date: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  link: {
    fontSize: '0.85rem',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'color 0.3s ease',
  },
};

export default Certificates;
