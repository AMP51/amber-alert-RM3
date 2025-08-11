import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Dashboard.css';
import '../css/lrfLayout.css';

function UserDashboard() {
  const navigate = useNavigate();

  const handleCreateAlert = () => {
    navigate('/create-an-alert');
  };

  const handleReportingTip = () => {
    navigate('/reporting-tip');
  };


  return (
    <div className="amber-alert-page">
      {/* Header */}
      <Header />

      <nav className="navigation">
        <div className="nav-links">
          <Link to="/user-dashboard" className="nav-link">Home</Link>
          <Link to="/reporting-tip" className="nav-link">Report</Link>
          <Link to="/forum" className="nav-link">Forums</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
      </nav>

      <main className="main-content">

        <div className="sidebar-buttons">
          <button className="sidebar-btn red"><span className="btn-text">Contact Authorities</span></button>
          <button className="sidebar-btn red" onClick={handleCreateAlert}><span className="btn-text"> Create an alert</span></button>
          <button className="sidebar-btn red"><span className="btn-text bold small">View all Alerts</span></button>
          <button className="sidebar-btn red" onClick={handleReportingTip}><span className="btn-text bold">Report Tip</span></button>
          <button className="sidebar-btn red"><span className="btn-text small">View all reports</span></button>
          <button className="sidebar-btn red"><span className="btn-text">Helpful Resources</span></button>
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
