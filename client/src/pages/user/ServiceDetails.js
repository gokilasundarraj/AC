import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/UserFooter";


const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await API.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service:", err);
      }
    };
    fetchService();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("serviceCart")) || [];
    cart.push(service);
    localStorage.setItem("serviceCart", JSON.stringify(cart));
    navigate("/service-cart");
  };

  if (!service) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ fontWeight: "600", color: "var(--primary)", marginTop: "1rem" }}>Analyzing technical requirements...</p>
    </div>
  );

  const imageUrl = service.image
    ? `https://ac-klmv.onrender.com/uploads/${service.image}`
    : "https://via.placeholder.com/600x400?text=Pro+Maintenance";

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container" style={{ maxWidth: "1100px", marginTop: "3rem"}}>

        <div className="card fade-in" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "3rem",
          padding: "3rem",
          background: "var(--white)",
          boxShadow: "var(--shadow-lg)",
          borderRadius: "24px",
          border: "none",
          borderTop: "6px solid var(--secondary)",
          width:"100%"
        }}>
          
          <div style={{ position: "relative" }}>
            <div className="card-img" style={{
              height: "100%",
              minHeight: "450px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)"
            }}>
              <img
                src={imageUrl}
                alt={service.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Expert+Technician"; }}
              />
            </div>
            <div className="status-badge status-pending" style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              boxShadow: "var(--shadow-md)"
            }}>
              CERTIFIED SERVICE
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ color: "var(--accent)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Technical Department
            </span>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "3rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
              {service.name}
            </h2>

            <p style={{
              fontSize: "1.125rem",
              lineHeight: "1.8",
              color: "var(--text-light)",
              marginBottom: "2.5rem",
              borderLeft: "4px solid var(--accent)",
              paddingLeft: "1.5rem"
            }}>
              {service.description || "Expert maintenance and diagnostic services delivered by our senior technical team. We utilize precision equipment to ensure your systems perform at 100% efficiency year-round."}
            </p>

            <div style={{ marginBottom: "3rem" }}>
              <span style={{ fontSize: "1rem", color: "var(--text-light)", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Professional Service Fee</span>
              <h3 className="card-price" style={{ fontSize: "3.5rem", color: "var(--primary)" }}>₹ {service.price}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--accent)", fontWeight: "700" }}>✓ Includes transport & basic diagnostics</p>
            </div>

            <div style={{ display: "flex", gap: "1.5rem" }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1.5, padding: "1.25rem", fontSize: "1.1rem" }}
                onClick={addToCart}
              >
                Add to Booking
              </button>
              <button
                className="btn btn-outline"
                style={{ flex: 1, padding: "1.25rem", fontSize: "1.1rem" }}
                onClick={() => { addToCart(); navigate("/service-cart"); }}
              >
                Book Now
              </button>
            </div>

            <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--bg-color)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
              <p style={{ color: "var(--text-dark)", fontSize: "0.875rem", textAlign: "center", margin: 0 }}>
                Most services can be scheduled within **24-48 hours**.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ServiceDetails;
