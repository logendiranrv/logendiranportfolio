import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaPaperPlane, FaDownload } from 'react-icons/fa';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // Get your free access key from https://web3forms.com/
    formData.append("access_key", "69bcce73-4986-434d-b3a6-e6844ddacbca");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully!");
        event.target.reset();
        setTimeout(() => setResult(""), 5000); // Clear message after 5 seconds
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setResult("Something went wrong. Please try again later.");
    }
  };
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-form" data-aos="fade-up" style={{ width: '100%' }}>
            <h3>Send Message</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn submit-btn">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
            {result && <span className="form-result" style={{ display: 'block', marginTop: '15px', color: result.includes('Success') ? '#4caf50' : '#f44336', fontWeight: '500' }}>{result}</span>}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <a href="/resume.pdf" className="btn btn-resume" download data-aos="fade-up">
            <FaDownload /> Download Resume
          </a>
        </div>
        
        <div className="social-links-container" data-aos="fade-up" style={{ marginTop: '40px' }}>
          <a href="mailto:logendiranrv@gmail.com" className="social-link-icon" title="Email">
            <FaEnvelope />
          </a>
          <a href="tel:6833121749" className="social-link-icon" title="Phone">
            <FaPhone />
          </a>
          <a href="https://linkedin.com/in/logendiran-r-24567a295" target="_blank" rel="noopener noreferrer" className="social-link-icon" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/logendiranrv" target="_blank" rel="noopener noreferrer" className="social-link-icon" title="GitHub">
            <FaGithub />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;