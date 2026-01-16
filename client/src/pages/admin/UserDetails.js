import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import AdminNav from "../../components/navbar/AdminNav";

const UserDetails = () => {
  const { name } = useParams();

  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const orderRes = await API.get(`/orders/username/${name}`);
        setOrders(orderRes.data);

        const serviceRes = await API.get(`/services/username/${name}`);
        setServices(serviceRes.data);
      } catch (err) {
        console.error("UserDetails error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="page-wrapper">
      <AdminNav />

      <div className="container">
        <h2 className="page-title">
          User Details : <span>{name}</span>
        </h2>

        <h3 className="section-title">Product Orders</h3>

        {orders.length === 0 ? (
          <p className="empty">No product orders</p>
        ) : (
          orders.map((o) => (
            <div className="order-card" key={o._id}>
              <div className="order-header">
                <span className="amount"></span>
                <span className={`status ${o.status?.toLowerCase()}`}>
                  {o.status}
                </span>
              </div>

              <div className="order-meta">
                <p>{new Date(o.createdAt).toLocaleString()}</p>
                <p>{o.userPhone}</p>
                <p>{o.address}</p>
              </div>

              <div className="item-list">
                {o.products?.map((p, idx) => (
                  <div className="item" key={idx}>
                    <div className="item-info">
                      <h4>{p.name}</h4>
                      <p>Qty: {p.quantity}</p>
                      <p>Price: ₹ {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <h3 className="section-title">Service Orders</h3>

        {services.length === 0 ? (
          <p className="empty">No service orders</p>
        ) : (
          services.map((s) => (
            <div className="order-card" key={s._id}>
              <div className="order-header">
                <span className="amount"></span>
                <span className={`status ${s.status?.toLowerCase()}`}>
                  {s.status}
                </span>
              </div>

              <div className="order-meta">
                <p>{new Date(s.createdAt).toLocaleString()}</p>
                <p>{s.customerPhone}</p>
                <p>{s.address}</p>
              </div>

              <div className="item-list">
                {s.services?.map((srv, idx) => (
                  <div className="item" key={idx}>
                    <div className="item-info">
                      <h4>{srv.name}</h4>
                      <p>Price: ₹ {srv.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDetails;
