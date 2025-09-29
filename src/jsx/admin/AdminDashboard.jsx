import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../css/admin/AdminDashboard.css';
import axios from 'axios';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [tips, setTips] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  {/* Check if admin is logged in */ }
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8080/me", { withCredentials: true });
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  {/* Fetch alerts */ }
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/alerts", { withCredentials: true });
        setAlerts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    };
    fetchAlerts();
  }, []);

  {/* Fetch tips */ }
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("http://localhost:8080/allTips", { withCredentials: true });
        setTips(res.data || []);
      } catch (err) {
        console.error("Failed to fetch tips:", err);
      }
    };
    fetchTips();
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const alertDate = new Date(alert.created_at);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesStatus = statusFilter ? alert.status === statusFilter : true;
    const matchesDate = (!start || alertDate >= start) && (!end || alertDate <= end);

    return matchesStatus && matchesDate;
  });

  // Print handler
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Admin Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f4f4f4; }
            img { max-width: 100px; height: auto; }
          </style>
        </head>
        <body>
          <h2>Alerts</h2>
          <p>Status: ${statusFilter || "All"}</p>
          <p>Date: ${startDate || "Any"} - ${endDate || "Any"}</p>
          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Category</th>
                <th>Alert Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAlerts.map(a => `
                <tr>
                  <td>${a.alertId}</td>
                  <td>${a.category}</td>
                  <td>${a.name}</td>
                  <td>${a.description}</td>
                  <td>${a.status}</td>
                  <td>${new Date(a.created_at).toLocaleString()}</td>
                  <td>${a.image ? `<img src="${a.image}" alt="alert"/>` : "N/A"}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h2>Tips</h2>
          <table>
            <thead>
              <tr>
                <th>Tip ID</th>
                <th>Alert Name</th>
                <th>Message</th>
                <th>Submitted By</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${tips.map(t => `
                <tr>
                  <td>${t.tipId}</td>
                  <td>${t.alertName}</td>
                  <td>${t.message}</td>
                  <td>${t.userName}</td>
                  <td>${new Date(t.created_at).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleCreateAnAlert = () => navigate('/admin-alert');

  return (
    <div className="admin-dashboard-page">
      <Header />

      <main className="admin-dashboard-content">
        {/* Alert Management */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Admin Alert Management</h2>
            <div className="section-buttons">
              <button className="section-btn" onClick={handleCreateAnAlert}>Create An Alert</button>
              <button className="section-btn" onClick={() => navigate(`/admin-view/all/alerts`)}>Alerts</button>
              <button className="section-btn" onClick={() => navigate(`/admin/message`)}>Message</button>
              <button className="section-btn" onClick={() => navigate(`/admin/contact`)}>Contacts</button>
              <button className="section-btn" onClick={() => navigate(`/admin/tips`)}>Tips</button>
              <button className="section-btn print-btn" onClick={handlePrint}>Print All Alerts & Tips</button>

            </div>
          </div>
        </section>

        {/* Dashboard Stats */}
        <section className="dashboard-grid">
          <div className="dashboard-box">
            <h3 className="box-title">Active Alerts</h3>
            <p className="box-count">{alerts.filter(a => a.status === "active").length}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Resolved Alerts</h3>
            <p className="box-count">{alerts.filter(a => a.status === "resolved").length}</p>
          </div>
          <div className="dashboard-box">
            <h3 className="box-title">Reported Tips</h3>
            <p className="box-count">{tips.length}</p>
          </div>
        </section>

        <section className="dashboard-section" style={{ marginTop: "20px", textAlign: "center" }}>
          <label>Status: </label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ marginRight: "10px" }}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>

          <label>From: </label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ margin: "0 10px" }} />

          <label>To: </label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ marginRight: "10px" }} />

        </section>

      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboardPage;
