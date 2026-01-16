import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const ServiceTechnicianNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar delnav">
        <Link to="/service-technician/home" className="nav-logo">
          <img src={logo} alt="Cooling Masters" style={{ height: "40px", marginRight: "10px" }} />
          COOLING MASTERS
        </Link>

        <button className="btn btn-outline" style={{ padding: "0.5rem 1rem", color:"white", border:"2px solid white" }} onClick={() => setOpen(true)}>
          Menu ☰
        </button>
      </nav>

      <div className={`sidebar ${open ? "open" : ""}`}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/service-technician/home" className="btn btn-outline" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/service-work-status" className="btn btn-outline" onClick={() => setOpen(false)}>Work Status</Link>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
      {open && <div className="menu-overlay show" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default ServiceTechnicianNav;
