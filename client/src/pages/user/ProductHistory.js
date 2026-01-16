import React, { useEffect, useState } from "react";
import UserNav from "../../components/navbar/UserNav";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import Footer from "../../components/footer/UserFooter";

const ProductHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfoRaw = localStorage.getItem("userInfo");
  const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
  const userDetails = userInfo?.user || userInfo;
  const userId = userDetails?._id || userDetails?.id;

  useEffect(() => {
    let isMounted = true; 

    const fetchHistory = async () => {
      if (!userId) {
        if (isMounted) {
          setError("Session expired. Please login again.");
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/orders/userid/${userId}`);
        const allOrders = res.data || [];

        allOrders.forEach(order => {
          const status = order.status?.toUpperCase();
          if (status === "PENDING" || status === "PLACED") {
            const key = `otp_${order._id}`;
            if (!localStorage.getItem(key)) {
              const code = Math.floor(1000 + Math.random() * 9000).toString();
              localStorage.setItem(key, code);
            }
          }
        });

        if (isMounted) {
          setOrders(allOrders);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        if (isMounted) {
          setError("Unable to load order history. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleCancelOrder = async (orderId) => {
    const ok = window.confirm("Are you sure you want to cancel this order?");
    if (!ok) return;

    try {
      await API.put(`/orders/${orderId}/status`, { status: "CANCELLED" });

      setOrders(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, status: "CANCELLED" } : o
        )
      );

      alert("Order cancelled successfully");
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  const getStatusBadge = (status = "") => {
    const s = status.toUpperCase();
    if (s === "DELIVERED" || s === "SUCCESS")
      return <span className="status-badge status-completed">SUCCESS</span>;
    if (s === "CANCELLED")
      return <span className="status-badge status-cancelled">CANCELLED</span>;
    return <span className="status-badge status-pending">PENDING</span>;
  };

  if (loading) {
    return (
      <>
        <UserNav />
        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <Loader />
          <p style={{ opacity: 0.6 }}>Loading your orders…</p>
        </div>
      </>
    );
  }

  return (
    <div className="page-wrapper">
      <UserNav />

      <div className="container">
        <h2 className="section-title">My Orders</h2>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: "2rem" }}>
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div
            className="alert alert-danger"
            style={{
              maxWidth: "600px",
              margin: "3rem auto",
              textAlign: "center",
              padding: "3rem"
            }}
          >
            <h3>No orders found</h3>
            <p>Please place your first order.</p>
          </div>
        ) : (
          <div className="card-grid">
            {orders.map(order => {
              const status = order.status?.toUpperCase();

              return (
                <div
                  key={order._id}
                  className="card"
                  style={{
                    borderTop:
                      status === "CANCELLED"
                        ? "6px solid var(--danger)"
                        : status === "DELIVERED"
                        ? "6px solid var(--accent)"
                        : "6px solid var(--warning)"
                  }}
                >
                  <div className="card-content">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem"
                      }}
                    >
                      <div>
                        <h4>Order #{order._id.slice(-6).toUpperCase()}</h4>
                        <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                          {new Date(order.createdAt).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div
                      style={{
                        background: "var(--bg-color)",
                        padding: "1rem",
                        borderRadius: "10px"
                      }}
                    >
                      {order.products?.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "0.4rem"
                          }}
                        >
                          <span>{item.name}</span>
                          <span>
                            ₹ {item.price} × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {(status === "PENDING" || status === "PLACED") && (
                      <>
                        <h2 className="otp-display-code">
                          {localStorage.getItem(`otp_${order._id}`)}
                        </h2>

                        <button
                          className="btn-cancel"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductHistory;
