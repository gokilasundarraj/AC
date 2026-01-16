import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
    
    return (
        <footer style={{
            backgroundColor: "#385aab",
            color: "var(--white)",
            padding: "4rem 2rem 2rem 2rem",
            marginTop: "auto"
        }}>
            <div className="container" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "3rem",
                padding: 0
            }}>
               
                <div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                        <img src={logo} alt="Cooling Masters" style={{ height: "40px", marginRight: "12px" }} />
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Cooling<span style={{ color: "var(--accent)" }}>Masters</span></h3>
                    </div>
                    <p style={{ opacity: 0.7, fontSize: "0.9rem", lineHeight: "1.8" }}>
                        Delivering premium climate control solutions and world-class maintenance services since 2024.
                    </p>
                </div>

               
                <div>
                    <h4 style={{ marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "600" }}>Platform</h4>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "0.75rem" }}><a href="/service-technician/home" style={{ color: "var(--white)", textDecoration: "none", opacity: 0.7, fontSize: "0.9rem" }}>Home</a></li>
                        <li style={{ marginBottom: "0.75rem" }}><a href="/service-technician/work-status" style={{ color: "var(--white)", textDecoration: "none", opacity: 0.7, fontSize: "0.9rem" }}>Work Status</a></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "600" }}>Support</h4>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "0.75rem" }}><a href="/service-technician/home" style={{ color: "var(--white)", textDecoration: "none", opacity: 0.7, fontSize: "0.9rem" }}>Help Center</a></li>
                        <li style={{ marginBottom: "0.75rem" }}><a href="/service-technician/home" style={{ color: "var(--white)", textDecoration: "none", opacity: 0.7, fontSize: "0.9rem" }}>Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                   <h4 style={{ marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "600" }}>Contact</h4>
                    <p style={{ opacity: 0.7, fontSize: "0.9rem", marginBottom: "0.5rem" }}>123 coolingmasters, CBE</p>
                    <p style={{ opacity: 0.7, fontSize: "0.9rem", marginBottom: "0.5rem" }}>+1 (800) COOL-MASTERS</p>
                    <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>support@coolingmasters.com</p>
                </div>
            </div>

            <div style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginTop: "4rem",
                paddingTop: "2rem",
                textAlign: "center",
                fontSize: "0.875rem",
                opacity: 0.5
            }}>
                © 2026 Cooling Masters. All rights reserved.
                Create by Gokilasundarraj
            </div>
        </footer>
    );
};

export default Footer;
