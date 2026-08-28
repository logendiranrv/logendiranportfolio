import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="anurag-footer">
      <div className="container">
        <div className="footer-content-row">
          
          <div className="footer-copyright">
            2026 • Logendiran R, All rights reserved
          </div>

          <div className="footer-social-icons">
            <a
              href="https://github.com/logendiranrv"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/in/logendiran-r-24567a295"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;