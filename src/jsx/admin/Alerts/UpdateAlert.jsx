import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../../../css/admin/AdminAlert.css';
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";

function UpdateAlert() {
    const { alertId } = useParams();
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const formatDateTimeLocal = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date - tzOffset).toISOString().slice(0, 16);
    };

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/alerts/${alertId}`, { withCredentials: true });
                setAlert(res.data);
                setName(res.data.name);
                setCategory(res.data.category);
                setTime(formatDateTimeLocal(res.data.timeOfDisappearance));
                setDescription(res.data.description);
                setStatus(res.data.status);
                setImage(res.data.image || null);
                setPreview(res.data.image || null);
            } catch (err) {
                alert("Failed to fetch alert");
            }
        };
        fetchAlert();
    }, [alertId]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setImage(base64);
            setPreview(base64);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/alerts/${alertId}`, {
                name,
                category,
                timeOfDisappearance: time,
                description,
                status,
                image,
            },
                { withCredentials: true }
            );

            window.alert("Alert updated successfully!");
            navigate("/admin-dashboard");
        } catch (err) {
            alert(err.response?.data?.error || "Failed to update alert");
        }
    };

    if (!alert) return <p>Loading alert...</p>;

    return (
        <div className="body-container">
            <Header />
            <form onSubmit={handleUpdate}>
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />

                <label>Category</label>
                <input type="text" value={category} readOnly />

                <label>Time of Incident / Disappearance</label>
                <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} />

                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                <label className="image-label">Image (optional)</label>
                {preview && (<div className="image-preview">
                    <img src={preview} alt="Current Alert" style={{ maxWidth: "200px", marginBottom: "10px" }} />
                </div>)}

                <input type="file" className="image-input" accept="image/*" onChange={handleFileChange} />

                <label>Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                </select>

                <button type="submit" className="post-alert-button">Update Alert</button>
            </form>
            <Footer />
        </div>
    );
}

export default UpdateAlert;
