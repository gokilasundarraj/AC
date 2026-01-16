import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/navbar/AdminNav";
import AdminFooter from "../../components/footer/AdminFooter";
import API from "../../api/axios";

const AdminHome = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProfit: 0,
    totalUsers: 0,
    totalSales: 0,
    totalServices: 0,
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const userRes = await API.get("/auth/users");
        const allUsers = userRes.data;

        const orderRes = await API.get("/orders");
        const allOrders = orderRes.data;

        const serviceRes = await API.get("/services/admin-history");
        const allServices = serviceRes.data;

        const deliveredOrders = allOrders.filter(
          (o) => o.status === "DELIVERED"
        );

        const orderProfit = deliveredOrders.reduce(
          (sum, o) => sum + (o.totalAmount || 0),
          0
        );

        const completedServices = allServices.filter(
          (s) => s.status === "COMPLETED"
        );

        const serviceProfit = completedServices.reduce(
          (sum, s) => sum + (s.totalPrice || 0),
          0
        );

        setStats({
          totalProfit: orderProfit + serviceProfit,
          totalUsers: allUsers.length,
          totalSales: deliveredOrders.length,
          totalServices: completedServices.length,
        });

        setUsers(allUsers);
      } catch (err) {
        console.error("Admin Dashboard Error:", err);
        setError("Failed to load admin dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper">
        <AdminNav />
        <div className="loading-text">
          <h3>Loading Admin Dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper fade-in">
      <AdminNav />

      <div className="container">
        <h2 className="section-title">Admin Dashboard</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="card-grid">
          <div className="card">
            <div className="card-content">
              <h3 className="card-title">Total Profit</h3>
              <p className="card-price">₹ {stats.totalProfit}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3 className="card-title">Total Users</h3>
              <p className="card-price">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <h3 className="card-title">Product Sales</h3>
              <p className="card-price">{stats.totalSales}</p>
            </div>
          </div>

        </div>

        <div className="table-container">
          <h3 style={{ padding: "1.5rem" }}>User Management</h3>

          {users.length === 0 ? (
            <p style={{ padding: "1.5rem" }}>No users found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const displayName =
                    u.userName || u.customerName || u.name;

                  return (
                    <tr
                      key={u._id}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/admin/user/${displayName}`)
                      }
                    >
                      <td>{displayName}</td>
                      <td>{u.email}</td>
                      <td>{u.role || "USER"}</td>
                      <td>
                        {u.createdAt
                          ? new Date(u.createdAt)
                              .toISOString()
                              .split("T")[0]
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AdminFooter />
    </div>
  );
};

export default AdminHome;
