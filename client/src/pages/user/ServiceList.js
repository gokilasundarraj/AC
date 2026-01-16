import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/Footer";


const ServiceList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ac-klmv.onrender.com/api/services")
      .then((res) => setServices(res.data));
  }, []);

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container">
        <h2 className="section-title">Professional Maintenance Services</h2>

        <div className="card-grid">
          {services.map((s) => (
            <div
              key={s._id}
              className="card fade-in"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/services/${s._id}`)}
            >
              <img
                className="card-img"
                src={`https://ac-klmv.onrender.com/uploads/${s.image}`}
                alt={s.name}
                style={{ height: "200px" }}
              />
              <div className="card-content">
                <h3 className="card-title">{s.name}</h3>
                <p className="card-price">₹ {s.price}</p>
                <p style={{ color: "var(--text-light)", fontSize: "0.875rem", marginTop: "1rem" }}>Expert technical support for optimal cooling performance.</p>
                <button className="btn btn-outline" style={{ marginTop: "1.5rem", width: "100%" }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ServiceList;
