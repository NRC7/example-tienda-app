import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Mi Empresa. Todos los derechos reservados.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;