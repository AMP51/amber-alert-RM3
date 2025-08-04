import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/user-dashboard">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>

        {/* Title */}
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
