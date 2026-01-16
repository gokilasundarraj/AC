import { useEffect, useState } from "react";
import axios from "axios";
import ServiceTechnicianNav from "../../components/navbar/ServiceTechnicianNav";
import SerFooter from "../../components/footer/SerFooter"

const ServiceTechnicianHome = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://ac-klmv.onrender.com/api/services/admin-history");
      const history = res.data;

      const pending = history.filter(
        (s) => {
          const status = s.status?.toUpperCase();
          return status === "PENDING" || status === "ASSIGNED" || status === "IN_PROGRESS";
        }
      ).length;

      const completed = history.filter(
        (s) => {
          const status = s.status?.toUpperCase();
          return status === "COMPLETED" || status === "SUCCESS";
        }
      ).length;

      setPendingCount(pending);
      setCompletedCount(completed);
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();

    window.addEventListener('focus', fetchCounts);
    return () => window.removeEventListener('focus', fetchCounts);
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper">
        <ServiceTechnicianNav />
        <div className="container" style={{ textAlign: "center", padding: "5rem" }}>
          <div className="loader" style={{ margin: "0 auto 1rem" }}></div>
          <p style={{ opacity: 0.6 }}>Synchronizing technical queue from system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <ServiceTechnicianNav />
      <div className="container">
        <h2 className="section-title text-gradient">Technical Service Dashboard</h2>

        <div className="card-grid fade-in">
          
          <div className="card" style={{ borderTop: "6px solid var(--warning)" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <h3 className="card-title">Pending Job Requests</h3>
              <p className="card-price" style={{ color: "var(--warning)" }}>{pendingCount}</p>
              <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>Service tickets awaiting technical assignment or travel.</p>
            </div>
          </div>

          <div className="card" style={{ borderTop: "6px solid var(--accent)" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <h3 className="card-title">Resolved Maintenance</h3>
              <p className="card-price" style={{ color: "var(--accent)" }}>{completedCount}</p>
              <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>Successfully completed HVAC service interventions.</p>
            </div>
          </div>
        </div>
      </div>
      <SerFooter/>
    </div>
  );
};

export default ServiceTechnicianHome;
