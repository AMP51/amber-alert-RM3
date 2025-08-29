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
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    resolved: 0,
    byCategory: {}
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/alerts", { withCredentials: true });
        setAlerts(res.data);

        const total = res.data.length;
        const active = res.data.filter(a => a.status === "active").length;
        const resolved = res.data.filter(a => a.status === "resolved").length;
        const byCategory = res.data.reduce((acc, a) => {
          acc[a.category] = (acc[a.category] || 0) + 1;
          return acc;
        }, {});

        setStats({ total, active, resolved, byCategory });
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();
  }, []);

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
          <div className="stat-card resolved">
            <h3>Resolved</h3>
            <p>{stats.resolved}</p>
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
              <BarChart data={alerts.map(a => ({
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

        {/* Table */}
        <div className="table-card">
          <h3>Latest Alerts</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {alerts.slice(0, 10).map((a) => (
                <tr key={a.alertId}>
                  <td>{a.category.replace("_", " ")}</td>
                  <td>{a.name}</td>
                  <td className={a.status === "active" ? "status-active" : "status-resolved"}>
                    {a.status}
                  </td>
                  <td>{new Date(a.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alert Cards */}
        <div className="cards-section">
          <h3>All Alerts</h3>
          <div className="alerts-grid">
            {alerts.map((a) => (
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
                  onClick={() => navigate(`/alerts/${a.alertId}`)}>View Details
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
