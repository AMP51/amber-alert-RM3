import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import "../../../css/admin/message/message.css";

function Message() {
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            await axios.post("http://localhost:8080/message", { content }, { withCredentials: true });
            alert("Message sent successfully!");
            setContent("");
        } catch (err) {
            console.error(err);
            alert("Failed to send message");
        }
    };

    return (
        <div className="body-container">
            <Header />
            <h2>Send Message to Users</h2>

            <form onSubmit={handleSendMessage} style={{ marginBottom: "2rem" }}>
                <textarea
                    placeholder="Type your message here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ width: "100%", height: "100px" }}
                />
                <button type="submit">Send Message</button>
            </form>

            <button onClick={() => navigate("/admin-dashboard")}>Back to Dashboard</button>
            <Footer />
        </div>
    );
}

export default Message;
