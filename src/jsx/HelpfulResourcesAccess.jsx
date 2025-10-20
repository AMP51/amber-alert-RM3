import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HelpfulResources.css';

function HelpfulResourcesAccess() {
  const navigate = useNavigate();

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

  const supportContacts = [
    {
      type: "Customer Support",
      description: "Reach out for technical issues or account-related assistance.",
      email: "support@amberalertapp.com",
      phone: "+27 21 123 4567"
    },
    {
      type: "Emergency Help Line",
      description: "Available 24/7 for urgent safety matters.",
      phone: "10111 (SAPS Crime Stop)"
    },
    {
      type: "Feedback & Suggestions",
      description: "Share your ideas or report bugs to improve the app.",
      email: "feedback@amberalertapp.com"
    }
  ];

  return (
    <div className="helpful-resources-page">

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

        {/* Support & Contact Section */}
        <div className="support-section">
          <h2 className="support-title">Support & Contact</h2>
          <p className="support-subtitle">
            If you need assistance, reach out to the following contacts:
          </p>
          <div className="support-grid">
            {supportContacts.map((contact, index) => (
              <div className="support-card" key={index}>
                <h4 className="support-type">{contact.type}</h4>
                <p className="support-description">{contact.description}</p>
                {contact.email && <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>}
                {contact.phone && <p>Phone: {contact.phone}</p>}
              </div>
            ))}
          </div>
        </div>

        <button className="back-btn" onClick={() => navigate('/')}>
          Back
        </button>
      </div>

    </div>
  );
}

export default HelpfulResourcesAccess;
