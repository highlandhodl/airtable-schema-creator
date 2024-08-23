import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    personaName: '',
    jobRole: '',
    companyProfiles: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/.netlify/functions/airtable-proxy', {
        fields: formData
      });
      alert('Form submitted successfully!');
      setFormData({ personaName: '', jobRole: '', companyProfiles: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="App">
      <h1>Create Ideal Customer Persona</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="personaName">Persona Name</label>
          <input
            type="text"
            id="personaName"
            name="personaName"
            value={formData.personaName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="jobRole">Job Role</label>
          <input
            type="text"
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="companyProfiles">Company Profiles</label>
          <textarea
            id="companyProfiles"
            name="companyProfiles"
            value={formData.companyProfiles}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;