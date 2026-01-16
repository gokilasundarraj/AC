import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../components/navbar/UserNav";
import API from "../../api/axios";
import Footer from "../../components/footer/Footer";


const UserHome = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pRes = await API.get("/products");
      const sRes = await API.get("/services");
      setProducts(pRes.data);
      setServices(sRes.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <UserNav />

      <section className="home-hero">
        <div className="hero-content">
          <h1 className="fade-in">Find Your Perfect <br /> <span style={{ color: "var(--accent)" }}>Climate Solution</span></h1>
          <p className="fade-in">Experience peak cooling efficiency with our premium AC units and expert technical services, delivered with corporate excellence.</p>

          <div className="search-wrapper fade-in">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products or pro services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Search Now</button>
            </div>
          </div>

          <div className="hero-stats fade-in">
            <div className="stat-item">
              <h3>5k+</h3>
              <p>Clients</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Certified</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Advanced Cooling Systems</h2>
          <span style={{ color: "var(--text-light)", fontWeight: "600" }}>{filteredProducts.length} Premium Options</span>
        </div>

        <div className="card-grid">
          {filteredProducts.length === 0 ? (
            <div className="alert alert-danger" style={{ gridColumn: "1 / -1" }}>No specialized units found matching your search.</div>
          ) : (
            filteredProducts.map(p => (
              <div className="card fade-in" key={p._id} onClick={() => navigate(`/products/${p._id}`)} style={{ cursor: "pointer" }}>
                <img
                  className="card-img"
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.name}
                />
                <div className="card-content">
                  <h3 className="card-title">{p.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="card-price" style={{ marginBottom: 0 }}>₹ {p.price}</p>
                    <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>Details</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="section-divider"></div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Expert Maintenance</h2>
          <span style={{ color: "var(--text-light)", fontWeight: "600" }}>{filteredServices.length} Pro Services</span>
        </div>

        <div className="card-grid">
          {filteredServices.length === 0 ? (
            <div className="alert alert-danger" style={{ gridColumn: "1 / -1" }}>No matching technical services found.</div>
          ) : (
            filteredServices.map(s => (
              <div className="card fade-in" key={s._id} onClick={() => navigate(`/services/${s._id}`)} style={{ cursor: "pointer" }}>
                <img
                  className="card-img"
                  src={`http://localhost:5000/uploads/${s.image}`}
                  alt={s.name}
                  style={{ height: "180px" }}
                />
                <div className="card-content">
                  <div className="status-badge status-completed" style={{ marginBottom: "1rem" }}>Verified Service</div>
                  <h3 className="card-title">{s.name}</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>{s.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="card-price" style={{ marginBottom: 0 }}>₹ {s.price}</span>
                    <button className="btn btn-primary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.875rem" }}>Book</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserHome;
