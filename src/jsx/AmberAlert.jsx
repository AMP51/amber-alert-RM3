import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import '../css/lrfLayout.css';


function AmberAlert() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    const handleResources = () => {
        navigate('/helpful/resources');
    };

    const handleAboutUs = () => {
        navigate('/aboutus ');
    };

    return (
        <div className="amber-alert">
            <img src={logo} alt="Logo" className="logo" />

            <div className="amberalert-content">
                <h1 className="amberalert-title">Welcome to Amber Alert</h1>
                <p className="amberalert-subtitle">Alert-Saftey-Awareness<br></br>Find trusted help at your fingertips.</p>
                <div className="amberalert-button-row">
                <button className="amberalert-button" onClick={handleGetStarted}>
                    <span className="button-text">Get Started</span>
                </button>
                <button className="amberalert-button" onClick={handleResources}>
                    <span className="button-text">Helpful Resources</span>
                </button>
                <button className="amberalert-button" onClick={handleAboutUs}>
                    <span className="button-text">About Us</span>
                </button>
                </div>
            </div>
            <footer className="amberalert-footer">
                <div className="footer-content">
                    <p>&copy; 2025 Amber Alert. All rights reserved.</p>

                </div>
            </footer>

        </div>
    );
}

export default AmberAlert;
