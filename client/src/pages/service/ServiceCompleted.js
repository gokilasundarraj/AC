import React, { useEffect, useState } from "react";
import ServiceTechnicianNav from "../../components/navbar/ServiceTechnicianNav";
import SerFooter from "../../components/footer/SerFooter";
import API from "../../api/axios";

const ServiceCompleted = () => {
  const [completedServices, setCompletedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await API.get("/services/completed");
        setCompletedServices(res.data);
      } catch (err) {
        console.error("Error loading completed services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
    window.addEventListener("focus", fetchHistory);
    return () => window.removeEventListener("focus", fetchHistory);
  }, []);

  return (
    <div className="page-wrapper">
      <ServiceTechnicianNav />
      <div className="container">
        <h2 className="section-title text-gradient">Resolved Service History</h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div className="loader" style={{ margin: "0 auto" }}></div>
            <p style={{ marginTop: "1rem", opacity: 0.6 }}>
              Synchronizing resolved workload...
            </p>
          </div>
        ) : completedServices.length === 0 ? (
          <div
            className="alert alert-danger"
            style={{
              maxWidth: "500px",
              margin: "3rem auto",
              textAlign: "center",
              padding: "3rem",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>No completed services found.</h3>
            <p style={{ opacity: 0.8 }}>
              Start resolving technical tasks to see your history here.
            </p>
          </div>
        ) : (
          <div className="card-grid fade-in">
            {completedServices.map((order) => (
              <div
                key={order._id}
                className="card"
                style={{ borderTop: "6px solid var(--accent)" }}
              >
                <div className="card-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div>
                      <h4
                        className="card-title"
                        style={{ margin: 0, color: "var(--primary)" }}
                      >
                        ID: {order._id.slice(-6).toUpperCase()}
                      </h4>
                      <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                        Technical Resolution
                      </p>
                    </div>
                    <span className="status-badge status-completed">SUCCESS</span>
                  </div>

                  <div
                    style={{
                      marginBottom: "1.5rem",
                      fontSize: "0.9rem",
                      color: "var(--text-light)",
                    }}
                  >
                    <p style={{ marginBottom: "0.5rem" }}>
                      <strong>Client:</strong> {order.customerName}
                    </p>
                    <p style={{ marginBottom: "0.5rem" }}>
                      <strong>Resolved:</strong>{" "}
                      {order.completedAt
                        ? new Date(order.completedAt).toLocaleString()
                        : new Date(order.updatedAt || order.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Site:</strong> {order.address || "N/A"}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "1.25rem",
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {order.services && order.services.length > 0 ? (
                      <>
                        {order.services.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <span style={{ fontWeight: "700" }}>{item.name}</span>
                            <span
                              style={{
                                color: "var(--secondary)",
                                fontWeight: "800",
                              }}
                            >
                              ₹ {item.price}
                            </span>
                          </div>
                        ))}
                        <div
                          style={{
                            borderTop: "2px solid #e2e8f0",
                            paddingTop: "0.5rem",
                            marginTop: "0.5rem",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <strong>Total:</strong>
                          <strong
                            style={{
                              color: "var(--accent)",
                              fontSize: "1.1rem",
                            }}
                          >
                            ₹ {order.totalPrice}
                          </strong>
                        </div>
                      </>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontWeight: "700" }}>Service Request</span>
                        <span
                          style={{
                            color: "var(--secondary)",
                            fontWeight: "800",
                          }}
                        >
                          ₹ {order.totalPrice || 0}
                        </span>
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

export default ServiceCompleted;
