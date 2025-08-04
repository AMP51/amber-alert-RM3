import '../css/lrfLayout.css';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ForgotPassword() {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    setResetSuccess(true);
  };

  return (
    <div className="lrf-container">
      <div className="lrf-form">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login">
          Forgot Password <br /> Your Password ?
        </h1>

        {resetSuccess && (
          <div style={{ color: 'green', marginBottom: '15px' }}>
            Password reset successfully!
          </div>
        )}

        <div className="form">
          <div className="input-field">
            <label className="input-label">Email</label>
            <input type="email" className="input-control" defaultValue="" />
          </div>

          <div className="input-field">
            <label className="input-label">Phone Number</label>
            <input type="tel" className="input-control" defaultValue="" />
          </div>
        </div>

        <button type="button" className="lrf-button" onClick={handleReset}>
          <span className="button-text">Reset Password</span>
        </button>

        <div className="links">
          <Link to="/login" className="link">
            Already have an account? Click here
          </Link>
          <Link to="/register" className="link">
            Don't have an account? Click here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
