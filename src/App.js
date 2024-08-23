import React, { useState } from 'react';
import axios from 'axios';

const CreateCustomerPersonaForm = () => {
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
      const response = await axios.post('/.netlify/functions/airtable-proxy', {
        fields: formData
      });
      console.log('Success:', response.data);
      alert('Form submitted successfully!');
      setFormData({ personaName: '', jobRole: '', companyProfiles: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="personaName"
        value={formData.personaName}
        onChange={handleChange}
        placeholder="Persona Name"
        required
      />
      <input
        name="jobRole"
        value={formData.jobRole}
        onChange={handleChange}
        placeholder="Job Role"
        required
      />
      <textarea
        name="companyProfiles"
        value={formData.companyProfiles}
        onChange={handleChange}
        placeholder="Company Profiles (comma-separated)"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCustomerPersonaForm;