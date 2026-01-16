import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceTechnicianNav from "../../components/navbar/ServiceTechnicianNav";
import SerFooter from "../../components/footer/SerFooter";

const ServiceTechnicianWorkStatus = () => {
  const navigate = useNavigate();

  const technicianInfo = JSON.parse(localStorage.getItem("userInfo"));
  const technicianId = technicianInfo?.user?._id || technicianInfo?._id;

  return (
    <div className="page-wrapper">
      <ServiceTechnicianNav />
      <div className="container">
        <h2 className="section-title">Service Work Status</h2>

        <div className="card-grid" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            className="card"
            onClick={() => navigate("/service-pending")}
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <div className="card-content">
              <h3 className="card-title">Pending Assignments</h3>
              <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
                Check and process ongoing technical requests.
              </p>
              <button className="btn btn-primary" style={{ width: "100%" }}>
                View Pending
              </button>
            </div>
          </div>

          <div
            className="card"
            onClick={() =>
              navigate("/service-completed", {
                state: { technicianId }, // ✅ pass technicianId via route state
              })
            }
            style={{ cursor: "pointer", textAlign: "center" }}
          >
            <div className="card-content">
              <h3 className="card-title">Job History</h3>
              <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
                Review all successfully resolved services.
              </p>
              <button className="btn btn-outline" style={{ width: "100%" }}>
                View Completed
              </button>
            </div>
          </div>
        </div>
      </div>
      <SerFooter />
    </div>
  );
};

export default ServiceTechnicianWorkStatus;
