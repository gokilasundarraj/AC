import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar admin-nav">
        <Link to="/admin/home" className="nav-logo">
          <img src={logo} alt="Cooling Masters" style={{ height: "40px", marginRight: "10px" }} />
          COOLING MASTERS
        </Link>
        
        <button className="btn btn-outline" style={{ padding: "0.5rem 1rem",color:"white" }} onClick={() => setOpen(true)}>
          Menu ☰
        </button>
      </nav>

      <div className={`sidebar ${open ? "open" : ""}`}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/admin/home" className="btn btn-outline" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/product-management" className="btn btn-outline" onClick={() => setOpen(false)}>Product Management</Link>
          <Link to="/service-management" className="btn btn-outline" onClick={() => setOpen(false)}>Service Management</Link>
          <Link to="/admin/product-history" className="btn btn-outline" onClick={() => setOpen(false)}>Product History</Link>
          <Link to="/admin/service-history" className="btn btn-outline" onClick={() => setOpen(false)}>Service History</Link>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
      {open && <div className="menu-overlay show" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default AdminNav;
