import React, { useState } from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import styles from "./register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "individual",
    college: "",
    department: "",
    teamSize: 1,
    payerName: "",
    payerNumber: "",
    transactionId: "",
    track: "",
    theme: "",
    agree: false,
  });

  const tracks = {
    "AI & ML": ["Deep Learning", "Generative AI", "Edge AI"],
    Sustainability: ["Green Manufacturing", "Carbon Capture", "EV Tech"],
    Robotics: ["Industrial Robotics", "Humanoid Systems", "Automation"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const teamSize =
    formData.type === "individual" ? 1 : Number(formData.teamSize);

  const amount = 1000 * teamSize;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    console.log({ ...formData, amount });
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <Navbar />

      <section className={styles.hero}>
        <h1>Conference Registration</h1>
        <p>Secure your participation in NC-EVMEH 2026</p>
      </section>

      <section className={styles.section}>
        <div className={styles.termsBox}>
          <h3>Terms & Conditions</h3>

          <ul>
            <li>
              Registration is confirmed only after successful payment
              verification.
            </li>
            <li>
              The registration fee is non-refundable once payment has been made.
            </li>
            <li>Participants must submit valid payment transaction details.</li>
            <li>
              The organizing committee reserves the right to reject incomplete
              or invalid registrations.
            </li>
            <li>
              All participants are expected to maintain professional and ethical
              conduct during the conference.
            </li>
            <li>
              Selected papers may be published in the official conference
              proceedings.
            </li>
            <li>
              The organizing committee reserves the right to make changes to the
              schedule if necessary.
            </li>
          </ul>
        </div>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" name="name" required onChange={handleChange} />
            </div>

            <div className={styles.inputGroup}>
              <label>College</label>
              <input
                type="text"
                name="college"
                required
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Department</label>
              <input
                type="text"
                name="department"
                required
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Track</label>
              <select name="track" required onChange={handleChange}>
                <option value="">Select Track</option>
                {Object.keys(tracks).map((track) => (
                  <option key={track}>{track}</option>
                ))}
              </select>
            </div>

            {formData.track && (
              <div className={styles.inputGroup}>
                <label>Theme</label>
                <select name="theme" required onChange={handleChange}>
                  <option value="">Select Theme</option>
                  {tracks[formData.track].map((theme) => (
                    <option key={theme}>{theme}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* PARTICIPATION TYPE */}
          <div className={styles.radioSection}>
            <label>
              <input
                type="radio"
                name="type"
                value="individual"
                checked={formData.type === "individual"}
                onChange={handleChange}
              />
              Individual
            </label>

            <label>
              <input
                type="radio"
                name="type"
                value="team"
                checked={formData.type === "team"}
                onChange={handleChange}
              />
              Team
            </label>
          </div>

          {formData.type === "team" && (
            <div className={styles.inputGroup}>
              <label>Team Size</label>
              <input
                type="number"
                name="teamSize"
                min="2"
                required
                onChange={handleChange}
              />
            </div>
          )}

          <div className={styles.amountBox}>Amount to be Paid: ₹{amount}</div>

          {/* PAYMENT DETAILS */}
          <div className={styles.paymentSection}>
            <div className={styles.inputGroup}>
              <label>Payer Name</label>
              <input
                type="text"
                name="payerName"
                required
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>UPI Number</label>
              <input
                type="tel"
                name="payerNumber"
                required
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Transaction Reference ID</label>
              <input
                type="text"
                name="transactionId"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" name="agree" onChange={handleChange} />I
            agree to the Terms and Conditions
          </label>

          <button type="submit" className={styles.submitButton}>
            Submit Registration
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Register;
