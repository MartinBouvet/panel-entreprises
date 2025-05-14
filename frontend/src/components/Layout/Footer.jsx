// frontend/src/components/Layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} EDF - Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;