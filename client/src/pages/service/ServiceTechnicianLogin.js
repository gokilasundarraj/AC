import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceTechnicianLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (
      email === "servicetechnician@gmail.com" &&
      password === "gokilasundarraj"
    ) {
      
      localStorage.setItem("serviceTechnician", "true");
      navigate("/service-technician/home");
    } else {
      
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="section-title" style={{ textAlign: "center", fontSize: "1.75rem" }}>Technician Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              placeholder="servicetechnician@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Access Password</label>
            <input
              type="password"
              placeholder="gokilasundarraj"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Authenticate Portal
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-light)", fontSize: "0.875rem" }}>
          Technical Support Personnel Authorization Only
        </p>
      </div>
    </div>
  );
};

export default ServiceTechnicianLogin;
