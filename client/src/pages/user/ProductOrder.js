import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../components/navbar/UserNav";
import API from "../../api/axios";
import Footer from "../../components/footer/Footer";


const ProductOrder = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const locateUser = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setError("Could not resolve address. Please enter manually.");
          }
        } catch (err) {
          setError("Failed to fetch address. Please enter manually.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        if (err.code === 1) {
          setError("Location access denied. Please enter address manually.");
        } else {
          setError("Error detecting location. Please enter manually.");
        }
        setLoading(false);
      }
    );
  };

  const confirmOrder = async () => {
    const userDetails = userInfo?.user || userInfo;
    const userId = userDetails?.id || userDetails?._id;
    const userName = userDetails?.name;
    const userPhone = userDetails?.phone || "9023145478";

    if (!userId) {
      alert("Session expired. Please login again.");
      navigate("/user/login");
      return;
    }

    if (!address.trim()) {
      alert("Please provide a delivery address.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        user: userId,
        userName: userName,
        userPhone: userPhone,
        address: address,
        products: cart.map(p => ({
          product: p._id,
          name: p.name,
          price: p.price,
          quantity: p.qty
        })),
        totalAmount: cart.reduce((acc, p) => acc + p.price * p.qty, 0)
      };

      const res = await API.post("/orders", payload);

      if (res.data.success) {
        console.log("Order Created in DB:", res.data.order);
        alert("Order confirmed! Our delivery partner will contact you soon.");
        localStorage.removeItem("cart");
        navigate("/product-history");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce((acc, p) => acc + p.price * p.qty, 0);

  if (cart.length === 0) {
    navigate("/product-history");
    return null;
  }

  return (
    <div className="page-wrapper">
      <UserNav />
      <div className="container" style={{ maxWidth: "850px", marginTop: "2rem" }}>
        <h2 className="section-title">Finalize Your Order</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>

          <div>
            <div className="card fade-in" style={{ height: "100%", border: "none" }}>
              <div className="card-content">
                <h3 className="card-title" style={{ marginBottom: "1.5rem", borderBottom: "2px solid var(--bg-color)", paddingBottom: "1rem" }}>
                  Order Manifest
                </h3>
                <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "0.5rem" }}>
                  {cart.map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <p style={{ fontWeight: "700", marginBottom: "0.25rem" }}>{p.name}</p>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Qty: {p.qty} unit{p.qty > 1 ? "s" : ""}</p>
                      </div>
                      <span style={{ fontWeight: "600", color: "var(--primary)" }}>₹ {p.price * p.qty}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "2rem", borderTop: "2px solid var(--bg-color)", paddingTop: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0 }}>Total Pay</h3>
                    <h2 style={{ margin: 0, color: "var(--primary)", fontSize: "2rem" }}>₹ {totalAmount}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card fade-in" style={{ height: "100%", border: "none" }}>
              <div className="card-content">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 className="card-title" style={{ margin: 0 }}>Delivery Location</h3>
                  <button
                    className="btn btn-outline"
                    style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                    onClick={locateUser}
                    disabled={loading}
                  >
                    {loading ? "Searching..." : "Detect Location"}
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger" style={{ marginBottom: "1.5rem", fontSize: "0.85rem" }}>
                     {error}
                  </div>
                )}

                <div className="input-group">
                  <label className="input-label">Full Address</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: "120px", resize: "none", paddingTop: "0.75rem" }}
                    placeholder="e.g. 123 Cooling Ave, Tech Park, City..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>

                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--bg-color)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-dark)", marginBottom: "0.5rem" }}>💳 <strong>Method:</strong> Cash on Delivery</p>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "2rem", padding: "1.25rem", fontSize: "1.1rem" }}
                  onClick={confirmOrder}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order Now"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductOrder;
