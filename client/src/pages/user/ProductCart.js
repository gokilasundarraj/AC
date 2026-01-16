import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../components/navbar/UserNav";
import Footer from "../../components/footer/Footer";

const ProductCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateQty = (i, type) => {
    const newCart = [...cart];
    newCart[i].qty += type === "inc" ? 1 : -1;
    if (newCart[i].qty === 0) newCart.splice(i, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (i) => {
    const newCart = cart.filter((_, idx) => idx !== i);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = cart.reduce((acc, p) => acc + (p.price * p.qty), 0);

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container" style={{ maxWidth: "900px" }}>
        <h2 className="section-title">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Your cart is empty</h3>
            <p>Looks like you haven't added any cooling equipment yet.</p>
            <button className="btn btn-primary" style={{ marginTop: "1.5rem" }} onClick={() => navigate("/products")}>Start Shopping</button>
          </div>
        ) : (
          <div className="fade-in">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {cart.map((p, i) => (
                <div key={i} className="card" style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "1rem",
                  gap: "2rem"
                }}>
                  
                  <div style={{
                    flexShrink: 0,
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-sm)"
                  }}>
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/120x120?text=Product"; }}
                    />
                  </div>

                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 className="card-title" style={{ marginBottom: "0.25rem", fontSize: "1.25rem" }}>{p.name}</h3>
                        <p style={{ color: "var(--text-light)", fontSize: "0.875rem" }}>In Stock | Priority Shipping</p>
                      </div>
                      <p className="card-price" style={{ margin: 0, color: "var(--primary)" }}>₹ {p.price}</p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-color)", padding: "0.25rem 0.5rem", borderRadius: "8px" }}>
                        <button className="btn btn-outline" style={{ padding: "0.15rem 0.6rem", border: "none", background: "transparent" }} onClick={() => updateQty(i, "dec")}>-</button>
                        <span style={{ fontWeight: "700", minWidth: "20px", textAlign: "center" }}>{p.qty}</span>
                        <button className="btn btn-outline" style={{ padding: "0.15rem 0.6rem", border: "none", background: "transparent" }} onClick={() => updateQty(i, "inc")}>+</button>
                      </div>

                      <div style={{ display: "flex", gap: "1rem" }}>
                        <button className="btn btn-primary" style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }} onClick={() => navigate("/order")}>Proceed to Buy</button>
                        <button className="btn btn-danger" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }} onClick={() => removeItem(i)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: "3rem", padding: "2rem", background: "var(--primary)", color: "var(--white)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Order Summary</h3>
                  <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Total items: {cart.length}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ opacity: 0.7, marginBottom: "0.25rem" }}>Grand Total</p>
                  <h2 style={{ fontSize: "2.5rem", color: "var(--accent)" }}>₹ {totalPrice}</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default ProductCart;
