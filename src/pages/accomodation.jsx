import React from "react";
import Navbar from "../components/nav";
import styles from "./accomodation.module.css";
import Footer from "../components/footer";


const Accomodation = () => {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Navbar />
            <div>
                <h1 style={{ textAlign: "center", margin: "auto", marginTop: "12rem", marginBottom: "12rem", color: "#0d4d2d", fontSize: "2rem" }}>Accomodation registrations open on 10th March.</h1>
            </div>
            <Footer />
        </div>
    );
};

export default Accomodation;