import React, { useState, useEffect } from 'react';
import { FaAward, FaExternalLinkAlt, FaTimes, FaImage } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const fallbackCertificates = [
  {
    id: 1,
    name: "Python with AI Training Certificate",
    issuer: "CSK Academy, Salem",
    issue_date: "Dec 2024",
    credential_url: "",
    image_url: ""
  },
  {
    id: 2,
    name: "Full Stack Development Internship",
    issuer: "CSK Academy, Salem",
    issue_date: "Jul 2024",
    credential_url: "",
    image_url: ""
  },
  {
    id: 3,
    name: "Web Development Internship",
    issuer: "Odugaa Tech, Salem",
    issue_date: "Aug 2023",
    credential_url: "",
    image_url: ""
  }
];

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          setCerts(fallbackCertificates);
        } else {
          setCerts(data);
        }
      } catch (err) {
        setCerts(fallbackCertificates);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <section id="certifications" className="certifications-minimal-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-minimal" data-aos="fade-up">
          <span className="section-label">05. CREDENTIALS</span>
          <h2 className="section-title-minimal">Certifications & Training</h2>
          <p className="section-desc-minimal">
            Verified certifications and technical training completed during my software engineering journey.
          </p>
        </div>

        {/* Certifications Responsive Grid */}
        <div className="cert-grid-minimal">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="cert-card-minimal"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
            >
              {/* Certificate Image Banner */}
              <div 
                className="cert-img-wrapper"
                onClick={() => setSelectedCert(cert)}
                title="Click to expand Certificate"
              >
                {cert.image_url ? (
                  <img 
                    src={cert.image_url} 
                    alt={cert.name} 
                    className="cert-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="cert-img-placeholder"
                  style={{ display: cert.image_url ? 'none' : 'flex' }}
                >
                  <FaImage />
                </div>
              </div>

              <div className="cert-card-content">
                <div className="cert-card-top">
                  <FaAward className="cert-badge-icon" />
                  <span className="cert-year-pill">{cert.issue_date || cert.year}</span>
                </div>

                <h3 className="cert-title-minimal">{cert.name}</h3>
                <div className="cert-org-minimal">{cert.issuer || cert.organization}</div>

                <div className="cert-actions-row">
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cert-link"
                    >
                      View Certificate <FaExternalLinkAlt />
                    </a>
                  )}
                  {cert.image_url && (
                    <button 
                      onClick={() => setSelectedCert(cert)}
                      className="btn-cert-preview"
                    >
                      Preview Image
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Certificate Image Lightbox Modal */}
        {selectedCert && (
          <div 
            className="cert-modal-backdrop"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="cert-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <h3>{selectedCert.name}</h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="cert-modal-close"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="cert-modal-body">
                {selectedCert.image_url ? (
                  <img 
                    src={selectedCert.image_url} 
                    alt={selectedCert.name} 
                    className="cert-modal-img" 
                  />
                ) : (
                  <div className="cert-modal-no-img">No Preview Image Available</div>
                )}
              </div>
              <div className="cert-modal-footer">
                <span>Issued by: {selectedCert.issuer || selectedCert.organization}</span>
                {selectedCert.credential_url && (
                  <a
                    href={selectedCert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cert-link"
                  >
                    Open Credential Link <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Certificates;
