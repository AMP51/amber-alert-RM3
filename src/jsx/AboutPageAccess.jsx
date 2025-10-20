import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AboutPage.css';

function AboutPageAccess() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      <div className="about-container">
        <h1 className="about-title">About the Amber Alert System</h1>
        <p className="about-subtitle">
          Helping communities stay informed and safe by providing real-time alerts for missing persons.
        </p>

        <div className="info-grid">
          <div className="info-card">
            <h3>Our Mission</h3>
            <p>
              The Amber Alert System is designed to assist in locating missing or abducted individuals quickly.
              Our goal is to empower communities with real-time alerts, safety info, and collaborative reporting.
            </p>
          </div>

          <div className="info-card">
            <h3>How It Works</h3>
            <p>
              Alerts notify nearby users immediately. Users can share tips, verify sightings, or communicate
              directly with authorities to accelerate the search.
            </p>
          </div>

          <div className="info-card">
            <h3>Our Vision</h3>
            <p>
              We envision a safer, more connected community where technology bridges the gap between citizens
              and emergency responders. Every alert and report counts.
            </p>
          </div>

          <div className="info-card">
            <h3>Meet the Team</h3>
            <p>
              Built by developers, students, and safety advocates who believe in community-driven response
              and innovation.
            </p>
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate('/')}>
          Back
        </button>
      </div>

    </div>
  );
}

export default AboutPageAccess;
