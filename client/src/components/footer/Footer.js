import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
          const [open, setOpen] = useState(false);
    
    return (
        <footer style={{
            backgroundColor: "var(--primary)",
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
                       <Link to="/user/signup" style={{color:"var(--white)", textDecoration:"none" , opacity:0.7,fontSize:"0.9rem"}} onClick={() => setOpen(false)}>User Signup</Link><br/>
                        <Link to="/admin/login" style={{color:"var(--white)", textDecoration:"none" , opacity:0.7,fontSize:"0.9rem"}} onClick={() => setOpen(false)}>Admin Login</Link><br/>
                        <Link to="/product-delivery/login" style={{color:"var(--white)", textDecoration:"none" , opacity:0.7,fontSize:"0.9rem"}} onClick={() => setOpen(false)}>Delivery Login</Link><br/>
                        <Link to="/service-technician/login" style={{color:"var(--white)", textDecoration:"none" , opacity:0.7,fontSize:"0.9rem"}} onClick={() => setOpen(false)}>Technician Login</Link><br/>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "600" }}>Support</h4>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "0.75rem" }}><a href="/" style={{ color: "var(--white)", textDecoration: "none", opacity: 0.7, fontSize: "0.9rem" }}>Help Center</a></li>
                        <li style={{ marginBottom: "0.75rem" }}><a href="/" style={{ color: "var(--white)", textDecoration: "none", opacity: 0.7, fontSize: "0.9rem" }}>Privacy Policy</a></li>
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
