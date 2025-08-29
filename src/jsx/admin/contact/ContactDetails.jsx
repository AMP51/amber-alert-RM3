import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import "../../../css/admin/contact/contactDetails.css";

function ContactDetails() {
    const { id } = useParams(); // contactId from route
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/contact/${id}`, { withCredentials: true });
                setContact(res.data);
            } catch (err) {
                console.error("Failed to fetch contact details:", err);
            }
        };
        fetchContact();
    }, [id]);

    if (!contact) {
        return (
            <>
                <Header />
                <div className="body-container">
                    <p>Loading contact details...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <div className="body-container">
                <h2>Contact Report Details</h2>

                <div className="contact-details-box">
                    <p><strong>Full Name:</strong> {contact.full_name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone Number:</strong> {contact.phone_number}</p>
                    <p><strong>Location:</strong> {contact.location}</p>
                    <p><strong>Description:</strong> {contact.description}</p>
                    <p><strong>Submitted At:</strong> {new Date(contact.created_at).toLocaleString()}</p>
                </div>

                <button onClick={() => navigate("/admin/contact")}>Back to Contact Reports</button>
            </div>

            <Footer />
        </>
    );
}

export default ContactDetails;
