import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* LEFT - BRAND */}
        <div className={styles.brandSection}>
          <h2>NC-EVMEH 2026</h2>
          <p>
            National Conference on New Trends in Electric Vehicle Mobility
            and Energy Harvesting Techniques.
          </p>
        </div>

        {/* MIDDLE - QUICK LINKS */}
        <div className={styles.linksSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Registration</Link></li>
            <li><Link to="/accomodation">Accomodation</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* RIGHT - CONTACT */}
        <div className={styles.contactSection}>
          <h3>Contact</h3>
          <p><FaMapMarkerAlt /> NIT Campus, Tamil Nadu, India</p>
          <p><FaEnvelope /> conference@nit.edu</p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/ever_nitt?igsh=MXM3aDJ3MjZoOHBmbA==" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      <div className={styles.bottomBar}>
        © 2026 NC-EVMEH | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;