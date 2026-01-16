import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../components/navbar/AdminNav";
import AdminFooter from "../../components/footer/AdminFooter"

const ServiceHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceOrders();
  }, []);

  const fetchServiceOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/services/admin-history");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching service history:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toUpperCase() : "PENDING";
    switch (s) {
      case "COMPLETED":
      case "SUCCESS":
        return <span className="status-badge status-completed">SUCCESS</span>;
      case "CANCELLED":
        return <span className="status-badge status-cancelled">CANCELLED</span>;
      case "PENDING":
        return <span className="status-badge status-pending">PENDING</span>;
      case "ASSIGNED":
      case "IN_PROGRESS":
        return <span className="status-badge" style={{ backgroundColor: "#3b82f6", color: "white" }}>IN PROGRESS</span>;
      default:
        return <span className="status-badge status-pending">{s}</span>;
    }
  };

  return (
    <div className="page-wrapper">
      <AdminNav />
      <div className="container">
        <h2 className="section-title text-gradient">Technical Service Audit Trail</h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div className="loader" style={{ margin: "0 auto" }}></div>
            <p style={{ marginTop: "1rem", opacity: 0.6, fontWeight: "600" }}>Fetching system-wide service ledger...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center", padding: "2rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>No service history found.</h3>
            <p style={{ opacity: 0.8 }}>Technical interventions will appear here once booked.</p>
          </div>
        ) : (
          <div className="table-container fade-in" style={{ padding: "1.5rem", marginTop: "2rem" }}>
            <table>
              <thead>
                <tr>
                  <th>Customer Intake</th>
                  <th>Service Provision</th>
                  <th>Technical Staff</th>
                  <th>Fiscal Val (₹)</th>
                  <th>Timestamp</th>
                  <th>Operational Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>
                      <div style={{ fontWeight: "700", color: "var(--primary)" }}>{o.customerName}</div>
                      <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>Phone no:{o.customerPhone}</div>
                    </td>
                    <td>
                      {o.services && o.services.length > 0 ? (
                        <div>
                          {o.services.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: "0.25rem" }}>
                              <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>{item.name}</div>
                            </div>
                          ))}
                          <div style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "0.5rem" }}>
                            ID: {o._id.slice(-6).toUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontWeight: "600" }}>Service Request</div>
                          <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>ID: {o._id.slice(-6).toUpperCase()}</div>
                        </div>
                      )}
                    </td>
                    <td>
                      {o.technician ? (
                        <div>
                          <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>{o.technician.name}</div>
                          <div style={{ fontSize: "0.75rem", opacity: 0.6 }}>Tech ID: {o.technician._id.slice(-6).toUpperCase()}</div>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.8rem", opacity: 0.5, fontStyle: "italic" }}>Not Assigned</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontWeight: "800", color: "var(--secondary)", fontSize: "1rem" }}>₹ {o.totalPrice || 0}</span>
                    </td>
                    <td style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                      <div>{new Date(o.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                      <div style={{ opacity: 0.6 }}>{new Date(o.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td>
                      {getStatusBadge(o.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AdminFooter/>
    </div>
  );
};

export default ServiceHistory;
