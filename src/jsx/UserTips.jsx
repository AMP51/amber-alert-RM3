import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function UserTips() {
  const { alertId } = useParams();
  const [alert, setAlert] = useState(null);
  const [tip, setTip] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/alerts/${alertId}`, {
          withCredentials: true,
        });
        setAlert(res.data);
      } catch (err) {
        console.error("Error fetching alert:", err);
      }
    };

    fetchAlert();
  }, [alertId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/tips",
        {
          alertId: alert.alertId,
          message: tip,
        },
        { withCredentials: true }
      );
      window.alert("Tip submitted successfully!");
      navigate("/view/all/alerts");
    } catch (err) {
      console.error("Error submitting tip:", err);
      window.alert("Failed to submit tip.");
    }
  };

  if (!alert) {
    return <p>Loading alert info...</p>;
  }

  return (
    <>
      <Header />
      <div className="report-tip-container">
        <h2>Report a Tip</h2>

        {/* Alert Info */}
        <div className="alert-info">
          <h3>{alert.name}</h3>
          <p>
            <strong>Category:</strong> {alert.category.replace("_", " ")}
          </p>
          <p>
            <strong>Status:</strong> {alert.status}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {alert.description || "No description provided"}
          </p>
        </div>

        {/* Tip Form */}
        <form onSubmit={handleSubmit} className="tip-form">
          <label htmlFor="tip">Your Tip</label>
          <textarea
            id="tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="Write your tip here..."
            required
          />

          <button type="submit" className="submit-btn">
            Submit Tip
          </button>
        </form>

        <div className="actions">
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserTips;
