import React, { useState } from 'react';

const EditConnection = ({ selectedConnection, updateConnection }) => {
  const [applicantName, setApplicantName] = useState(selectedConnection.Applicant_Name); // Changed to match JSON field
  const [status, setStatus] = useState(selectedConnection.Status); // Changed to match JSON field
  const [loadApplied, setLoadApplied] = useState(selectedConnection.Load_Applied); // Changed to match JSON field
  const [govtIdNumber] = useState(selectedConnection.ID_Number); // Read-only, changed to match JSON field
  const [date] = useState(selectedConnection.Date_of_Application); // Read-only, changed to match JSON field

  const handleUpdate = () => {
    // Validate load applied
    if (loadApplied > 200) {
      alert("Load applied should not exceed 200 KV.");
      return;
    }

    const updatedConnection = {
      ...selectedConnection,
      Applicant_Name: applicantName, // Update the Applicant_Name field
      Status: status, // Update the Status field
      Load_Applied: loadApplied, // Include the updated Load_Applied value
    };
    
    updateConnection(updatedConnection);
  };

  return (
    <div className="edit-connection">
      <h2>Edit Connection</h2>
      <div>
        <label>Applicant ID: {selectedConnection.ID}</label> {/* Keep ID as it is */}
      </div>
      <div>
        <label>Date of Application: {date}</label> {/* Read-only */}
      </div>
      <div>
        <label>Govt ID Number: {govtIdNumber}</label> {/* Read-only */}
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={applicantName}
          onChange={(e) => setApplicantName(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div>
        <label>Load Applied (KV):</label>
        <input
          type="number"
          value={loadApplied}
          onChange={(e) => setLoadApplied(Number(e.target.value))}
        />
      </div>
      <button onClick={handleUpdate}>Update Connection</button>
    </div>
  );
};

export default EditConnection;
