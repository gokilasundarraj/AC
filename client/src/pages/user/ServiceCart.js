import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/UserFooter";

const ServiceCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("serviceCart")) || [];
    setCart(storedCart);
  }, []);

  const removeService = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("serviceCart", JSON.stringify(updatedCart));
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
                  src={
                    s.image
                      ? `https://ac-klmv.onrender.com/uploads/${s.image}`
                      : "https://via.placeholder.com/300x180?text=Service"
                  }
                  alt={s.name}
                  style={{ height: "180px" }}
                />

                <div className="card-content">
                  <h3 className="card-title">{s.name}</h3>

                  <p className="card-price" style={{ marginBottom: "1.5rem" }}>
                    ₹ {s.userPrice ? s.userPrice : "Pay After Service"}
                  </p>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 2 }}
                      onClick={() => navigate("/service-order")}
                    >
                      Confirm Booking
                    </button>

                    <button
                      className="btn btn-danger"
                      style={{ flex: 1 }}
                      onClick={() => removeService(i)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServiceCart;
