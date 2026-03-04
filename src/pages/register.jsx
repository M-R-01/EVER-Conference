import React, { useState } from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import styles from "./register.module.css";
import qr from "../assets/qr.jpg";
import api from "./api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "individual",
    college: "",
    department: "",
    teamSize: 1,
    payerName: "",
    payerNumber: "",
    transactionId: "",
    track: "",
    theme: "",
    paperTitle: "",
    agree: false,
  });

  const tracks = {
    "Energy Harvesting": [
      "Solar Energy Innovations",
      "New trends in wind energy",
      "Hybrid Energy Systems",
      "Energy storage and Grid",
      "AI-based Energy Management",
      "Thermoelectric & Piezoelectric Harvesting",
      "Waste Energy Recovery Systems",
      "Advanced Material Science",
      "Self-powered IoT & Battery-less Sensing",
    ],
    "EV Mobility Trends": [
      "Advanced Battery Technology",
      "Battery Management Systems",
      "Power Electronics & Drives",
      "EV Charging Infrastructure",
      "Smart and AI integration",
      "Innovations in hybrid vehicles",
      "Sustainability and Quality",
      "Safety and security",
      "Sustainable Manufacturing Lifecycle",
      "Hybrid energy storage control",
      "Fast Charging Protocols",
    ],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/register", {
        NAME: formData.name,
        EMAIL: formData.email,
        COLLEGE: formData.college,
        DEPARTMENT: formData.department,
        TEAM_SIZE: formData.type === "team" ? formData.teamSize : 1,
        AMOUNT: 1000 * (formData.type === "team" ? formData.teamSize : 1),
        PAYER_NAME: formData.payerName,
        PAYER_NUMBER: formData.payerNumber,
        TRN_REF_ID: formData.transactionId,
        TRACK: formData.track,
        THEME: formData.theme,
        TITLE: formData.paperTitle,
      });

      const { application_id } = response.data;

      alert(
        `Registration Successful! Your Application ID is ${application_id}`,
      );
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Something went wrong");
    }
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
              Registration will be considered valid only after successful
              payment and verification of the transaction details submitted in
              the registration form.
            </li>

            <li>
              All participants must ensure that the payment transaction
              reference ID and payer details provided during registration are
              accurate. Incorrect or unverifiable payment details may lead to
              rejection of the registration.
            </li>

            <li>
              The registration fee is strictly non-refundable under any
              circumstances once the registration has been submitted and payment
              has been made.
            </li>

            <li>
              Participants registering as a team may designate one member to
              complete the registration on behalf of the group. However, the
              total number of participants in the team must be clearly specified
              during registration.
            </li>

            <li>
              Details of all team members will be collected during on-site
              registration at the conference venue. Teams must ensure that the
              number of participants matches the number specified during online
              registration.
            </li>

            <li>
              Participants submitting research papers must upload or submit
              their final paper in the prescribed conference format before the
              specified submission deadline. The Application ID generated during
              registration must be clearly mentioned in the paper submission.
            </li>

            <li>
              Failure to submit the research paper within the announced deadline
              or in the required format may result in the paper not being
              considered for review or presentation.
            </li>

            <li>
              The organizing committee reserves the right to accept or reject
              any paper submission that does not meet the academic or formatting
              requirements of the conference.
            </li>

            <li>
              All participants are expected to maintain professional conduct
              throughout the conference. Any behavior deemed inappropriate by
              the organizing committee may result in removal from the event
              without refund.
            </li>

            <li>
              The organizing committee reserves the right to make modifications
              to the conference schedule, program, or event format if necessary.
            </li>

            <li>
              Participants are strongly advised to clarify any doubts regarding
              registration, payment, paper submission, or participation before
              completing their registration. All queries should be directed to
              the organizing team through the contact details provided on the
              Contact page of this website.
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
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
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

            {formData.track && (
              <div className={styles.inputGroup}>
                <label>Paper Title</label>
                <input
                  type="text"
                  name="paperTitle"
                  required
                  onChange={handleChange}
                />
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

          {/* QR PAYMENT SECTION */}
          <div className={styles.qrSection}>
            <h3>Scan & Pay</h3>

            <div className={styles.qrContainer}>
              {/* Replace src later with your QR image */}
              <img src={qr} alt="Payment QR Code" className={styles.qrImage} />
            </div>

            <p className={styles.qrNote}>
              Scan the QR code using any UPI app (GPay / PhonePe / Paytm). After
              completing the payment, enter the transaction details below.
            </p>
          </div>

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
