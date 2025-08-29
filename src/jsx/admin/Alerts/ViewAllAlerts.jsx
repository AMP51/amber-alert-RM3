import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";

function ViewAllAlerts() {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [filters, setFilters] = useState({
        category: "",
        status: "",
        date: ""
    });

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await axios.get("http://localhost:8080/alerts", { withCredentials: true });
                setAlerts(res.data);
                setFilteredAlerts(res.data);
            } catch (err) {
                alert("Failed to fetch alerts");
            }
        };
        fetchAlerts();
    }, []);

    useEffect(() => {
        let filtered = [...alerts];

        if (filters.category) {
            filtered = filtered.filter(a => a.category === filters.category);
        }
        if (filters.status) {
            filtered = filtered.filter(a => a.status === filters.status);
        }
        if (filters.date) {
            filtered = filtered.filter(a => new Date(a.created_at).toLocaleDateString() === new Date(filters.date).toLocaleDateString());
        }

        setFilteredAlerts(filtered);
    }, [filters, alerts]);

    const getStatusDot = (status) => {
        switch (status) {
            case "active": return <span style={{ color: 'red' }}>● Active</span>;
            case "resolved": return <span style={{ color: 'green' }}>● Resolved</span>;
            default: return status;
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="body-container">
            <Header />
            <h2>All Alerts</h2>

            {/* filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
                    <option value="">All Categories</option>
                    <option value="missing_person">Missing Person</option>
                    <option value="missing_vehicle">Missing Vehicle</option>
                    <option value="suspicious_activity">Suspicious Activity</option>
                </select>

                <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                </select>

                <input
                    type="date"
                    value={filters.date}
                    onChange={e => setFilters({ ...filters, date: e.target.value })}
                />
            </div>

            {/* table */}
            {filteredAlerts.length === 0 ? (
                <p>No alerts match your filters.</p>
            ) : (
                <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Time of Disappearance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlerts.map((alert, index) => (
                            <tr key={alert.alertId}>
                                <td>{index + 1}</td>
                                <td>{alert.alertId}</td>
                                <td>{alert.name}</td>
                                <td>{alert.category}</td>
                                <td>{alert.description}</td>
                                <td>{getStatusDot(alert.status)}</td>
                                <td>{formatDateTime(alert.timeOfDisappearance)}</td>
                                <td>
                                    <button
                                        style={{ color: "#e74c3c" }}
                                        onClick={() => navigate(`/view-alert/${alert.alertId}/view`)}>View
                                    </button>

                                    <button
                                        style={{ color: "#e74c3c" }}
                                        onClick={() => navigate(`/update-alert/${alert.alertId}/edit`)}>Edit
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Footer />
        </div>
    );
}

export default ViewAllAlerts;
