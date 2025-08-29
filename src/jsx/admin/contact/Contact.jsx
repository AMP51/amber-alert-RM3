import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import "../../../css/admin/contact/contact.css";

function Contact() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get("http://localhost:8080/contact", { withCredentials: true });
                setContacts(res.data);
                setFilteredContacts(res.data);
            } catch (err) {
                console.error("Failed to fetch contacts:", err);
            }
        };
        fetchContacts();
    }, []);

    useEffect(() => {
        if (!filterDate) {
            setFilteredContacts(contacts);
            return;
        }

        const filtered = contacts.filter((contact) => {
            const contactDate = new Date(contact.created_at).toISOString().split("T")[0];
            return contactDate === filterDate;
        });

        setFilteredContacts(filtered);
    }, [filterDate, contacts]);

    return (
        <>
            <Header />

            <div className="body-container">
                <h2>Contact Reports</h2>

                {/* Date filter */}
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="filter-date">Filter by Date: </label>
                    <input
                        type="date"
                        id="filter-date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                    {filterDate && (
                        <button onClick={() => setFilterDate("")} style={{ marginLeft: "10px" }}>
                            Clear
                        </button>
                    )}
                </div>

                {filteredContacts.length === 0 ? (
                    <p>No reports found for selected date.</p>
                ) : (
                    <table className="contact-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Submitted</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map((c) => (
                                <tr key={c.contactId}>
                                    <td>{c.full_name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.phone_number}</td>
                                    <td>{c.location}</td>
                                    <td>{new Date(c.created_at).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => navigate(`/admin/contact/${c.contactId}`)}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button onClick={() => navigate("/admin-dashboard")}>Back to Dashboard</button>
            </div>

            <Footer />
        </>
    );
}

export default Contact;
