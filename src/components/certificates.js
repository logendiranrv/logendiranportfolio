import React, { useState, useEffect } from 'react';
import { 
  FaAward, 
  FaExternalLinkAlt, 
  FaTimes, 
  FaImage
} from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const fallbackCertificates = [
  {
    id: 1,
    name: "MERN Stack Development Internship",
    issuer: "AK Technologies, Coimbatore",
    issue_date: "Mar 2026",
    credential_url: "/certificates/pdf/cert_ak_tech.pdf",
    image_url: "/certificates/cert_ak_tech.jpg"
  },
  {
    id: 2,
    name: "Generative AI Value Added Programme",
    issuer: "Nehru Institute of Info Tech & Management",
    issue_date: "Mar 2026",
    credential_url: "",
    image_url: "/certificates/cert_generative_ai.jpg"
  },
  {
    id: 3,
    name: "Systems and Usable Security",
    issuer: "NPTEL (MoE, Govt. of India / IIT)",
    issue_date: "Feb 2026",
    credential_url: "/certificates/pdf/cert_nptel_security.pdf",
    image_url: "/certificates/cert_nptel_security.jpg"
  },
  {
    id: 4,
    name: "Cognito Innoverse-25 (UI/UX Redesign)",
    issuer: "Sri Ramakrishna College of Arts & Science",
    issue_date: "Dec 2025",
    credential_url: "/certificates/pdf/cert_cognito_uiux.pdf",
    image_url: "/certificates/cert_cognito_uiux.jpg"
  },
  {
    id: 5,
    name: "Web Development Internship",
    issuer: "Odugaa Tech Pvt. Ltd",
    issue_date: "Jun 2024",
    credential_url: "",
    image_url: "/certificates/cert_odugaa_webdev.jpg"
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

  // Double certificates array for infinite smooth marquee track
  const displayCerts = certs.length > 0 ? [...certs, ...certs] : [...fallbackCertificates, ...fallbackCertificates];

  return (
    <section id="certifications" className="certifications-minimal-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-minimal" data-aos="fade-up">
          <span className="section-label">05. CREDENTIALS</span>
          <h2 className="section-title-minimal">Certifications & Training</h2>
          <p className="section-desc-minimal">
            Verified certifications and technical training completed during my MCA and software development journey.
          </p>
        </div>

        {/* Certifications Infinite Running Marquee Track */}
        <div className="cert-marquee-container" data-aos="fade-up">
          <div className="cert-marquee-track">
            {displayCerts.map((cert, idx) => (
              <div
                key={idx}
                className="cert-card-touchable"
                onClick={() => setSelectedCert(cert)}
              >
                {/* Certificate Image Banner */}
                <div className="cert-img-wrapper">
                  {cert.image_url ? (
                    <img 
                      src={cert.image_url} 
                      alt={cert.name} 
                      className="cert-img"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div 
                    className="cert-img-placeholder"
                    style={{ display: cert.image_url ? 'none' : 'flex' }}
                  >
                    <FaImage />
                  </div>
                  
                  {/* Hover Expand Overlay */}
                  <div className="cert-img-overlay-hover">
                    <span className="cert-expand-pill">
                      <FaImage /> Click to View
                    </span>
                  </div>
                </div>

                <div className="cert-card-content">
                  <div className="cert-card-top">
                    <FaAward className="cert-badge-icon" />
                    <span className="cert-year-pill">{cert.issue_date || cert.year}</span>
                  </div>

                  <h3 className="cert-title-minimal">{cert.name}</h3>
                  <div className="cert-org-minimal">{cert.issuer || cert.organization}</div>

                  <div className="cert-actions-row" onClick={(e) => e.stopPropagation()}>
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cert-link"
                      >
                        View PDF <FaExternalLinkAlt />
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
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
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
                    Open Official PDF <FaExternalLinkAlt />
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
