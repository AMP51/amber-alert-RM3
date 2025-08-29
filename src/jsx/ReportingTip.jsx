import React, { useState } from 'react';

function CreateAnAlert() {
  const [formData, setFormData] = useState({
    category: 'Missing vehicle',
    description: '',
    datetime: '',
    location: '',
    contact: '',
    additional: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted alert:', formData);
    // Add your submission logic here
  };

  return (
    <div className="create-alert-page">
      <div className="alert-form">
        <h2>Create an Alert</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Choose a tip category
            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Missing vehicle</option>
              <option>Missing person</option>
              <option>Suspicious activity</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Name and Description
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a description"
            />
          </label>

          <label>
            Date and time
            <input
              type="text"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              placeholder="5 March 2024, 2:30 pm"
            />
          </label>

          <label>
            Location of event
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label>
            Contact information (Opt)
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </label>

          <label>
            Additional information
            <textarea
              name="additional"
              value={formData.additional}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <div className="alert-sidebar">
        <div className="map-box">
          <img src="https://maps.googleapis.com/maps/api/staticmap?center=Tennant+St&zoom=15&size=300x200" alt="Map" />
        </div>
        <div className="upload-box">
          <p><strong>Upload</strong><br />(jpg, png, mp4)</p>
          <div className="upload-icon">⬆️</div>
        </div>
      </div>
    </div>
  );
}

export default CreateAnAlert;



