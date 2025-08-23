import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../css/admin/AdminDashboard.css';
import { useEffect } from "react";
import axios from "axios";

function AdminDashboardPage() {
  const navigate = useNavigate();

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

  const handleCreateAnAlert = () => {
    navigate('/admin-alert');
  };

  return (
    <div className="admin-dashboard-page">
      <Header />

      <main className="admin-dashboard-content">
        <section className="dashboard-grid">
          <div className="dashboard-box">
            <h3 className="box-title">Active Alerts</h3>
            <p className="box-count">5</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Reported Tips</h3>
            <p className="box-count">12</p>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Alert Management</h2>
            <div className="section-buttons">
              <button className="section-btn" onClick={handleCreateAnAlert}>Create An Alert</button>
              <button className="section-btn">View All Alerts</button>
            </div>
          </div>
          <div className="alert-table">
            <div className="alert-row">
              <div className="alert-cell">101</div>
              <div className="alert-cell">Ashton Petersen</div>
              <div className="alert-cell status-active">🔴 Active</div>
              <div className="alert-cell actions">
                <button className="action-btn">View</button>
                <button className="action-btn">Edit</button>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Reported Tips</h2>
            <div className="tip-buttons">
              <button className="section-btn">View All Tips</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboardPage;
