import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFileCode } from 'react-icons/fa'
import './styles/footer.css'

const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand & Mission */}
        <div className="footer-section brand-col">
          <div className="footer-logo">
            <FaFileCode className="logo-icon" />
            <h2>CV Analyzer</h2>
          </div>
          <p className="brand-description">
            Next-generation AI-powered resume optimization platform. Boost your ATS scores, identify skill gaps, and land your ideal tech role faster.
          </p>
          <div className="social-links">
            <a href="https://github.com/AhmadNawaz19" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/ahmad-nawaz-7985a4363" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#main">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#benefit">Benefits</a></li>
            <li><a href="#dashboard-preview">Dashboard</a></li>
            <li><a href="#review">Reviews</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-col">
          <h3>Get in Touch</h3>
          <ul className="contact-list">
            <li>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:ahmadnawaz.codes@gmail.com">ahmadnawaz.codes@gmail.com</a>
            </li>
            <li>
              <FaPhoneAlt className="contact-icon" />
              <a href="tel:+923301659292">+92 330 1659292</a>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Pakistan</span>
            </li>
          </ul>
        </div>

        {/* Portfolio / Dev Info */}
        <div className="footer-section">
          <h3>Developer Profile</h3>
          <p className="dev-text">Built by <strong>Ahmad Nawaz</strong> — Full Stack & Odoo Developer.</p>
          <a 
            href="https://github.com/AhmadNawaz19" 
            target="_blank" 
            rel="noreferrer" 
            className="portfolio-btn"
          >
            <FaGithub /> Visit GitHub Profile
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 CV Analyzer. Designed & Developed with React.js.</p>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
export default Footer