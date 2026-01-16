import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/Footer";


const ProductList = () => {
  const [products, setProducts] = useState([]);

  const IMAGE_BASE_URL = "https://ac-klmv.onrender.com/uploads";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://ac-klmv.onrender.com/api/products"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container">
        <h2 className="section-title">Premium Products</h2>

        {products.length === 0 && (
          <div className="alert alert-danger" style={{ maxWidth: "400px" }}>
            Currently no products available in our inventory.
          </div>
        )}

        <div className="card-grid">
          {products.map((product) => (
            <div key={product._id} className="card">
              <img
                src={`${IMAGE_BASE_URL}/${product.image}`}
                alt={product.name}
                className="card-img"
              />

              <div className="card-content">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-desc">{product.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span className="card-price">₹ {product.price}</span>
                  <span className="status-badge status-completed">In Stock</span>
                </div>

                <button className="btn btn-primary" style={{ width: "100%", marginTop: "1.5rem" }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductList;
