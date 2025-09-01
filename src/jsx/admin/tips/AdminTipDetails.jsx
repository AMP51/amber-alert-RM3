import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import '../../../css/admin//contact/contactDetails.css';

function AdminTipDetails() {
  const { tipId } = useParams();
  const [tip, setTip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/tips/${tipId}`, {
          withCredentials: true,
        });
        setTip(res.data);
      } catch (err) {
        alert("Failed to fetch tip");
      }
    };
    fetchTip();
  }, [tipId]);

  if (!tip) return <p>Loading tip details...</p>;

  return (
    <>
      <div className="body-container">
        <Header />
        <div className="contact-details-box">
          <h2>Tip from {tip.userName}</h2>
          <p><strong>User:</strong> {tip.userName} ({tip.userEmail})</p>
          <p><strong>Phone Number:</strong> {tip.userPhone}</p>
          <p><strong>Linked Alert:</strong> {tip.alertName}</p>
          <p><strong>Alert Description:</strong> {tip.alertDescription}</p>
          <p><strong>Message:</strong> {tip.message}</p>
          <p><strong>Date Submitted:</strong> {new Date(tip.created_at).toLocaleString()}</p>
        </div>
        <button onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <Footer />
    </>
  );
}

export default AdminTipDetails;
