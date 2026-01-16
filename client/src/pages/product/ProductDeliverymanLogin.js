import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDeliverymanLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const deliveryEmail = "productDeliveryman@gmail.com";
    const deliveryPassword = "gokilasundarraj";

    if (email === deliveryEmail && password === deliveryPassword) {
      localStorage.setItem("productDeliveryLogin", "true");
      alert("Product Deliveryman Login Successful");
      navigate("/product-delivery/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="section-title" style={{ textAlign: "center", fontSize: "1.75rem" }}>Delivery Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Work Email</label>
            <input
              type="email"
              placeholder="productDeliveryman@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Secure PIN / Password</label>
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
            Open Delivery Portal
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-light)", fontSize: "0.875rem" }}>
          Logistics Partner Authorization Required
        </p>
      </div>
    </div>
  );
};

export default ProductDeliverymanLogin;
