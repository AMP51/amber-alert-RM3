// Muhammad Siddeeq Rabin
// 221084096

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/ContactAuthorities.css';
import logo from '../assets/logo.jpg';
import axios from 'axios';

function ContactAuthorities() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    location: "",
    description: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/contact", formData, {
        withCredentials: true,
      });
      alert("Report submitted successfully!");
      navigate("/thank-you");
    } catch (err) {
      console.error("Failed to submit report", err);
      alert("Failed to submit report. Try again.");
    }
  };

  // ✅ Authentication check
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

  return (
    <div className="contact-page">
      <Header />

      <div className="contact-container">
        <div className="contact-form">
          <img src={logo} alt="Logo" className="contact-logo" />
          <h1 className="contact-title">Contact The Authorities</h1>
          <p className="contact-subtitle">
            If you're in immediate danger or need urgent help, contact emergency services.
          </p>

          <div className="emergency-box">
            <p><strong>FOR EMERGENCIES CALL:</strong></p>
            <p className="emergency-number">021 480 7700</p>
            <p>or dial <strong>107 from a landline</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="input-field">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="input-control"
                required
              />
            </div>

            <div className="input-field">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-control"
                required
              />
            </div>

            <div className="input-field">
              <label className="input-label">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="input-control"
                required
              />
            </div>

            <div className="input-field">
              <label className="input-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-control"
                required
              />
            </div>

            <div className="input-field">
              <label className="input-label">Incident Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-control"
                rows="4"
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-button">
              <span className="button-text">Submit Report</span>
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactAuthorities;