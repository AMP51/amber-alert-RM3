import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../css/admin/AdminAlert.css';
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

function AdminAlert() {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [vehicleType, setVehicleType] = useState("");
    const [activityDesc, setActivityDesc] = useState("");
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [address, setAddress] = useState("");
    const [existingAlerts, setExistingAlerts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const westernCapeBounds = L.latLngBounds(
        L.latLng(-35.35, 16.45), 
        L.latLng(-31.50, 24.90) 
    );

    useEffect(() => {
        axios.get("http://localhost:8080/alerts", { withCredentials: true })
            .then(res => setExistingAlerts(res.data))
            .catch(err => console.error("Failed to fetch alerts:", err));
    }, []);

    const convertToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(time) > new Date()) {
            alert("Future dates are not allowed.");
            return;
        }

        let base64Image = image ? await convertToBase64(image) : null;

        let alertData = {
            category,
            name,
            timeOfDisappearance: time,
            description: category === "suspicious_activity" ? activityDesc : description,
            image: base64Image,
            location: location.lat && location.lng ? `${location.lat},${location.lng}` : null,
            address: address || null
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
            setLocation({ lat: null, lng: null });
            setAddress("");
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

    const getCurrentDateTimeLocal = () => {
        const now = new Date();
        now.setSeconds(0, 0);
        const offset = -now.getTimezoneOffset();
        const adjusted = new Date(now.getTime() + offset * 60000);
        return adjusted.toISOString().slice(0, 16);
    };

    function LocationSelector() {
        useMapEvents({
            click: async (e) => {
                if (!westernCapeBounds.contains(e.latlng)) {
                    alert("Please select a location within Western Cape.");
                    return;
                }

                const { lat, lng } = e.latlng;
                setLocation({ lat, lng });

                try {
                    const response = await axios.get(
                        "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode",
                        { params: { location: `${lng},${lat}`, f: "json" } }
                    );
                    const addr = response.data?.address?.LongLabel || "Address not found";
                    setAddress(addr);
                } catch (err) {
                    setAddress("Failed to fetch address");
                }
            }
        });
        return null;
    }

    function MapUpdater({ location }) {
        const map = useMap();
        if (location.lat && location.lng) {
            map.flyTo([location.lat, location.lng], 12, { duration: 1.0 });
        }
        return null;
    }

    const handleSearch = async () => {
        if (!searchInput) return;
        try {
            const response = await axios.get(
                "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates",
                {
                    params: {
                        f: "json",
                        SingleLine: searchInput,
                        searchExtent: "16.45,-35.35,24.90,-31.50" 
                    }
                }
            );

            const candidate = response.data?.candidates?.[0];
            if (candidate) {
                setLocation({ lat: candidate.location.y, lng: candidate.location.x });
                setAddress(candidate.address);
            } else {
                alert("Address not found in Western Cape");
            }
        } catch (err) {
            alert("Failed to search address");
        }
    };

    return (
        <div className="body-container">
            <Header />

            {step === 1 && (
                <div className="category-step">
                    <h2>Select Alert Category</h2>
                    <div className="category-cards">
                        <div className={`category-card ${category === "missing_person" ? "selected" : ""}`} onClick={() => { setCategory("missing_person"); setStep(2); }}>
                            <img width="80" height="80" src="https://img.icons8.com/dotty/80/search-client.png" alt="search-client" />
                            <p>Missing Person</p>
                        </div>
                        <div className={`category-card ${category === "missing_vehicle" ? "selected" : ""}`} onClick={() => { setCategory("missing_vehicle"); setStep(2); }}>
                            <img width="80" height="80" src="https://img.icons8.com/dotty/80/car.png" alt="car" />
                            <p>Missing Vehicle</p>
                        </div>
                        <div className={`category-card ${category === "suspicious_activity" ? "selected" : ""}`} onClick={() => { setCategory("suspicious_activity"); setStep(2); }}>
                            <img width="80" height="80" src="https://img.icons8.com/ios/80/arrest.png" alt="arrest" />
                            <p>Suspicious Activity</p>
                        </div>
                        <div className={`category-card ${category === "other" ? "selected" : ""}`} onClick={() => { setCategory("other"); setStep(2); }}>
                            <img width="80" height="80" src="https://img.icons8.com/ios/80/help--v1.png" alt="other" />
                            <p>Other</p>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <label>{getNameLabel()}</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                    {category === "missing_vehicle" && (
                        <>
                            <label>Vehicle Type</label>
                            <input type="text" value={vehicleType} onChange={e => setVehicleType(e.target.value)} required />
                        </>
                    )}

                    <label>Time of Incident</label>
                    <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} max={getCurrentDateTimeLocal()} required />

                    <label>{getDescriptionLabel()}</label>
                    <textarea value={category === "suspicious_activity" ? activityDesc : description} onChange={(e) => category === "suspicious_activity" ? setActivityDesc(e.target.value) : setDescription(e.target.value)} required />

                    <label>Image (optional)</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                    <label>Search Address</label>
                    <div style={{ display: "flex", marginBottom: "1rem" }}>
                        <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Enter address in Western Cape" style={{ flex: 1, marginRight: "0.5rem" }} />
                        <button type="button" onClick={handleSearch}>Search</button>
                    </div>

                    <label>Select Location on Map</label>
                    <div style={{ height: "300px", marginBottom: "1rem" }}>
                        <MapContainer
                            center={[-33.9258, 18.4232]}
                            zoom={10}
                            style={{ height: "100%", width: "100%" }}
                            maxBounds={westernCapeBounds}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                            <LocationSelector />
                            <MapUpdater location={location} />

                            {location.lat && location.lng && (
                                <Marker position={[location.lat, location.lng]} icon={new L.Icon.Default()}>
                                    <Popup>{address || "Selected Location"}</Popup>
                                </Marker>
                            )}

                            {existingAlerts.map(alert => {
                                if (!alert.location) return null;
                                const coords = alert.location.split(',').map(Number);
                                if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) return null;
                                const [lat, lng] = coords;
                                return (
                                    <Marker key={alert.alertId || alert.id} position={[lat, lng]} icon={new L.Icon.Default()}>
                                        <Popup>
                                            <strong>{alert.name}</strong><br />
                                            {alert.category}<br />
                                            {alert.address || "No address"}
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>

                    {location.lat && location.lng && <p><strong>Selected Address:</strong> {address}</p>}

                    <button type="submit" className="post-alert-button">Post This Alert</button>
                    <button type="button" className="back-button" onClick={() => setStep(1)}>Back</button>
                </form>
            )}

            <Footer />
        </div>
    );
}

export default AdminAlert;
