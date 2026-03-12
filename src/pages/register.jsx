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
    category: "student",
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
    accommodation: false, // ✅ NEW
    agree: false,
  });
  const [successData, setSuccessData] = useState(null);

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

  const fees = {
    student: 1000,
    faculty: 2000,
    industry: 5000,
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

  const baseFee = fees[formData.category] * teamSize;
  const gst = baseFee * 0.18;
  const totalAmount = baseFee + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/register", {
        NAME: formData.name,
        EMAIL: formData.email,
        COLLEGE: formData.college,
        DEPARTMENT: formData.department,
        TEAM_SIZE: formData.type === "team" ? formData.teamSize : 1,
        AMOUNT: totalAmount,
        CATEGORY: formData.category,
        GST: gst,
        TRACK: formData.track,
        THEME: formData.theme,
        TITLE: formData.paperTitle,
        ACCOMMODATION: formData.accommodation,
      });

      const { application_id } = response.data;

      setSuccessData({ application_id });
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

          <div className={styles.categorySection}>
            <label>Participant Category</label>

            <select
              name="category"
              onChange={handleChange}
              value={formData.category}
              required
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="industry">Industry</option>
            </select>
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

          <div className={styles.billingBox}>
            <h3>Registration Fee Summary</h3>

            <table className={styles.billTable}>
              <tbody>
                <tr>
                  <td>Participant Category</td>
                  <td>{formData.category.toUpperCase()}</td>
                </tr>

                <tr>
                  <td>Base Registration Fee</td>
                  <td>
                    ₹{fees[formData.category]} × {teamSize}
                  </td>
                </tr>

                <tr>
                  <td>Subtotal</td>
                  <td>₹{baseFee.toFixed(2)}</td>
                </tr>

                <tr>
                  <td>GST (18%)</td>
                  <td>₹{gst.toFixed(2)}</td>
                </tr>

                <tr className={styles.totalRow}>
                  <td>Total Amount Payable</td>
                  <td>₹{totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

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

          <div className={styles.paymentFormBox}>
            <h3>Submit Payment Details</h3>

            <p>
              After completing your payment, please upload your payment proof
              and details using the Google Form below.
            </p>

            <a
              href="https://forms.gle/GXi8jnETNKzyB2qT8"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.paymentLink}
            >
              Open Payment Submission Form →
            </a>
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="accommodation"
              checked={formData.accommodation}
              onChange={handleChange}
            />
            I require accommodation during the conference
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="agree"
              onChange={handleChange}
              required
            />
            I agree to the Terms and Conditions
          </label>

          <button type="submit" className={styles.submitButton}>
            Submit Registration
          </button>
        </form>
      </section>

      {successData && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.successIcon}>✓</div>

            <h2>Registration Successful</h2>

            <p>Your Application ID</p>

            <div className={styles.appId}>{successData.application_id}</div>

            <p className={styles.note}>
              Please save this ID for future communication and paper submission.
            </p>

            <button
              className={styles.modalBtn}
              onClick={() => setSuccessData(null)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Register;
