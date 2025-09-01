import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";

function AdminTips() {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [filters, setFilters] = useState({ category: "", date: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("http://localhost:8080/allTips", {
          withCredentials: true,
        });
        setTips(res.data);
        setFilteredTips(res.data);
      } catch (err) {
        console.error("Error fetching tips:", err);
      }
    };

    fetchTips();
  }, []);

  useEffect(() => {
    let filtered = [...tips];

    if (filters.category) {
      filtered = filtered.filter(
        (tip) => tip.alertCategory === filters.category
      );
    }

    if (filters.date) {
      filtered = filtered.filter(
        (tip) =>
          new Date(tip.created_at).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString()
      );
    }

    setFilteredTips(filtered);
  }, [filters, tips]);

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="body-container">
      <Header />
      <h2>Tips</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="missing_person">Missing Person</option>
          <option value="missing_vehicle">Missing Vehicle</option>
          <option value="suspicious_activity">Suspicious Activity</option>
          <option value="other">Other</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      {/* Tips Table */}
      {filteredTips.length === 0 ? (
        <p>No tips match your filters.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tip ID</th>
              <th>Alert</th>
              <th>User</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTips.map((tip, index) => (
              <tr key={tip.tipId}>
                <td>{index + 1}</td>
                <td>{tip.tipId}</td>
                <td>{tip.alertName}</td>
                <td>{tip.userName}</td>
                <td>{tip.message.slice(0, 30)}...</td>
                <td>{formatDateTime(tip.created_at)}</td>
                <td>
                  <button
                    style={{ color: "#e74c3c" }}
                    onClick={() => navigate(`/admin/tips/${tip.tipId}`)}>
                    View Details
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

export default AdminTips;
