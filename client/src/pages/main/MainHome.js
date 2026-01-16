import { useNavigate } from "react-router-dom";
import MainNav from "../../components/navbar/MainNav";
import Footer from "../../components/footer/Footer";

const MainHome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <MainNav />

      <section className="home-hero">
        <div className="hero-content">
          <h1 className="fade-in">Cooling Solutions <br /> <span style={{ color: "var(--accent)" }}>For Modern Living</span></h1>
          <p className="fade-in">
            From industrial-grade AC units to professional precision maintenance,
            discover the future of climate control with Cooling Masters.
          </p>
          <div className="fade-in" style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button
              className="btn btn-primary"
              style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}
              onClick={() => navigate("/user/signup")}
            >
              Get Started Today
            </button>
            <button
              className="btn btn-outline"
              style={{ padding: "1rem 2.5rem", fontSize: "1.1rem", border: "2px solid white", color: "white" }}
              onClick={() => navigate("/products")}
            >
              View Catalog
            </button>
          </div>
        </div>
      </section>

      <section className="container">
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Platform Ecosystem</h2>

        <div className="card-grid">
          <div className="card fade-in" onClick={() => navigate("/user/signup")} style={{ cursor: "pointer" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <div className="status-badge status-pending" style={{ marginBottom: "1rem" }}>Customer</div>
              <h3 className="card-title">User Portal</h3>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Browse premium AC inventory and book expert services in seconds.</p>
              <button className="btn btn-outline" style={{ marginTop: "1.5rem", width: "100%" }}>Login / Sign Up</button>
            </div>
          </div>

          <div className="card fade-in" onClick={() => navigate("/admin/login")} style={{ cursor: "pointer" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <div className="status-badge status-completed" style={{ marginBottom: "1rem" }}>Management</div>
              <h3 className="card-title">Administrator</h3>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Comprehensive inventory control and multi-role service dashboard.</p>
              <button className="btn btn-outline" style={{ marginTop: "1.5rem", width: "100%" }}>Admin Dashboard</button>
            </div>
          </div>

          <div className="card fade-in" onClick={() => navigate("/product-delivery/login")} style={{ cursor: "pointer" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <div className="status-badge status-completed" style={{ background: "var(--secondary)", color: "white", marginBottom: "1rem" }}>Logistics</div>
              <h3 className="card-title">Logistics Partner</h3>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Real-time coordination for product distribution and delivery tracking.</p>
              <button className="btn btn-outline" style={{ marginTop: "1.5rem", width: "100%" }}>Delivery Portal</button>
            </div>
          </div>

          <div className="card fade-in" onClick={() => navigate("/service-technician/login")} style={{ cursor: "pointer" }}>
            <div className="card-content" style={{ textAlign: "center" }}>
              <div className="status-badge" style={{ background: "var(--primary)", color: "white", marginBottom: "1rem" }}>Technical</div>
              <h3 className="card-title">Technical Support</h3>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>Manage diagnostic requests and technical update workflows efficiently.</p>
              <button className="btn btn-outline" style={{ marginTop: "1.5rem", width: "100%" }}>Technician Portal</button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>
      <Footer/>
    </div>
  );
};

export default MainHome;
