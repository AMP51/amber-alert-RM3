import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../css/admin/AdminDashboard.css';
import axios from 'axios';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  {/* Check if admin is logged in */ }
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8080/me", { withCredentials: true });
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  {/* Fetch alerts */ }
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/alerts", { withCredentials: true });
        setAlerts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    };
    fetchAlerts();
  }, []);

  const handleCreateAnAlert = () => navigate('/admin-alert');

  const getStatusDot = (status) => {
    switch (status) {
      case "active":
        return <span className="status-dot status-active">● Active</span>;
      case "resolved":
        return <span className="status-dot status-resolved">● Resolved</span>;
      case "pending":
        return <span className="status-dot status-pending">● Pending</span>;
      default:
        return status;
    }
  };

  return (
    <div className="admin-dashboard-page">
      <Header />

      <main className="admin-dashboard-content">
        {/* Dashboard Stats */}
        <section className="dashboard-grid">
          <div className="dashboard-box">
            <h3 className="box-title">Active Alerts</h3>
            <p className="box-count">{alerts.filter(a => a.status === "active").length}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Reported Tips</h3>
            <p className="box-count"></p>
          </div>
        </section>

        {/* Alert Management */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Alert Management</h2>
            <div className="section-buttons">
              <button className="section-btn" onClick={handleCreateAnAlert}>Create An Alert</button>
              <button className="section-btn">View All Alerts</button>
            </div>
          </div>

          <div className="alert-table">
            {alerts.length === 0 ? (
              <p>No alerts available.</p>
            ) : (
              alerts.map((alert, index) => (
                <div className="alert-row" key={alert.alertId}>
                  <div className="alert-cell">{index + 1}</div>
                  <div className="alert-cell">{alert.name}</div>
                  <div className="alert-cell">{getStatusDot(alert.status)}</div>
                  <div className="alert-cell actions">
                    <button
                      className="action-btn" onClick={() => navigate(`/view-alert/${alert.alertId}/view`)}>
                      View
                    </button>
                    <button
                      className="action-btn" onClick={() => navigate(`/update-alert/${alert.alertId}/edit`)}>
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboardPage;
