import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const MainNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Cooling Masters" style={{ height: "40px", marginRight: "10px" }} />
          COOLING MASTERS
        </Link>
        <button className="btn btn-outline" style={{ padding: "0.5rem 1rem" }} onClick={() => setOpen(true)}>
          Menu ☰
        </button>
      </nav>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/user/signup" className="btn btn-outline" onClick={() => setOpen(false)}>User Signup</Link>
          <Link to="/admin/login" className="btn btn-outline" onClick={() => setOpen(false)}>Admin Login</Link>
          <Link to="/product-delivery/login" className="btn btn-outline" onClick={() => setOpen(false)}>Delivery Login</Link>
          <Link to="/service-technician/login" className="btn btn-outline" onClick={() => setOpen(false)}>Technician Login</Link>
        </div>
      </div>
      {open && <div className="menu-overlay show" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default MainNav;
