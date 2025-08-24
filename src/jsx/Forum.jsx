import React, { useEffect, useState, useRef } from 'react';
import '../css/ForumPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

function ForumPage() {
  const [messages, setMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef();
  const isInitialLoad = useRef(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/threads", { withCredentials: true });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const fetchAdminMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/messages", { withCredentials: true });
      setAdminMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch admin messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchAdminMessages();

    const interval = setInterval(() => {
      fetchMessages();
      fetchAdminMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        "http://localhost:8080/threads",
        { content: newMessage },
        { withCredentials: true }
      );
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return;

    setTimeout(() => {
      const scrollToBottom = () => {
        chatBox.scrollTop = chatBox.scrollHeight;
      };

      if (isInitialLoad.current) {
        scrollToBottom();
        isInitialLoad.current = false;
      } else {
        const isNearBottom =
          chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 50;

        if (isNearBottom) {
          scrollToBottom();
        }
      }
    }, 50);
  }, [messages]);

  return (
    <div className="forum-page">
      <Header />

      <div className="content chat-layout">
        {/* Community Chat */}
        <div className="chat-main">
          <h2>Community Chat</h2>

          <div className="chat-box" ref={chatBoxRef}>
            {messages.length === 0 ? (
              <p>No messages yet.</p>
            ) : (
              messages.map(msg => (
                <div key={msg.messageId} className="chat-message">
                  <strong>{msg.author || "Anonymous"}:</strong> {msg.content}
                  <br />
                  <small>{new Date(msg.created_at).toLocaleTimeString()}</small>
                </div>
              ))
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>

        {/* Admin Sidebar */}
        <div className="sidebar">
          <h4>Admin Messages</h4>
          {adminMessages.length === 0 ? (
            <p>No messages at the moment.</p>
          ) : (
            <ul>
              {adminMessages.map(msg => (
                <li key={msg.messageId}>
                  <strong>{msg.senderName}:</strong> {msg.content}<br />
                  <small>{new Date(msg.created_at).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ForumPage;
