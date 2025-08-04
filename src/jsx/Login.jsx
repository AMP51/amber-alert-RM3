import '../css/lrfLayout.css';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="lrf-container">
        <div className="lrf-form">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="login">Login</h1>

          <div className="form">
            <div className="input-field">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input-control"
                defaultValue=""
              />
            </div>

            <div className="input-field">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-control"
                defaultValue=""
              />
            </div>
          </div>

          <button
            className="lrf-button"
            onClick={() => navigate('/user-dashboard')} >
            <span className="button-text">Login</span>
          </button>

          <div className="links">
            <Link to="/register" className="link">Don't have an account? Click here</Link>
            <Link to="/forgot-password" className="link">Forgot your password? Click here</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
