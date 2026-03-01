import { useState } from "react";
import logo from "../assets/logo.png";
import nitt from "../assets/nitt.png";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        <div className={styles.logoWrapper}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
          <img src={nitt} alt="NITT" className={styles.nittImage} />
        </div>

        {/* Desktop Links */}
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/accomodation">Accommodation</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Mobile Button */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
        <Link to="/accomodation" onClick={() => setMenuOpen(false)}>Accommodation</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
    </nav>
  );
}