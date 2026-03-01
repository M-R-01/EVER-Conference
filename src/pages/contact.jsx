import React from "react";
import Navbar from "../components/nav";
import styles from "./contact.module.css";
import Footer from "../components/footer";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <Navbar />

      <section className={styles.hero}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          For any queries regarding registration, submissions or logistics, feel
          free to reach out to our organizing team.
        </p>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.emailBox}>
          <FaEnvelope />
          <span>evernitt2324@gmail.com</span>
        </div>

        <div className={styles.container}>
          <div className={styles.card}>
            <h3 className={styles.role}>President</h3>
            <p className={styles.name}>Aravind Krishna S</p>
            <p className={styles.phone}>
              <FaPhoneAlt /> +91 9791144085
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.role}>Vice President</h3>
            <p className={styles.name}>Mohammed Irshath M</p>
            <p className={styles.phone}>
              <FaPhoneAlt /> +91 6374462626
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.role}>Treasurer</h3>
            <p className={styles.name}>Muhamad Ramiz M R</p>
            <p className={styles.phone}>
              <FaPhoneAlt /> +91 89256 32663
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.role}>Faculty Advisor</h3>
            <p className={styles.name}>Dr. Vinothkumar G, MME Department</p>
            <p className={styles.phone}>
              <FaEnvelope /> vinothkumar@nitt.edu
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
