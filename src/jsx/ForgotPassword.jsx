import '../components/lrfLayout.css';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className="lrf-container">
            <div className="lrf-form">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="login">Forgot Password <br></br> Your Password ?</h1>

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
                        <label className="input-label">Phone Number</label>
                        <input
                            type="tel"
                            className="input-control"
                            defaultValue=""
                        />
                    </div>
                </div>

                <button className="lrf-button">
                    <span className="button-text">Reset Password</span>
                </button>

                <div className="links">
                    <Link to="/login" className="link">Already have an account? Click here</Link>
                    <Link to="/register" className="link">Don't have an account? Click here</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
