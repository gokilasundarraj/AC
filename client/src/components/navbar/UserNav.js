import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const UserNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  const isAdmin = (userInfo?.user?.role === "Admin") || (userInfo?.role === "Admin");

  const logout = () => {
    localStorage.removeItem("userInfo");
    alert("Logout Successfully")
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/user/home" className="nav-logo">
          <img src={logo} alt="Cooling Masters" style={{ height: "40px", marginRight: "10px" }} />
          COOLING MASTERS
        </Link>
        <button className="btn btn-outline" style={{ padding: "0.5rem 1rem" }} onClick={() => setOpen(true)}>
          Menu ☰
        </button>
      </nav>

      <div className={`sidebar ${open ? "open" : ""}`}>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/user/home" className="btn btn-outline" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/cart" className="btn btn-outline" onClick={() => setOpen(false)}>Product Cart</Link>
          <Link to="/service-cart" className="btn btn-outline" onClick={() => setOpen(false)}>Service Cart</Link>
          <Link to={isAdmin ? "/admin/product-history" : "/product-history"} className="btn btn-outline" onClick={() => setOpen(false)}>
            Product History {isAdmin && "Audit"}
          </Link>
          <Link to={isAdmin ? "/admin/service-history" : "/service-history"} className="btn btn-outline" onClick={() => setOpen(false)} >
            Service History {isAdmin && "Audit"}
          </Link>

          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
      {open && <div className="menu-overlay show" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default UserNav;
