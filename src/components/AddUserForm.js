// src/components/AddUserForm.js
import React, { useState } from 'react';

const AddUserForm = ({ addConnection }) => {
  const [Applicant_Name, setApplicant_Name] = useState(''); // Updated field name
  const [ID_Number, setID_Number] = useState(''); // Updated field name
  const [Load_Applied, setLoad_Applied] = useState(''); // Updated field name
  const [Date_of_Application, setDate_of_Application] = useState(''); // Updated field name
  const [Status, setStatus] = useState('Connection Released'); // Default to 'Connection Released'

  const [ID, setID] = useState(''); // New ID field

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the addConnection function passed down as a prop
    addConnection({
      ID: parseInt(ID, 10), // Ensure ID is a number
      Applicant_Name, // Updated field name
      ID_Number: parseInt(ID_Number, 10), // Ensure ID_Number is a number
      Load_Applied: parseInt(Load_Applied, 10), // Ensure Load_Applied is a number
      Date_of_Application, // Updated field name
      Status, // Updated field name
    });

    // Clear the form fields after submission
    setID('');
    setApplicant_Name('');
    setID_Number('');
    setLoad_Applied('');
    setDate_of_Application('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="number"
        placeholder="ID"
        value={ID}
        onChange={(e) => setID(e.target.value)}
        required
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Applicant Name"
        value={Applicant_Name}
        onChange={(e) => setApplicant_Name(e.target.value)}
        required
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <input
        type="number"
        placeholder="Govt ID Number"
        value={ID_Number}
        onChange={(e) => setID_Number(e.target.value)}
        required
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <input
        type="number"
        placeholder="Load Applied (KV)"
        value={Load_Applied}
        onChange={(e) => setLoad_Applied(e.target.value)}
        required
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <input
        type="date"
        value={Date_of_Application}
        onChange={(e) => setDate_of_Application(e.target.value)}
        required
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <select
        value={Status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginRight: '10px', padding: '8px' }}
      >
        <option value="Connection Released">Connection Released</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button type="submit">Add Connection</button>
    </form>
  );
};

export default AddUserForm;
