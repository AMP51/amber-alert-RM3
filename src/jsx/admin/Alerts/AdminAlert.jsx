import '../../../css/admin/AdminAlert.css';
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminAlert() {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [vehicleType, setVehicleType] = useState("");
    const [activityDesc, setActivityDesc] = useState("");
    const navigate = useNavigate();

    const convertToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let base64Image = image ? await convertToBase64(image) : null;

        let alertData = {
            category,
            name,
            timeOfDisappearance: time,
            description: category === "suspicious_activity" ? activityDesc : description,
            image: base64Image
        };

        if (category === "missing_vehicle") alertData.vehicleType = vehicleType;
        if (category === "suspicious_activity") alertData.activityDesc = activityDesc;

        try {
            await axios.post("http://localhost:8080/alerts", alertData, { withCredentials: true });
            alert("Alert created successfully!");
            navigate("/admin-dashboard");

            // Reset form
            setStep(1);
            setCategory("");
            setName("");
            setTime("");
            setDescription("");
            setVehicleType("");
            setActivityDesc("");
            setImage(null);
        } catch (err) {
            alert(err.response?.data?.error || "Failed to create alert");
        }
    };

    const getNameLabel = () => {
        if (category === "missing_vehicle") return "Vehicle Name";
        if (category === "suspicious_activity") return "Name of Suspicious Activity";
        if (category === "other") return "Title";
        return "Name of Missing Person";
    };

    const getDescriptionLabel = () => {
        if (category === "missing_vehicle") return "Description of Vehicle or Situation";
        if (category === "suspicious_activity") return "Description of Suspicious Activity";
        if (category === "other") return "Description";
        return "Description of Person and Situation";
    };

    return (
        <div className="body-container">
            <Header />

            {/* Step 1: Category Selection */}
            {step === 1 && (
                <div className="category-step">
                    <h2>Select Alert Category</h2>
                    <div className="category-cards">
                        <div
                            className={`category-card ${category === "missing_person" ? "selected" : ""}`}
                            onClick={() => { setCategory("missing_person"); setStep(2); }}
                        >
                            <img width="80" height="80" src="https://img.icons8.com/dotty/80/search-client.png" alt="search-client" />
                            <p>Missing Person</p>
                        </div>

                        <div
                            className={`category-card ${category === "missing_vehicle" ? "selected" : ""}`}
                            onClick={() => { setCategory("missing_vehicle"); setStep(2); }}
                        >
                            <img width="80" height="80" src="https://img.icons8.com/dotty/80/car.png" alt="car" />
                            <p>Missing Vehicle</p>
                        </div>

                        <div
                            className={`category-card ${category === "suspicious_activity" ? "selected" : ""}`}
                            onClick={() => { setCategory("suspicious_activity"); setStep(2); }}
                        >
                            <img width="80" height="80" src="https://img.icons8.com/ios/80/arrest.png" alt="arrest" />
                            <p>Suspicious Activity</p>
                        </div>

                        <div
                            className={`category-card ${category === "other" ? "selected" : ""}`}
                            onClick={() => { setCategory("other"); setStep(2); }}
                        >
                            <img width="80" height="80" src="https://img.icons8.com/ios/80/help--v1.png" alt="other" />
                            <p>Other</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Alert Form */}
            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <label className="name-label">{getNameLabel()}</label>
                    <input
                        type="text"
                        className="name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {category === "missing_vehicle" && (
                        <>
                            <label>Vehicle Type</label>
                            <input
                                type="text"
                                value={vehicleType}
                                onChange={e => setVehicleType(e.target.value)}
                                required
                            />
                        </>
                    )}

                    <label className="time-label">Time of Incident </label>
                    <input
                        type="datetime-local"
                        className="time-input"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />

                    <label className="description-label">{getDescriptionLabel()}</label>
                    <textarea
                        className="description-input"
                        value={category === "suspicious_activity" ? activityDesc : description}
                        onChange={(e) =>
                            category === "suspicious_activity"
                                ? setActivityDesc(e.target.value)
                                : setDescription(e.target.value)
                        }
                        required
                    />

                    <label className="image-label">Image (optional)</label>
                    <input
                        type="file"
                        className="image-input"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button type="submit" className="post-alert-button">Post This Alert</button>
                    <button type="button" className="back-button" onClick={() => setStep(1)}>Back</button>
                </form>
            )}

            <Footer />
        </div>
    );
}

export default AdminAlert;
