import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/UserAlertDetails.css";

function UserAlertDetails() {
  const { alertId } = useParams();
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/alerts/${alertId}`,
          { withCredentials: true }
        );
        setAlert(res.data);
      } catch (err) {
        console.error("Error fetching alert:", err);
      }
    };
    fetchAlert();
  }, [alertId]);

  if (!alert) return <p>Loading alert details...</p>;

  return (
    <>
      <Header />
      <div className="alert-details-container">
        {alert.image && (
          <div className="alert-image">
            <img src={alert.image} alt={alert.name} />
          </div>
        )}

        <div className="alert-content">
          <div className="alert-header">
            <h2>{alert.name}</h2>
            <span className={`alert-status ${alert.status}`}>{alert.status}</span>
          </div>

          <div className="alert-alert">
            <span className="alert-category">{alert.category.replace("_", " ")}</span>
          </div>

          <div className="alert-info">
            <p><strong>Location:</strong> {(alert.address)}</p>
            <p><strong>Time of Incident/Disappearance:</strong> {new Date(alert.timeOfDisappearance).toLocaleString()}</p>
          </div>

          <p className="alert-description">{alert.description || "No description provided"}</p>
          <small className="alert-date">Submitted on: {new Date(alert.created_at).toLocaleString()}</small>

          <div className="actions">
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserAlertDetails;
