import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Profile.css';

function Profile() {
    return (
        <div className="amber-alert-page">
            <Header />

            <main className="form-area">
                <div className="form-center">
                    <h1 className="title">Update Your Profile</h1>

                    <form className="profile-form">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" id="name" className="form-input" defaultValue="" />

                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" className="form-input" defaultValue="" />

                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="tel" id="phone" className="form-input" defaultValue="" />

                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-input" defaultValue="" />

                        <button type="submit" className="sidebar-btn red profile-submit-btn">Update Profile</button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Profile;
