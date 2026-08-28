import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="anurag-contact-section">
      <div className="container">
        
        {/* Section Header */}
        <h2 className="gradient-heading-title" data-aos="fade-up">
          Contact
        </h2>

        <div className="anurag-contact-grid" data-aos="fade-up">
          
          {/* Left Column: Contact Info */}
          <div className="contact-info-col">
            <h3 className="contact-sub-title">Drop me a message</h3>
            <p className="contact-info-desc">
              Feel free to reach out if you want to collaborate on a software project, discuss full stack engineering roles, or simply connect.
            </p>

            <div className="contact-items-list">
              <div className="contact-item">
                <div className="contact-icon-bubble">
                  <FaPhoneAlt />
                </div>
                <span>+91 6383121749</span>
              </div>

              <div className="contact-item">
                <div className="contact-icon-bubble">
                  <FaEnvelope />
                </div>
                <span>logendiranrv@gmail.com</span>
              </div>

              <div className="contact-item">
                <div className="contact-icon-bubble">
                  <FaMapMarkerAlt />
                </div>
                <span>Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Purple Glass Form Card */}
          <div className="contact-form-col">
            <div className="contact-glass-card">
              {submitted ? (
                <div className="contact-success-msg">
                  ✨ Thank you! Your message has been sent successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="anurag-contact-form">
                  <div className="form-group-field">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Message</label>
                    <textarea
                      placeholder="How can I help?"
                      rows="4"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-send-message">
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;