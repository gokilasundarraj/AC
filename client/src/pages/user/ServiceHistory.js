import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/AdminFooter";

const ServiceHistory = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  const userDetails = userInfo?.user || userInfo;
  const userId = userDetails?.id || userDetails?._id;

  useEffect(() => {
    fetchServiceHistory();
  }, []);

  const fetchServiceHistory = async () => {
    try {
      setLoading(true);
      
      const res = await axios.get("https://ac-klmv.onrender.com/api/services/admin-history");

      const userServices = res.data.filter(s => s.user?._id === userId || s.user === userId);

      userServices.forEach(service => {
        if ((service.status?.toUpperCase() === "PENDING" ||
          service.status?.toUpperCase() === "ASSIGNED" ||
          service.status?.toUpperCase() === "IN_PROGRESS")) {
          const otpKey = `service_otp_${service._id}`;
          const existingOtp = localStorage.getItem(otpKey);

          if (!existingOtp) {
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            localStorage.setItem(otpKey, otp);
            console.log(`Generated OTP for service ${service._id}:`, otp);
          } else {
            console.log(`Existing OTP for service ${service._id}:`, existingOtp);
          }
        }
      });

      setServices(userServices);
    } catch (err) {
      console.error("Error fetching service history:", err);
    } finally {
      setLoading(false);
    }
  };

  const pendingServices = services.filter(s =>
    s.status?.toUpperCase() === "PENDING" || s.status?.toUpperCase() === "ASSIGNED" || s.status?.toUpperCase() === "IN_PROGRESS"
  );
  const completedServices = services.filter(s =>
    s.status?.toUpperCase() === "COMPLETED" || s.status?.toUpperCase() === "SUCCESS"
  );
  const cancelledServices = services.filter(s =>
    s.status?.toUpperCase() === "CANCELLED"
  );

  if (loading) {
    return (
      <div className="page-wrapper">
        <UserNav />
        <div className="container" style={{ textAlign: "center", padding: "5rem" }}>
          <div className="loader" style={{ margin: "0 auto 1rem" }}></div>
          <p style={{ opacity: 0.6 }}>Loading your service history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container">
        <h2 className="section-title text-gradient">My Service History</h2>

        {pendingServices.length > 0 && (
          <>
            <h3 className="card-title" style={{ marginTop: "2rem", marginBottom: "1rem" }}>Active Requests</h3>
            <div className="card-grid fade-in">
              {pendingServices.map((service) => (
                <div key={service._id} className="card" style={{ borderTop: "6px solid var(--warning)" }}>
                  <div className="card-content">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <h4 className="card-title" style={{ margin: 0 }}>ID: {service._id.slice(-6).toUpperCase()}</h4>
                      <span className="status-badge status-pending">{service.status}</span>
                    </div>
                    <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                      <p><strong> Location:</strong> {service.address}</p>
                      <p><strong> Requested:</strong> {new Date(service.createdAt).toLocaleString()}</p>
                    </div>
                    <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                      {service.services?.map((item, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <span>{item.name}</span>
                          <span style={{ fontWeight: "700" }}>₹ {item.price}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "0.5rem", marginTop: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                        <strong>Total:</strong>
                        <strong style={{ color: "var(--primary)" }}>₹ {service.totalPrice}</strong>
                      </div>
                    </div>

                    <div className="otp-cluster" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
                      <p style={{ color: "white", fontSize: "0.75rem", fontWeight: "800", marginBottom: "0.5rem", letterSpacing: "1px" }}>TECHNICIAN VERIFICATION CODE</p>
                      <div className="otp-display" style={{ background: "rgba(255,255,255,0.2)", padding: "1rem", borderRadius: "8px", marginBottom: "0.5rem" }}>
                        <p style={{ color: "white", fontSize: "2rem", fontWeight: "800", letterSpacing: "0.5rem", margin: 0 }}>
                          {localStorage.getItem(`service_otp_${service._id}`) || "----"}
                        </p>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.7rem", margin: 0 }}>Share this code with the technician upon service completion</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {completedServices.length > 0 && (
          <>
            <h3 className="card-title" style={{ marginTop: "3rem", marginBottom: "1rem" }}>Completed Services</h3>
            <div className="card-grid fade-in">
              {completedServices.map((service) => (
                <div key={service._id} className="card" style={{ borderTop: "6px solid var(--accent)" }}>
                  <div className="card-content">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <h4 className="card-title" style={{ margin: 0 }}>ID: {service._id.slice(-6).toUpperCase()}</h4>
                      <span className="status-badge status-completed">SUCCESS</span>
                    </div>
                    <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                      <p><strong>Location:</strong> {service.address}</p>
                      <p><strong>Completed:</strong> {new Date(service.updatedAt).toLocaleString()}</p>
                    </div>
                    <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px" }}>
                      {service.services?.map((item, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <span> {item.name}</span>
                          <span style={{ fontWeight: "700" }}>₹ {item.price}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "0.5rem", marginTop: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                        <strong>Total:</strong>
                        <strong style={{ color: "var(--accent)" }}>₹ {service.totalPrice}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {cancelledServices.length > 0 && (
          <>
            <h3 className="card-title" style={{ marginTop: "3rem", marginBottom: "1rem", color: "var(--danger)" }}>Cancelled Requests</h3>
            <div className="card-grid fade-in">
              {cancelledServices.map((service) => (
                <div key={service._id} className="card" style={{ borderTop: "6px solid var(--danger)", opacity: 0.7 }}>
                  <div className="card-content">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <h4 className="card-title" style={{ margin: 0 }}>ID: {service._id.slice(-6).toUpperCase()}</h4>
                      <span className="status-badge status-cancelled">CANCELLED</span>
                    </div>
                    <div style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>
                      <p><strong> Location:</strong> {service.address}</p>
                      <p><strong> Cancelled:</strong> {new Date(service.updatedAt).toLocaleString()}</p>
                    </div>
                    <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", textDecoration: "line-through", opacity: 0.6 }}>
                      {service.services?.map((item, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <span> {item.name}</span>
                          <span style={{ fontWeight: "700" }}>₹ {item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

       
        {services.length === 0 && (
          <div className="alert alert-danger" style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center", padding: "3rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>No service history found.</h3>
            <p style={{ opacity: 0.8 }}>Your service requests will appear here once booked.</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default ServiceHistory;
