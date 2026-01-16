import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const ProductDeliverymanNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar pronav">
        <Link to="/product-delivery/home" className="nav-logo">
          <img src={logo} alt="Cooling Masters" style={{ height: "40px", marginRight: "10px" }} />
          COOLING MASTERS
        </Link>
      
        <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", color:"white" }} onClick={() => setOpen(true)}>
          Menu ☰
        </button>
      </nav>

      <div className={`sidebar ${open ? "open" : ""}`}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/product-delivery/home" className="btn btn-outline" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/product-pending" className="btn btn-outline" onClick={() => setOpen(false)}>Pending</Link>
          <Link to="/product-completed" className="btn btn-outline" onClick={() => setOpen(false)}>Completed</Link>
          <button className="btn btn-danger" style={{ marginTop: "2rem" }} onClick={logout}>Logout</button>
        </div>
      </div>
      {open && <div className="menu-overlay show" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default ProductDeliverymanNav;
