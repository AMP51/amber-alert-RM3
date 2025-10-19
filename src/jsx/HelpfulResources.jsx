import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/HelpfulResources.css';
import axios from 'axios';

function HelpfulResources() {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:8080/me', { withCredentials: true });
      } catch (err) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  // Sample resources data
  const resources = [
    {
      title: "Child Safety Guidelines",
      description: "Learn best practices for keeping children safe at home, school, and online.",
      link: "https://www.safekids.org"
    },
    {
      title: "Emergency Contacts",
      description: "Quick access to emergency phone numbers and services in your area.",
      link: "https://www.westerncape.gov.za/know-who-you-can-call-emergency"
    },
    {
      title: "Reporting Tips",
      description: "Guidelines on how to report suspicious activities effectively and safely.",
      link: "https://www.saps.gov.za/crimestop/crimestop.php"
    },
    {
      title: "Community Programs",
      description: "Engage with local initiatives focused on safety and awareness.",
      link: "https://www.sacities.net/publication/sacn-community-engagement-for-community-safety"
    }
  ];

  return (
    <div className="helpful-resources-page">
      <Header />

      <div className="resources-container">
        <h1 className="resources-title">Helpful Resources</h1>
        <p className="resources-subtitle">
          Access safety guides, emergency contacts, reporting tips, and community programs to stay informed and prepared.
        </p>

        <div className="resources-grid">
          {resources.map((resource, index) => (
            <div className="resource-card" key={index}>
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                Learn More
              </a>
            </div>
          ))}
        </div>

        <button className="back-btn" onClick={() => navigate('/user-dashboard')}>
          Back to Dashboard
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default HelpfulResources;
