import '../css/lrfLayout.css';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/login', formData, {
        withCredentials: true,
      });

      console.log('Login success:', res.data);

      if (res.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="lrf-container">
      <div className="lrf-form">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login">Login</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="form">
          <div className="input-field">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-control"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="input-field">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-control"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <button type="button" className="lrf-button" onClick={handleLogin}>
          Login
        </button>

        <div className="links">
          <Link to="/register" className="link">Don't have an account? Click here</Link>
          <Link to="/forgot-password" className="link">Forgot your password? Click here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
