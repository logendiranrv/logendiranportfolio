import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
          <p>&copy; {currentYear} Logendiran R. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;