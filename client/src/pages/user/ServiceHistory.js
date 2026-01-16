import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/UserFooter";

const ServiceHistory = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  const userDetails = userInfo?.user || userInfo;
  const userId = userDetails?.id || userDetails?._id;

  const fetchServiceHistory = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://ac-klmv.onrender.com/api/services/admin-history"
      );

      const userServices = res.data.filter(
        (s) => s.user?._id === userId || s.user === userId
      );

      userServices.forEach((service) => {
        const status = service.status?.toUpperCase();

        if (status === "PENDING" || status === "ASSIGNED" || status === "IN_PROGRESS") {
          const otpKey = `service_otp_${service._id}`;
          const existingOtp = localStorage.getItem(otpKey);

          if (!existingOtp) {
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            localStorage.setItem(otpKey, otp);
          }
        }
      });

      setServices(userServices);
    } catch (err) {
      console.error("Error fetching service history:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);


  useEffect(() => {
    fetchServiceHistory();
  }, [fetchServiceHistory]);

  const pendingServices = services.filter(
    (s) =>
      ["PENDING", "ASSIGNED", "IN_PROGRESS"].includes(
        s.status?.toUpperCase()
      )
  );

  const completedServices = services.filter(
    (s) =>
      ["COMPLETED", "SUCCESS"].includes(s.status?.toUpperCase())
  );

  const cancelledServices = services.filter(
    (s) => s.status?.toUpperCase() === "CANCELLED"
  );

  if (loading) {
    return (
      <div className="page-wrapper">
        <UserNav />
        <div className="container" style={{ textAlign: "center", padding: "5rem" }}>
          <div className="loader" style={{ margin: "0 auto 1rem" }}></div>
          <p style={{ opacity: 0.6 }}>Loading your service history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container">
        <h2 className="section-title text-gradient">My Service History</h2>

        {pendingServices.length > 0 && (
          <>
            <h3 className="card-title" style={{ marginTop: "2rem" }}>
              Active Requests
            </h3>

            <div className="card-grid fade-in">
              {pendingServices.map((service) => (
                <div
                  key={service._id}
                  className="card"
                  style={{ borderTop: "6px solid var(--warning)" }}
                >
                  <div className="card-content">
                    <h4>ID: {service._id.slice(-6).toUpperCase()}</h4>
                    <p><strong>Location:</strong> {service.address}</p>
                    <p>
                      <strong>Requested:</strong>{" "}
                      {new Date(service.createdAt).toLocaleString()}
                    </p>

                    <div className="otp-display">
                      OTP:{" "}
                      {localStorage.getItem(`service_otp_${service._id}`) || "----"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {completedServices.length > 0 && (
          <>
            <h3 className="card-title" style={{ marginTop: "3rem" }}>
              Completed Services
            </h3>

            <div className="card-grid fade-in">
              {completedServices.map((service) => (
                <div
                  key={service._id}
                  className="card"
                  style={{ borderTop: "6px solid var(--accent)" }}
                >
                  <div className="card-content">
                    <h4>ID: {service._id.slice(-6).toUpperCase()}</h4>
                    <p><strong>Location:</strong> {service.address}</p>
                    <p>
                      <strong>Completed:</strong>{" "}
                      {new Date(service.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {cancelledServices.length > 0 && (
          <>
            <h3
              className="card-title"
              style={{ marginTop: "3rem", color: "var(--danger)" }}
            >
              Cancelled Requests
            </h3>

            <div className="card-grid fade-in">
              {cancelledServices.map((service) => (
                <div
                  key={service._id}
                  className="card"
                  style={{ borderTop: "6px solid var(--danger)", opacity: 0.7 }}
                >
                  <div className="card-content">
                    <h4>ID: {service._id.slice(-6).toUpperCase()}</h4>
                    <p><strong>Location:</strong> {service.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {services.length === 0 && (
          <div className="alert alert-danger" style={{ margin: "3rem auto" }}>
            No service history found.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ServiceHistory;
