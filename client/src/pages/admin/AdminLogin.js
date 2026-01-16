import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const adminEmail = "gokilasundarraj@gmail.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminLogin", "true");
      alert("Admin Login Successful ✅");
      navigate("/admin/home");
    } else {
      setError("Invalid admin email or password ❌");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="section-title" style={{ textAlign: "center", fontSize: "1.75rem" }}>Admin Portal</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Administrator Email</label>
            <input
              type="email"
              placeholder="gokilasundarraj@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Master Password</label>
            <input
              type="password"
              placeholder="admin123"
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
            Authenticate Admin
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-light)", fontSize: "0.875rem" }}>
          System Administrator Access Only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;