import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../components/navbar/AdminNav";
import AdminFooter from "../../components/footer/AdminFooter"

const ServiceManagement = () => {
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:5000/api/services";
  const IMAGE_BASE_URL = "http://localhost:5000/uploads";

  const fetchServices = async () => {
    try {
      const res = await axios.get(API);
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Added Service")
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingId) {
        
        await axios.put(`${API}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        
        if (!imageFile) {
          alert("Please select a service image");
          return;
        }
        await axios.post(`${API}/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        name: "",
        description: "",
        price: "",
      });
      setImageFile(null);
      setImagePreview("");
      if (document.getElementById("serviceImageInput")) {
        document.getElementById("serviceImageInput").value = "";
      }

      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving service");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      description: service.description,
      price: service.price,
    });
    setImagePreview(`${IMAGE_BASE_URL}/${service.image}`);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="page-wrapper">
      <AdminNav />
      <div className="container">
        <h2 className="section-title">Maintenance Service Catalog</h2>

        <div className="form-container" style={{ maxWidth: "800px", margin: "0 auto 4rem auto" }}>
          <form onSubmit={handleSubmit} className="fade-in">
            <h3 className="card-title" style={{ marginBottom: "2rem" }}>{editingId ? "Update Service Profile" : "Add New Service Offering"}</h3>

            <div className="input-group">
              <label className="input-label">Service Title</label>
              <input
                name="name"
                placeholder="e.g. Premium Hub Cleaning"
                value={form.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Detailed Description</label>
              <textarea
                name="description"
                placeholder="Describe the technical scope and benefits..."
                value={form.description}
                onChange={handleChange}
                className="input-field"
                style={{ minHeight: "120px", padding: "1rem" }}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Base Rate (₹)</label>
              <input
                name="price"
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Visual Representation</label>
              <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                <input
                  id="serviceImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="input-field"
                  style={{ padding: "0.5rem" }}
                />

                {imagePreview && (
                  <div className="card-img" style={{ width: "120px", height: "120px", borderRadius: "8px", flexShrink: 0 }}>
                    <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {editingId ? "Save Changes" : "Create Service Item"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: "", description: "", price: "" });
                    setImagePreview("");
                    setImageFile(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <h3 className="section-title" style={{ fontSize: "1.75rem", textAlign: "left" }}>Operational Catalog</h3>

        {services.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "400px" }}>No active services found in database.</div>
        ) : (
          <div className="card-grid">
            {services.map((s) => (
              <div key={s._id} className="card fade-in">
                <div className="card-img" style={{ height: "180px" }}>
                  <img
                    src={`${IMAGE_BASE_URL}/${s.image}`}
                    alt={s.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="card-content">
                  <h4 className="card-title" style={{ minHeight: "3rem" }}>{s.name}</h4>
                  <p className="card-desc" style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>{s.description}</p>
                  <p className="card-price">₹ {s.price}</p>

                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
                    <button className="btn btn-outline" style={{ flex: 1, padding: "0.5rem" }} onClick={() => handleEdit(s)}>Edit</button>
                    <button className="btn btn-danger" style={{ flex: 1, padding: "0.5rem" }} onClick={() => handleDelete(s._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AdminFooter/>
    </div>
  );
};

export default ServiceManagement;
