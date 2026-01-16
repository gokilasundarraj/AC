import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/Footer";

const ServiceCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("serviceCart")) || []
  );

  const removeService = (i) => {
    const newCart = cart.filter((_, idx) => idx !== i);
    setCart(newCart);
    localStorage.setItem("serviceCart", JSON.stringify(newCart));
  };

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container">
        <h2 className="section-title">Service Booking Cart</h2>

        {cart.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "400px" }}>
            No services selected for booking.
          </div>
        ) : (
          <div className="card-grid">
            {cart.map((s, i) => (
              <div key={i} className="card fade-in">
                <img
                  className="card-img"
                  src={`http://localhost:5000/uploads/${s.image}`}
                  alt={s.name}
                  style={{ height: "180px" }}
                />
                <div className="card-content">
                  <h3 className="card-title">{s.name}</h3>
                  <p className="card-price" style={{ marginBottom: "1.5rem" }}>₹ {s.price}</p>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => navigate("/service-order")}>Confirm Booking</button>
                    <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => removeService(i)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default ServiceCart;
