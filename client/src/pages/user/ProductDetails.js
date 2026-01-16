import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/UserFooter";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (!product) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ fontWeight: "600", color: "var(--primary)", marginTop: "1rem" }}>Fetching equipment details...</p>
    </div>
  );

  const imageUrl = product.image
    ? `https://ac-klmv.onrender.com/uploads/${product.image}`
    : "https://via.placeholder.com/600x400?text=AC+Unit";

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container" style={{ maxWidth: "1100px", marginTop: "3rem" }}>

        <div className="card fade-in" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "3rem",
          padding: "3rem",
          background: "var(--white)",
          boxShadow: "var(--shadow-lg)",
          borderRadius: "24px",
          border: "none"
        }}>
        
          <div style={{ position: "relative" }}>
            <div className="card-img" style={{
              height: "100%",
              minHeight: "450px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)"
            }}>
              <img
                src={imageUrl}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Premium+AC+Unit"; }}
              />
            </div>
            <div className="status-badge status-completed" style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              boxShadow: "var(--shadow-md)"
            }}>
              AVAILABLE NOW
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ color: "var(--secondary)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Corporate Series
            </span>
            <h2 className="section-title" style={{ textAlign: "left", fontSize: "3rem", marginBottom: "1.5rem", lineHeight: "1.2" }}>
              {product.name}
            </h2>

            <p style={{
              fontSize: "1.125rem",
              lineHeight: "1.8",
              color: "var(--text-light)",
              marginBottom: "2.5rem",
              borderLeft: "4px solid var(--border)",
              paddingLeft: "1.5rem"
            }}>
              {product.description || "Our premium industrial-grade cooling solutions are engineered for maximum efficiency and durability. Designed to deliver consistent, high-performance climate control even in extreme conditions."}
            </p>

            <div style={{ marginBottom: "3rem" }}>
              <span style={{ fontSize: "1rem", color: "var(--text-light)", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>Professional Price</span>
              <h3 className="card-price" style={{ fontSize: "3.5rem", color: "var(--primary)" }}>₹ {product.price}</h3>
            </div>

            <div style={{ display: "flex", gap: "1.5rem" }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1.5, padding: "1.25rem", fontSize: "1.1rem" }}
                onClick={addToCart}
              >
                Add to Inventory
              </button>
              <button
                className="btn btn-outline"
                style={{ flex: 1, padding: "1.25rem", fontSize: "1.1rem" }}
                onClick={() => { addToCart(); navigate("/cart"); }}
              >
                Buy Now
              </button>
            </div>

            <p style={{ marginTop: "2rem", color: "var(--text-light)", fontSize: "0.875rem", textAlign: "center" }}>
              Secure corporate transaction & verified quality assurance.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetails;
