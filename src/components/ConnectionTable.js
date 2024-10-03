import React from 'react';
const ConnectionTable = ({ connections = [], onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Applicant Name</th>
          <th>Date of Application</th>
          <th>Status</th>
          <th>Govt ID Number</th>
          <th>Load Applied (KV)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {connections.map((connection) => (
          <tr key={connection.ID}>
            <td>{connection.ID}</td>
            <td>{connection.Applicant_Name}</td>
            <td>{connection.Date_of_Application}</td>
            <td>{connection.Status}</td>
            <td>{connection.ID_Number}</td>
            <td>{connection.Load_Applied}</td>
            <td>
              <button onClick={() => onEdit(connection)}>Edit</button>
              {connection.Status === 'Rejected' && (
                <button onClick={() => onDelete(connection.ID)}>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ConnectionTable;