import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceTechnicianNav from "../../components/navbar/ServiceTechnicianNav";
import SerFooter from "../../components/footer/SerFooter";

const ServicePending = () => {
  const [pendingServices, setPendingServices] = useState([]);
  const [verifyingId, setVerifyingId] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services/admin-history");
        const filtered = res.data.filter(
          (s) =>
            s.status?.toUpperCase() === "PENDING" ||
            s.status?.toUpperCase() === "ASSIGNED" ||
            s.status?.toUpperCase() === "IN_PROGRESS"
        );
        setPendingServices(filtered);
      } catch (err) {
        console.error("Error fetching technical queue:", err);
      }
    };
    fetchPending();
  }, []);

  const handleVerify = async (serviceId) => {
    const systemOtp = localStorage.getItem(`service_otp_${serviceId}`);

    if (enteredOtp === systemOtp) {
      try {
       
        await axios.put(`http://localhost:5000/api/services/${serviceId}/status`, {
          status: "COMPLETED",
        });

        alert("Service Verification Successful! Marked as COMPLETED.");

        setPendingServices((prev) => prev.filter((s) => s._id !== serviceId));

        setError("");
        setVerifyingId(null);
        setEnteredOtp("");
      } catch (err) {
        console.error("Status update failed:", err);
        setError("Failed to update service status. Try again.");
      }
    } else {
      setError("Invalid Verification Code. Please check the code from customer.");
    }
  };

  return (
    <div className="page-wrapper">
      <ServiceTechnicianNav />
      <div className="container">
        <h2 className="section-title">Field Technical Queue</h2>

        {pendingServices.length === 0 ? (
          <div
            className="alert alert-danger"
            style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}
          >
            <h3>No pending service deployments found.</h3>
            <p style={{ opacity: 0.8 }}>
              Technical field staff: Please check back later for new assignments.
            </p>
          </div>
        ) : (
          <div className="card-grid fade-in">
            {pendingServices.map((service) => (
              <div
                key={service._id}
                className="card"
                style={{ borderTop: "6px solid var(--primary)" }}
              >
                <div className="card-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <h3 className="card-title" style={{ margin: 0 }}>
                      ID: {service._id.slice(-6).toUpperCase()}
                    </h3>
                    <span className="status-badge status-pending">{service.status}</span>
                  </div>

                  <div style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                    <p style={{ marginBottom: "0.5rem" }}>
                      <strong>Contact:</strong> {service.customerName}
                    </p>
                    <p style={{ marginBottom: "0.5rem" }}>
                      <strong>Phone:</strong> {service.customerPhone}
                    </p>
                    <p>
                      <strong>Target:</strong> {service.address}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "var(--bg-color)",
                      padding: "1.25rem",
                      borderRadius: "12px",
                      marginBottom: "2rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Technical Scope
                    </p>
                    {service.services && service.services.length > 0 ? (
                      service.services.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "0.9rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span>{item.name}</span>
                          <span style={{ fontWeight: "700" }}>₹ {item.price}</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                        No service details available
                      </div>
                    )}
                    {service.totalPrice && (
                      <div
                        style={{
                          borderTop: "2px solid var(--border)",
                          paddingTop: "0.5rem",
                          marginTop: "0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "800",
                        }}
                      >
                        <span>Total:</span>
                        <span style={{ color: "var(--primary)" }}>
                          ₹ {service.totalPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="otp-cluster">
                    {verifyingId !== service._id ? (
                      <button
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                        onClick={() => setVerifyingId(service._id)}
                      >
                        Verify Completion
                      </button>
                    ) : (
                      <div className="fade-in">
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            color: "var(--primary)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          ENTER CUSTOMER TOKEN
                        </label>
                        <div className="otp-input-wrapper">
                          <input
                            type="text"
                            maxLength="4"
                            className="otp-digit"
                            style={{
                              width: "100%",
                              letterSpacing: "1rem",
                              textAlign: "center",
                              fontSize: "1.5rem",
                            }}
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            placeholder="----"
                          />
                        </div>
                        {error && (
                          <p
                            style={{
                              color: "var(--danger)",
                              fontSize: "0.8rem",
                              marginTop: "0.5rem",
                              fontWeight: "600",
                            }}
                          >
                            {error}
                          </p>
                        )}

                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginTop: "1rem",
                          }}
                        >
                          <button
                            className="btn btn-primary"
                            style={{ flex: 2 }}
                            onClick={() => handleVerify(service._id)}
                          >
                            OK
                          </button>
                          <button
                            className="btn btn-outline"
                            style={{ flex: 1 }}
                            onClick={() => {
                              setVerifyingId(null);
                              setEnteredOtp("");
                              setError("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <SerFooter />
    </div>
  );
};

export default ServicePending;
