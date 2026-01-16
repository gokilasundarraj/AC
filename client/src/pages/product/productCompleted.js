import React, { useEffect, useState } from "react";
import ProductDeliverymanNav from "../../components/navbar/productDeliverymanNav";
import API from "../../api/axios";
import Loader from "../../components/Loader";
import ProFooter from "../../components/footer/ProFooter"

const ProductCompleted = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await API.get("/orders");
        
        const delivered = res.data.filter(o => o.status === "DELIVERED" || o.status === "delivered");
        setCompletedOrders(delivered);
      } catch (err) {
        console.error("Fetch history error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompleted();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <ProductDeliverymanNav />
      <div className="container">
        <h2 className="section-title">Logistics Fulfillment Record</h2>
        <p style={{ color: "var(--text-light)", marginBottom: "3rem", marginTop: "-1.5rem" }}>
          Historical record of successfully verified equipment distributions.
        </p>

        {completedOrders.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>No fulfilled assignments.</h3>
            <p>Completed deliveries will appear here after verification.</p>
          </div>
        ) : (
          <div className="card-grid">
            {completedOrders.map((order) => (
              <div key={order._id} className="card fade-in" style={{ borderTop: "6px solid var(--accent)" }}>
                <div className="card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.1rem" }}>Batch #{order._id.slice(-6).toUpperCase()}</h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.25rem" }}>
                        Fulfillment: {new Date(order.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="status-badge status-completed">Delivered</span>
                  </div>

                  <div style={{ background: "var(--bg-color)", padding: "1.25rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
                    <p style={{ fontWeight: "700", color: "var(--primary)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Recipient</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: "600" }}>{order.userName}</p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Phone no: {order.userPhone}</p>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ fontWeight: "700", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Consignment Items</p>
                    {order.products.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                        <span>{item.name}</span>
                        <span style={{ fontWeight: "700" }}>x{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: "0.85rem", color: "var(--text-dark)", padding: "1rem", background: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                    <p style={{ marginBottom: "0.5rem" }}><strong> Delivery Destination:</strong></p>
                    <p style={{ opacity: 0.8, lineHeight: "1.4" }}>{order.address}</p>
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

export default ProductCompleted;
