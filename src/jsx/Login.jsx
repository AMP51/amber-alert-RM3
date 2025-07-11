import './css/Login.css';

function Login() {
  return (
    <>
      <div className="login-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Login</h1>

          <div className="form-fields">
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

          <button className="login-button">
            <span className="button-text">Login</span>
          </button>

          <div className="footer-links">
            <button className="footer-link">Don't have an account? click here</button>
            <button className="footer-link">Forgot Password? click here</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
