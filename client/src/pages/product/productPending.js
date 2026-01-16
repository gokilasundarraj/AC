import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductDeliverymanNav from "../../components/navbar/productDeliverymanNav";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import ProFooter from "../../components/footer/ProFooter"

const ProductPending = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingOrderId, setVerifyingOrderId] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        const pending = res.data.filter(o => o.status === "PENDING" || o.status === "placed");
        setOrders(pending);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleVerify = async (orderId) => {
    const systemOtp = localStorage.getItem(`otp_${orderId}`);

    console.log('=== OTP Verification Debug ===');
    console.log('Order ID:', orderId);
    console.log('Entered OTP:', enteredOtp);
    console.log('System OTP:', systemOtp);
    console.log('Match:', enteredOtp === systemOtp);
    console.log('Entered OTP type:', typeof enteredOtp);
    console.log('System OTP type:', typeof systemOtp);

    if (enteredOtp === systemOtp) {
      try {
        await API.put(`/orders/${orderId}/status`, { status: "DELIVERED" });

        setError("");
        alert("Verification Successful! Database updated to DELIVERED");

        setOrders(prev => prev.filter(o => o._id !== orderId));

        setVerifyingOrderId(null);
        setEnteredOtp("");
      } catch (err) {
        console.error("DB Update Error:", err);
        alert("OTP correct, but failed to sync with Database.");
      }
    } else {
      setError("Invalid OTP. Verification failed.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <ProductDeliverymanNav />
      <div className="container">
        <h2 className="section-title">Logistics Queue</h2>
        <p style={{ color: "var(--text-light)", marginBottom: "2rem", marginTop: "-1.5rem" }}>
          Pending distributions requiring proximity verification.
        </p>

        {orders.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>No active assignments.</h3>
            <p>Ready for next procurement cycle.</p>
          </div>
        ) : (
          <div className="card-grid">
            {orders.map((order) => (
              <div key={order._id} className="card fade-in" style={{ borderLeft: "6px solid var(--warning)" }}>
                <div className="card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                    <div>
                      <h3 className="card-title">Batch #{order._id.slice(-6).toUpperCase()}</h3>
                      <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="status-badge status-pending">PENDING</span>
                  </div>

                  <div style={{ background: "var(--bg-color)", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem" }}>
                    <p style={{ fontWeight: "700", color: "var(--primary)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Recipient Details</p>
                    <p style={{ fontSize: "1rem", fontWeight: "600" }}>{order.userName}</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Phone no: {order.userPhone}</p>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ fontWeight: "700", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Delivery Address</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.9, background: "#fffbe6", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ffe58f" }}>
                      {order.address}
                    </p>
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    {verifyingOrderId === order._id ? (
                      <div className="otp-cluster fade-in">
                        <p style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--secondary)", marginBottom: "1rem" }}>Collect OTP from Customer</p>
                        <div className="otp-input-wrapper">
                          <input
                            className="otp-digit"
                            type="text"
                            maxLength="4"
                            autoFocus
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            placeholder="----"
                          />
                          <button className="btn btn-primary" onClick={() => handleVerify(order._id)}>OK</button>
                        </div>
                        {error && <p style={{ color: "var(--danger)", fontSize: "0.8rem", marginBottom: "1rem", fontWeight: "600" }}>{error}</p>}
                        <button className="btn-link" style={{ fontSize: "0.8rem", color: "var(--danger)", background: "none", border: "none", cursor: "pointer" }} onClick={() => { setVerifyingOrderId(null); setError(""); }}>Cancel</button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary"
                        style={{ width: "100%", padding: "1rem", borderRadius: "10px" }}
                        onClick={() => setVerifyingOrderId(order._id)}
                      >
                        Confirm Delivery
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ProFooter/>
    </div>
  );
};

export default ProductPending;
