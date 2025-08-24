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

  return (
    <div className="admin-dashboard-page">
      <Header />

      <main className="admin-dashboard-content">
        {/* Alert Management */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Admin Alert Management</h2>
            <div className="section-buttons">
              <button className="section-btn" onClick={handleCreateAnAlert}>Create An Alert</button>
              <button className="section-btn" onClick={() => navigate(`/admin-view/all/alerts`)}>View All Alerts</button>
              <button className="section-btn" onClick={() => navigate(`/admin/message`)}>Message</button>
            </div>
          </div>
        </section>

        {/* Dashboard Stats */}
        <section className="dashboard-grid">
          <div className="dashboard-box">
            <h3 className="box-title">Active Alerts</h3>
            <p className="box-count">{alerts.filter(a => a.status === "active").length}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Resolved Alerts</h3>
            <p className="box-count">{alerts.filter(a => a.status === "resolved").length}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Reported Tips</h3>
            <p className="box-count"></p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboardPage;
