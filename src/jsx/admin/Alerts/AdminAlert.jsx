import '../../../css/admin/AdminAlert.css'
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

    {/* because i added image upload i want to store the image in the datbase as a string */ }
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
            description,
            image: base64Image
        };
        {/* this is for when the admin clicks a category it shows the form based on the selection */ }
        if (category === "missing_vehicle") alertData.vehicleType = vehicleType;
        if (category === "suspicious_activity") alertData.activityDesc = activityDesc;

        try {
            await axios.post("http://localhost:8080/alerts", alertData, { withCredentials: true });
            alert("Alert created successfully!");

            {/* redirecting the admin back to the dashboard */ }
            navigate("/admin-dashboard");

            {/* resetting the form after submission */ }
            setStep(1); setCategory(""); setName(""); setTime(""); setDescription(""); setVehicleType(""); setActivityDesc(""); setImage(null);
        } catch (err) {
            alert(err.response?.data?.error || "Failed to create alert");
        }
    };
    {/* changing the first field of the form according to the category */ }
    const getNameLabel = () => {
        if (category === "missing_vehicle") return "Vehicle Name";
        if (category === "suspicious_activity") return "Name of Suspicious Activity";
        return "Name of Missing Person";
    };
    {/* changing the names of the titles for the description boxes based on the category */ }
    const getDescriptionLabel = () => {
        if (category === "missing_vehicle") return "Description of Vehicle or Situation";
        if (category === "suspicious_activity") return "Description of Suspicious Activity";
        return "Description of Person and Situation";
    };

    return (
        <div className="body-container">
            <Header />
            {/* changed the form into a 2step form so the admin first select a category then the admin can fill in the form */}
            {step === 1 && (
                <div className="category-step">
                    <h2>Select Alert Category</h2>
                    <div className="category-cards">
                        <div
                            className={`category-card ${category === "missing_person" ? "selected" : ""}`}
                            onClick={() => { setCategory("missing_person"); setStep(2); }}
                        >
                            <span><img width="80" height="80" src="https://img.icons8.com/dotty/80/search-client.png" alt="search-client" /></span>
                            <p>Missing Person</p>
                        </div>

                        <div
                            className={`category-card ${category === "missing_vehicle" ? "selected" : ""}`}
                            onClick={() => { setCategory("missing_vehicle"); setStep(2); }}
                        >
                            <span><img width="80" height="80" src="https://img.icons8.com/dotty/80/car.png" alt="car" /></span>
                            <p>Missing Vehicle</p>
                        </div>

                        <div
                            className={`category-card ${category === "suspicious_activity" ? "selected" : ""}`}
                            onClick={() => { setCategory("suspicious_activity"); setStep(2); }}
                        >
                            <span><img width="80" height="80" src="https://img.icons8.com/ios/80/arrest.png" alt="arrest" /></span>
                            <p>Suspicious Activity</p>
                        </div>
                    </div>

                </div>
            )}

            {/* the form itself */}
            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <label className="name-label">{getNameLabel()}</label>
                    <input type="text" className="name-input" value={name} onChange={(e) => setName(e.target.value)} />

                    {category === "missing_vehicle" && (
                        <>
                            <label>Vehicle Type</label>
                            <input type="text" value={vehicleType} onChange={e => setVehicleType(e.target.value)} />
                        </>
                    )}

                    <label className="time-label">Time of Incident / Disappearance</label>
                    <input type="datetime-local" className="time-input" value={time} onChange={(e) => setTime(e.target.value)} />

                    <label className="description-label">{getDescriptionLabel()}</label>
                    <textarea
                        className="description-input"
                        value={category === "suspicious_activity" ? activityDesc : description}
                        onChange={(e) => category === "suspicious_activity" ? setActivityDesc(e.target.value) : setDescription(e.target.value)}
                    />

                    <label className="image-label">Image (optional)</label>
                    <input type="file" className="image-input" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                    <button type="submit" className="post-alert-button">Post This Alert</button>
                    <button type="button" className="back-button" onClick={() => setStep(1)}>Back</button>
                </form>
            )}

            <Footer />
        </div>
    );
}

export default AdminAlert;
