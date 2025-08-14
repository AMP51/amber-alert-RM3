import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get('http://localhost:8080/me', {
          withCredentials: true,
        });
        setRole(res.data.role);
      } catch (err) {
        console.error('Failed to fetch role:', err);
        setRole(null);
      }
    };
    fetchRole();
  }, []);

  const handleLogoClick = () => {
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="logo-image" />
        </div>

        <div className="title-container">
          <h1 className="main-title">AMBER ALERT</h1>
        </div>

        <div className="header-buttons">
          <button className="header-btn" onClick={handleProfile}>👤 Profile</button>
          <button className="header-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
