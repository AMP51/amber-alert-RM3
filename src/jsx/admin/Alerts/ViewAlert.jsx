import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../../css/admin/AdminAlert.css';
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";

function ViewAlert() {
    const { alertId } = useParams();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/alerts/${alertId}`, { withCredentials: true });
                setAlert(res.data);
            } catch (err) {
                alert("Failed to fetch alert");
            }
        };
        fetchAlert();
    }, [alertId]);

    if (!alert) return <p>Loading alert...</p>;

    return (
        <div className="body-container">
            <Header />
            <div className="alert-view">
                <h2>{alert.name}</h2>
                <p><strong>Category:</strong> {alert.category}</p>
                <p><strong>Status:</strong> {alert.status}</p>
                <p><strong>Time:</strong> {alert.timeOfDisappearance}</p>
                <p><strong>Description:</strong> {alert.description}</p>
                {alert.image && <img src={alert.image} alt="Alert" style={{ maxWidth: '250px' }} />}
            </div>
            <Footer />
        </div>
    );
}

export default ViewAlert;
