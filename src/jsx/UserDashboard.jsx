import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Dashboard.css';
import '../css/lrfLayout.css';
import { useEffect } from "react";
import axios from "axios";

function UserDashboard() {
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

  const handleForum = () => {
    navigate('/forum');
  };

  const handleViewAllAlerts = () => {
    navigate('/view/all/alerts');
  };
  const handleContactAuthorities = () => {
    navigate('/contact-authorities');
  };

  return (
    <div className="amber-alert-page">
      {/* Header */}
      <Header />

      <main className="main-content">

        <div className="sidebar-buttons">
          <button className="sidebar-btn red" onClick={handleViewAllAlerts}><span className="btn-text">View all Alerts</span></button>
          <button className="sidebar-btn red" onClick={handleForum}><span className="btn-text">Forum</span></button>
          <button className="sidebar-btn red" onClick={handleContactAuthorities}><span className="btn-text">Contact Authorities</span></button>
          <button className="sidebar-btn red"><span className="btn-text">Helpful Resources</span></button>
          <button className="sidebar-btn red"><span className="btn-text">About Us</span></button>
        </div>

        <div className="content-area">
          <div className="content-center">
            <h2 className="welcome-title">Welcome to Amber Alert</h2>

            <div className="info-grid">
              <div className="info-card">
                <h3 className="card-title">Alerts</h3>
                <p className="card-text">Stay updated with the latest alerts.</p>
              </div>
              <div className="info-card">
                <h3 className="card-title">Report Information</h3>
                <p className="card-text">Submit tips and information to help with ongoing cases.</p>
              </div>
              <div className="info-card">
                <h3 className="card-title">Resources</h3>
                <p className="card-text">Access helpful resources and safety information.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default UserDashboard;
