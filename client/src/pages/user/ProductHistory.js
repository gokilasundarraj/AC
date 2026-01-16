import React, { useEffect, useState } from "react";
import UserNav from "../../components/navbar/UserNav";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import Footer from "../../components/footer/Footer";

const ProductHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  const userDetails = userInfo.user || userInfo
  const userName = userDetails?.userName || userDetails?.name

  useEffect(() => {
    const fetchHistory = async () => {
      
      if (!userInfo) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const userDetails = userInfo?.user || userInfo;
        const userId = userDetails?.id || userDetails?._id;

        if (!userId) {
          setError("Session invalid. Please login again.");
          setLoading(false);
          return;
        }

        const res = await API.get(`/orders/userid/${userId}`);
        const allOrders = res.data;

        allOrders.forEach(order => {
          if (order.status === "PENDING" || order.status === "placed") {
            const key = `otp_${order._id}`;
            if (!localStorage.getItem(key)) {
              const code = Math.floor(1000 + Math.random() * 9000).toString();
              localStorage.setItem(key, code);
            }
          }
        });

        setOrders(allOrders);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to synchronize distribution history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this equipment distribution?")) return;

    try {
      
      await API.put(`/orders/${orderId}/status`, { status: "CANCELLED" });

      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: "CANCELLED" } : o));
      alert("Distribution cancelled successfully.");
    } catch (err) {
      alert("Failed to void distribution.");
    }
  };

  const getStatusBadge = (status) => {
    const s = status.toUpperCase();
    if (s === "DELIVERED" || s === "SUCCESS") return <span className="status-badge status-completed">SUCCESS</span>;
    if (s === "CANCELLED") return <span className="status-badge status-cancelled">CANCELLED</span>;
    return <span className="status-badge status-pending">PENDING</span>;
  };

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container">
        <h2 className="section-title">My Equipment Distributions</h2>

        {error && <div className="alert alert-danger" style={{ marginBottom: "2rem" }}> {error}</div>}

        {orders.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "600px", margin: "3rem auto", textAlign: "center", padding: "3rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>No distribution history found.</h3>
            <p style={{ opacity: 0.8 }}>Ready for site procurement? Visit our equipment catalog today.</p>
          </div>
        ) : (
          <div className="card-grid fade-in">
            {orders.map((order) => (
              <div key={order._id} className="card" style={{
                borderTop: order.status.toUpperCase() === "CANCELLED" ? "6px solid var(--danger)" :
                  (order.status.toUpperCase() === "DELIVERED" ? "6px solid var(--accent)" : "6px solid var(--warning)")
              }}>
                <div className="card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                    <div>
                      <h4 style={{ margin: 0, color: "var(--primary)" }}>Batch #{order._id.slice(-6).toUpperCase()}</h4>
                      <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div style={{ background: "var(--bg-color)", padding: "1.25rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
                    {order.products.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                        <span style={{ fontWeight: "600", textDecoration: order.status.toUpperCase() === "CANCELLED" ? "line-through" : "none" }}>
                          {order.status.toUpperCase() === "CANCELLED" ? "🚫 " : "Product"}{item.name}
                        </span>
                        <span style={{ fontWeight: "700" }}>₹ {item.price} x {item.quantity}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: "800" }}>Total Amount</span>
                      <span style={{ fontWeight: "800", color: "var(--primary)", fontSize: "1.1rem" }}>₹ {order.totalAmount}</span>
                    </div>
                  </div>

                  <div style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                    <p style={{ marginBottom: "0.25rem" }}><strong>Target Site:</strong></p>
                    <p style={{ opacity: 0.8 }}>{order.address}</p>
                  </div>

                  {(order.status.toUpperCase() === "PENDING" || order.status.toUpperCase() === "PLACED") && (
                    <div className="fade-in">
                      <div className="verification-card" style={{ marginBottom: "1rem" }}>
                        <p style={{ fontSize: "0.7rem", fontWeight: "800", color: "#0369a1", textTransform: "uppercase" }}>Verification Token</p>
                        <h2 className="otp-display-code" style={{ padding: "0.5rem 0" }}>
                          {localStorage.getItem(`otp_${order._id}`) || "----"}
                        </h2>
                        <p style={{ fontSize: "0.65rem", opacity: 0.7 }}>Present this code upon arrival</p>
                      </div>
                      <button className="btn-cancel" style={{ width: "100%" }} onClick={() => handleCancelOrder(order._id)}>
                        Cancel Assignment
                      </button>
                    </div>
                  )}
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

export default ProductHistory;
