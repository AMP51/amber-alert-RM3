import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Profile.css';

function Profile() {
    const [user, setUser] = useState({ name: '', email: '', phone: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile", {
                    withCredentials: true,
                });
                setUser(prev => ({ ...prev, ...res.data, password: "" }));
            } catch (err) {
                console.error(err);
                alert("Failed to fetch profile");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = e => {
        const { id, value } = e.target;
        setUser(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { name, ...updateData } = user;
            await axios.put('http://localhost:8080/profile', updateData, { withCredentials: true });
            alert('Profile updated successfully!');
            setUser(prev => ({ ...prev, password: '' }));
            navigate('/user-dashboard');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Failed to update profile');
        }
    };

    {/* form */ }

    return (
        <div className="amber-alert-page">
            <Header />

            <main className="form-area">
                <div className="form-center">
                    <h1 className="title">Update Your Profile</h1>

                    <form className="profile-form" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            value={user.name}
                            readOnly
                        />

                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={user.email}
                            onChange={handleChange}
                        />

                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            className="form-input"
                            value={user.phone}
                            onChange={handleChange}
                        />

                        <label htmlFor="password" className="form-label">Change Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                        />

                        <button type="submit" className="sidebar-btn red profile-submit-btn">
                            Update Profile
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Profile;
