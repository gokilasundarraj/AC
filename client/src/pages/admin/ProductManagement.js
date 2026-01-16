import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/navbar/AdminNav";
import AdminFooter from "../../components/footer/AdminFooter"

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:5000/api/products";
  const IMAGE_BASE_URL = "http://localhost:5000/uploads";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
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

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingId) {

        await axios.put(`${API}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
        alert("Product updated successfully!");
        fetchProducts();
      } else {
        if (!form.name || !form.description || !form.price) {
          alert("Please fill in all required fields (Name, Description, and Price)");
          return;
        }

        if (!imageFile) {
          alert("Please select an image");
          return;
        }
        await axios.post(`${API}/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added successfully!");
      }

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
      });
      setImageFile(null);
      setImagePreview("");
      if (document.getElementById("imageInput")) {
        document.getElementById("imageInput").value = "";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setImagePreview(`${IMAGE_BASE_URL}/${product.image}`);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="page-wrapper">
      <AdminNav />
      <div className="container">
        <h2 className="section-title">AC Equipment Management</h2>

        <div className="form-container" style={{ maxWidth: "800px", margin: "0 auto 4rem auto" }}>
          <form onSubmit={handleSubmit} className="fade-in">
            <h3 className="card-title" style={{ marginBottom: "2rem" }}>{editingId ? "Update Equipment Specifications" : "Add New AC Product"}</h3>

            <div className="input-group">
              <label className="input-label">Product Name</label>
              <input
                name="name"
                placeholder="e.g. Arctic Series Ultra"
                value={form.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Technical Description</label>
              <textarea
                name="description"
                placeholder="Specify BTU capacity, energy efficiency, and key features..."
                value={form.description}
                onChange={handleChange}
                required
                className="input-field"
                style={{ minHeight: "120px", padding: "1rem" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="input-group">
                <label className="input-label">Market Price (₹)</label>
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
                <label className="input-label">Current Stock Count</label>
                <input
                  name="stock"
                  type="number"
                  placeholder="e.g. 50"
                  value={form.stock}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Product Imagery</label>
              <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                <input
                  id="imageInput"
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
                {editingId ? "Finalize Updates" : "Add to Warehouse"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: "", description: "", price: "", stock: "" });
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

        <h3 className="section-title" style={{ fontSize: "1.75rem", textAlign: "left" }}>Warehouse Inventory</h3>

        {products.length === 0 ? (
          <div className="alert alert-danger" style={{ maxWidth: "400px" }}>No products registered in system.</div>
        ) : (
          <div className="card-grid">
            {products.map((p) => (
              <div key={p._id} className="card fade-in">
                <div className="card-img" style={{ height: "180px" }}>
                  <img
                    src={`${IMAGE_BASE_URL}/${p.image}`}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <h4 className="card-title" style={{ minHeight: "3rem", fontSize: "1.1rem" }}>{p.name}</h4>
                    <span className={`status-badge ${p.stock > 0 ? "status-completed" : "status-cancelled"}`} style={{ height: "fit-content" }}>
                      {p.stock > 0 ? "Stocked" : "Sold Out"}
                    </span>
                  </div>
                  <p className="card-desc" style={{ marginBottom: "1rem", fontSize: "0.875rem" }}>{p.description}</p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="card-price">₹ {p.price}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>Qty: {p.stock}</p>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
                    <button className="btn btn-outline" style={{ flex: 1, padding: "0.5rem" }} onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn btn-danger" style={{ flex: 1, padding: "0.5rem" }} onClick={() => handleDelete(p._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AdminFooter />
    </div>
  );
};

export default ProductManagement;
