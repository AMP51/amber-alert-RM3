// Muhammad Siddeeq Rabin
// 221084096

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/ContactAuthorities.css';
import logo from '../assets/logo.jpg';

function ContactAuthorities() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Report submitted successfully!');
        navigate('/thank-you'); // redirect after submission
    };

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
                            <input type="text" className="input-control" required />
                        </div>

                        <div className="input-field">
                            <label className="input-label">Email Address</label>
                            <input type="email" className="input-control" required />
                        </div>

                        <div className="input-field">
                            <label className="input-label">Phone Number</label>
                            <input type="tel" className="input-control" required />
                        </div>

                        <div className="input-field">
                            <label className="input-label">Location</label>
                            <input type="text" className="input-control" required />
                        </div>

                        <div className="input-field">
                            <label className="input-label">Incident Description</label>
                            <textarea className="input-control" rows="4" required></textarea>
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