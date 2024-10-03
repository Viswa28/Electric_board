import React, { useState, useEffect } from 'react';
import ConnectionTable from '../components/ConnectionTable';
import AddUserForm from '../components/AddUserForm';
import EditConnection from '../components/EditConnection';
import connectionData from '../data/connections.json';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setConnections(connectionData); // Load connections from JSON
  }, []);

  // Filter connections based on search term and date range
  const filteredConnections = connections.filter((connection) => {
    const connectionDate = new Date(connection.Date_of_Application); // Use Date_of_Application
    const isInRange =
      (!startDate || connectionDate >= new Date(startDate)) &&
      (!endDate || connectionDate <= new Date(endDate));

    return (
      connection.ID.toString().includes(searchTerm) && isInRange // Search by Applicant ID (ID)
    );
  });

  const addConnection = (newConnection) => {
    setConnections((prevConnections) => [...prevConnections, newConnection]);
  };

  const updateConnection = (updatedConnection) => {
    setConnections((prevConnections) =>
      prevConnections.map((connection) =>
        connection.ID === updatedConnection.ID // Update by ID
          ? updatedConnection
          : connection
      )
    );
    setSelectedConnection(null); // Clear selection after updating
  };

  const deleteConnection = (applicantId) => {
    setConnections((prevConnections) =>
      prevConnections.filter(connection => connection.ID !== applicantId) // Delete by ID
    );
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  // Aggregate connection statuses by month for 2021 (Approved, Pending, Rejected)
  useEffect(() => {
    const statusCountByMonth = {
      January: { Approved: 0, Pending: 0, Rejected: 0 },
      February: { Approved: 0, Pending: 0, Rejected: 0 },
      March: { Approved: 0, Pending: 0, Rejected: 0 },
      April: { Approved: 0, Pending: 0, Rejected: 0 },
      May: { Approved: 0, Pending: 0, Rejected: 0 },
      June: { Approved: 0, Pending: 0, Rejected: 0 },
      July: { Approved: 0, Pending: 0, Rejected: 0 },
      August: { Approved: 0, Pending: 0, Rejected: 0 },
      September: { Approved: 0, Pending: 0, Rejected: 0 },
      October: { Approved: 0, Pending: 0, Rejected: 0 },
      November: { Approved: 0, Pending: 0, Rejected: 0 },
      December: { Approved: 0, Pending: 0, Rejected: 0 },
    };

    connections.forEach(conn => {
      const applicationDate = new Date(conn.Date_of_Application);
      const year = applicationDate.getFullYear();
      const month = applicationDate.toLocaleString('default', { month: 'long' });

      if (year === 2021 && conn.Status in statusCountByMonth[month]) {
        statusCountByMonth[month][conn.Status] += 1;
      }
    });

    const months = Object.keys(statusCountByMonth);
    const approvedData = months.map(month => statusCountByMonth[month].Approved);
    const pendingData = months.map(month => statusCountByMonth[month].Pending);
    const rejectedData = months.map(month => statusCountByMonth[month].Rejected);

    setChartData({
      labels: months,
      datasets: [
        {
          label: 'Approved',
          data: approvedData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Pending',
          data: pendingData,
          backgroundColor: 'rgba(255, 205, 86, 0.6)',
        },
        {
          label: 'Rejected',
          data: rejectedData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    });
  }, [connections]);

  return (
    <div className="container">
      <h1>Electricity Connections</h1>
      <button onClick={toggleChart} style={{ margin: '20px 0', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>

      {/* Render the chart conditionally */}
      {showChart && (
        <div>
          <h2>Connection Status per Month for 2021</h2>
          {chartData.labels && chartData.labels.length > 0 ? (
            <Bar data={chartData} options={{ plugins: { legend: { position: 'top' } } }} />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </div>
      )}
      <AddUserForm addConnection={addConnection} />
      <div style={{ marginBottom: '20px' }}>
        <span>Filter by date range    </span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
      </div>

      {/* Search input */}
      <span>Filter by ID   </span>
      <input
        type="text"
        
        placeholder="Search by Applicant ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Edit Connection Form */}
      {selectedConnection && (
        <EditConnection
          selectedConnection={selectedConnection}
          updateConnection={updateConnection}
          onDelete={deleteConnection}
        />
      )}

      <ConnectionTable
        connections={filteredConnections}
        onEdit={setSelectedConnection}
      />




    </div>
  );
};


export default Home;