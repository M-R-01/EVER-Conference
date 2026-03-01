import React from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer"

const Register = () => {
    return (
        <div style={{width: "100%", height: "100vh"}}>
            <Navbar />
            <div>
                <h1 style={{textAlign: "center", margin: "auto", marginTop: "12rem", marginBottom: "12rem", color: "#0d4d2d", fontSize: "2rem"}}>Registrations open on 2nd March, 2026 11:59pm.</h1>
            </div>
            <Footer />
        </div>
    );
};

export default Register;