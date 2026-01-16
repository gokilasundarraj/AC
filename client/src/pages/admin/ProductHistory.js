import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../components/navbar/AdminNav";

const ProductHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductOrders();
  }, []);

  const fetchProductOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toUpperCase() : "PENDING";
    if (s === "DELIVERED" || s === "SUCCESS") return <span className="status-badge status-completed">SUCCESS</span>;
    if (s === "CANCELLED") return <span className="status-badge status-cancelled">CANCELLED</span>;
    return <span className="status-badge status-pending">PENDING</span>;
  };

  return (
    <div className="page-wrapper">
      <AdminNav />
      <div className="container">
        <h2 className="section-title">Product Audit trail (All Status)</h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div className="loader" style={{ margin: "0 auto" }}></div>
            <p style={{ marginTop: "1rem", opacity: 0.6 }}>Loading system orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "400px" }}>No product orders recorded in the system.</div>
        ) : (
          <div className="table-container fade-in" style={{ padding: "1.5rem" }}>
            <table>
              <thead>
                <tr>
                  <th>Customer Detials</th>
                  <th>Equipment Manifest</th>
                  <th>Total Items</th>
                  <th>Transaction (₹)</th>
                  <th>Date & Time</th>
                  <th>System Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>
                      <div style={{ fontWeight: "600" }}>{o.userName || o.user?.name || "Unknown"}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{o.userPhone || "No Phone"}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: "0.85rem" }}>
                        {o.products && o.products.length > 0 ? (
                          o.products.map((p, idx) => (
                            <div key={idx} style={{ marginBottom: "2px" }}>
                              • {p.name} (x{p.quantity})
                            </div>
                          ))
                        ) : (
                          <span style={{ color: "var(--danger)" }}>No Items</span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {o.products ? o.products.reduce((acc, p) => acc + p.quantity, 0) : 0}
                    </td>
                    <td>
                      <span style={{ fontWeight: "700", color: "var(--primary)" }}>₹ {o.totalAmount || o.totalPrice || 0}</span>
                    </td>
                    <td style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                      {new Date(o.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
    </div>
  );
};

export default ProductHistory;
