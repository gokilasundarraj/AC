import { useEffect, useState } from "react";
import ProductDeliverymanNav from "../../components/navbar/productDeliverymanNav";
import API from "../../api/axios";
import ProFooter from "../../components/footer/ProFooter"

const ProductDeliverymanHome = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/orders");
        const orders = res.data;

        const pending = orders.filter(
          (o) => o.status === "PENDING" || o.status === "DISPATCHED"
        ).length;

        const completed = orders.filter(
          (o) => o.status === "DELIVERED" || o.status === "COMPLETED"
        ).length;

        setPendingCount(pending);
        setCompletedCount(completed);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setError("Failed to sync with real-time data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper">
        <ProductDeliverymanNav />
        <div className="container" style={{ textAlign: "center", padding: "5rem" }}>
          <div className="loader" style={{ margin: "0 auto 1rem" }}></div>
          <h3 style={{ opacity: 0.6 }}>Fetching delivery statistics...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <ProductDeliverymanNav />
      <div className="container">
        <h2 className="section-title">Delivery Dashboard</h2>

        {error && <div className="alert alert-danger" style={{ marginBottom: "2rem" }}>⚠️ {error}</div>}

        <div className="card-grid fade-in">
        
          <div className="card" style={{ borderTop: "6px solid var(--warning)" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <h3 className="card-title">Pending Orders</h3>
              <p className="card-price" style={{ color: "var(--warning)" }}>{pendingCount}</p>
              <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>Consignments awaiting pickup or dispatch.</p>
            </div>
          </div>

          <div className="card" style={{ borderTop: "6px solid var(--accent)" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <h3 className="card-title">Completed Orders</h3>
              <p className="card-price" style={{ color: "var(--accent)" }}>{completedCount}</p>
              <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>Successfully delivered product orders.</p>
            </div>
          </div>
        </div>
      </div>
      <ProFooter/>
    </div>
  );
};

export default ProductDeliverymanHome;
