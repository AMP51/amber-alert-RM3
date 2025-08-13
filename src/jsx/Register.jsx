import '../css/lrfLayout.css';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/register', formData,);
      console.log(res.data);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="lrf-container">
      <div className="lrf-form">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="register">Register</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="form">
          <div className="input-field">
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              className="input-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              className="input-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label className="input-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="input-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              className="input-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="button" className="lrf-button" onClick={handleRegister}>
          <span className="button-text">Register</span>
        </button>

        <div className="links">
          <Link to="/login" className="link">Already have an account? Click here</Link>
          <Link to="/forgot-password" className="link">Forgot your password? Click here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
