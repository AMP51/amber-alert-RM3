import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/UserAlerts.css";

function UserAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    byCategory: {}
  });
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/alerts", { withCredentials: true });

        // Filter out resolved alerts for users
        const activeAlerts = res.data.filter(a => a.status === "active");
        setAlerts(activeAlerts);
        setFilteredAlerts(activeAlerts);

        // Compute stats only for active alerts
        const total = activeAlerts.length;
        const byCategory = activeAlerts.reduce((acc, a) => {
          acc[a.category] = (acc[a.category] || 0) + 1;
          return acc;
        }, {});

        setStats({ total, active: total, byCategory });
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };
    fetchAlerts();
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategoryFilter(selected);
    if (selected === "all") {
      setFilteredAlerts(alerts);
    } else {
      setFilteredAlerts(alerts.filter(a => a.category === selected));
    }
  };

  const categoryData = Object.entries(stats.byCategory).map(([cat, count]) => ({
    name: cat.replace("_", " "),
    value: count
  }));

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

  return (
    <>
      <Header />
      <div className="alerts-container">
        <h2 className="page-title">Community Alerts Dashboard</h2>

        {/* Category Filter */}
        <div className="filter-section">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            {Object.keys(stats.byCategory).map(cat => (
              <option key={cat} value={cat}>{cat.replace("_", " ")}</option>
            ))}
          </select>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Total Alerts</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card active">
            <h3>Active</h3>
            <p>{stats.active}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Alerts by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Alerts Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredAlerts.map(a => ({
                date: new Date(a.created_at).toLocaleDateString(),
                count: 1
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alert Cards */}
        <div className="cards-section">
          <h3>All Alerts</h3>
          <div className="alerts-grid">
            {filteredAlerts.map((a) => (
              <div key={a.alertId} className="alert-card">
                <div className="alert-card-header">
                  <span className="alert-category">{a.category.replace("_", " ")}</span>
                  <span className={`alert-status ${a.status}`}>
                    {a.status}
                  </span>
                </div>
                <h4>{a.name}</h4>
                <p className="alert-desc">{a.description || "No description provided"}</p>
                <small className="alert-date">
                  {new Date(a.created_at).toLocaleString()}
                </small>
                <button
                  style={{ color: "#e74c3c" }}
                  onClick={() => navigate(`/alerts/${a.alertId}`)}>
                  View Details
                </button>
                <button
                  style={{ color: "#e74c3c" }}
                  onClick={() => navigate(`/report-tip/${a.alertId}`)}>
                  Report Tip
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserAlerts;
