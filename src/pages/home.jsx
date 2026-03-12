import React from "react";
import Navbar from "../components/nav";
import styles from "./home.module.css";
import { IoCalendarSharp } from "react-icons/io5";
import FAQAccordion from "../components/FAQAccordion";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const Home = () => {
  const conferenceFaqs = [
    {
      question: "What is the submission deadline?",
      answer: "The final submission deadline is March 30, 2026.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "Yes. Registration details and fee structure are available on the Registration page.",
    },
    {
      question: "Where should I submit my paper?",
      answer:
        "Papers can be mailed to us at evernitt2324@gmail.com with attaching the Application ID provided to you during registration.",
    },
    {
      question: "Where do I pay the accomodation fees?",
      answer:
        "Accomodation fees will be collected on-site during the conference. A form will be shared with you later to confirm your accommodation details and preferences. Please note that accommodation is limited and will be allocated on a first-come, first-served basis. We recommend confirming your accommodation as soon as possible to secure your spot.",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className={styles.hero}>
        <p className={styles.subtitle}>National Conference 2026</p>
        <h1 className={styles.tagline}>Electrifying Tomorrow</h1>

        <h2 className={styles.title}>
          New Trends In Electric Vehicle Mobility And Energy Harvesting
          Techniques
        </h2>

        <div className={styles.buttons}>
          <Link to="/register">
            <button className={styles.primaryButton}>Register Now</button>
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.aboutSection}>
        <h2>About The Conference</h2>
        <p>
          This national conference brings together researchers, academicians,
          and industry professionals to discuss innovations in electric
          mobility, sustainable energy harvesting, and smart grid systems. Join
          us in shaping the future of clean transportation.
        </p>
      </section>

      {/* TIMELINE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <IoCalendarSharp /> Important Dates
        </h2>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <h3>Registration</h3>
            <p>2nd Mar – 31 Mar, 2026</p>
          </div>

          <div className={styles.timelineItem}>
            <h3>Paper Submission</h3>
            <p>2nd Mar – 5 Apr, 2026</p>
          </div>

          <div className={styles.timelineItem}>
            <h3>Conference Dates</h3>
            <p>10th – 11th Apr, 2026</p>
          </div>
        </div>
      </section>

      {/* THEMES */}
      <section className={styles.themesSection}>
        <h2 className={styles.sectionTitle}>Conference Themes</h2>

        <div className={styles.themesGrid}>
          <div className={styles.themeCard}>
            <h3>Energy Harvesting</h3>
            <ul>
              <li>Solar Energy Innovations</li>
              <li>New trends in wind energy</li>
              <li>Hybrid Energy Systems</li>
              <li>Energy storage and Grid</li>
              <li>AI-based Energy Management</li>
              <li>Thermoelectric & Piezoelectric Harvesting</li>
              <li>Waste Energy Recovery Systems</li>
              <li>Advanced Material Science</li>
              <li>Self-powered IoT & Battery-less Sensing</li>
            </ul>
          </div>

          <div className={styles.themeCard}>
            <h3>EV Mobility Trends</h3>
            <ul>
              <li>Advanced Battery Technology</li>
              <li>Battery Management Systems</li>
              <li>Power Electronics & Drives</li>
              <li>EV Charging Infrastructure</li>
              <li>Smart and AI integration</li>
              <li>Innovations in hybrid vehicles </li>
              <li>Sustainability and Quality</li>
              <li>Safety and security</li>
              <li>Sustainable Manufacturing Lifecycle</li>
              <li>Hybrid energy storage control</li>
              <li>Fast Charging Protocols</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className={styles.speakerSection}>
        <h2 className={styles.sectionTitle}>Speakers</h2>
        <p className={styles.comingSoon}>
          Keynote speakers will be announced soon.
        </p>
      </section>

      {/* FAQ */}
      <FAQAccordion title="Frequently Asked Questions" faqs={conferenceFaqs} />

      <Footer />
    </div>
  );
};

export default Home;
