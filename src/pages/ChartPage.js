// src/pages/ChartPage.js

import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = ({ users }) => {
  // State to manage selected status for filtering
  const [selectedStatus, setSelectedStatus] = useState('All');

  /**
   * Parses a date string in "dd/mm/yyyy" or "dd/mm/yy" format to a JavaScript Date object.
   * @param {string} dateString - The date string to parse.
   * @returns {Date|null} - The parsed Date object or null if invalid.
   */
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    let [day, month, year] = parts;
    day = parseInt(day, 10);
    month = parseInt(month, 10) - 1; // Months are zero-based in JS
    year = parseInt(year, 10);
    if (year < 100) {
      year += 2000; // Assuming years are from 2000 onwards
    }
    return new Date(year, month, day);
  };

  /**
   * Aggregates the number of connection requests per month based on their status.
   * @returns {object} - An object containing monthly data segmented by status.
   */
  const getMonthlyData = () => {
    const monthlyData = {
      Pending: Array(12).fill(0),
      Approved: Array(12).fill(0),
      Rejected: Array(12).fill(0),
    };

    users.forEach((user) => {
      const applicationDate = parseDate(user.Date_of_Application);
      if (applicationDate) {
        const month = applicationDate.getMonth(); // 0-11
        if (user.Status === 'Pending') {
          monthlyData.Pending[month]++;
        } else if (user.Status === 'Approved') {
          monthlyData.Approved[month]++;
        } else if (user.Status === 'Rejected') {
          monthlyData.Rejected[month]++;
        }
      }
    });

    return monthlyData;
  };

  /**
   * Aggregates the overall distribution of connection request statuses.
   * @returns {object} - An object containing counts for each status.
   */
  const getStatusDistribution = () => {
    const statusCount = {
      Pending: 0,
      Approved: 0,
      Rejected: 0,
    };

    users.forEach((user) => {
      if (user.Status in statusCount) {
        statusCount[user.Status]++;
      }
    });

    return statusCount;
  };

  const monthlyData = getMonthlyData();
  const statusDistribution = getStatusDistribution();

  // Prepare data for Bar Chart
  const barChartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Pending',
        data: monthlyData.Pending,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Approved',
        data: monthlyData.Approved,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Rejected',
        data: monthlyData.Rejected,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Prepare data for Pie Chart
  const pieChartData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        label: 'Status Distribution',
        data: [
          statusDistribution.Pending,
          statusDistribution.Approved,
          statusDistribution.Rejected,
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for better aesthetics
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Connection Requests by Status',
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Overall Status Distribution',
      },
    },
  };

  /**
   * Handles the change in status filter.
   * @param {Event} e - The change event.
   */
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };


  const getFilteredBarChartData = () => {
    if (selectedStatus === 'All') {
      return barChartData;
    }

    // Filter datasets based on selected status
    const filteredData = {
      ...barChartData,
      datasets: barChartData.datasets.filter((dataset) => dataset.label === selectedStatus),
    };

    return filteredData;
  };

  return (
    <div className="chart-page">
      <h2>Data Visualizations</h2>
      <div className="filter-container">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="charts-container">
        <div className="chart-item">
          <Bar data={getFilteredBarChartData()} options={barChartOptions} />
        </div>
        <div className="chart-item">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;