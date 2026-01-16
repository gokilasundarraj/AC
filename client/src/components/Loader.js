import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ fontWeight: "600", color: "var(--primary)", marginTop: "1rem" }}>Cooling in progress...</p>
    </div>
  );
};

export default Loader;
