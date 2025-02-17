import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AppointmentGraph() {
  const [appointmentsByMonth, setAppointmentsByMonth] = useState({});

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8000/appointment/AppointmentsByMonth/');
      const data = await response.json();
      setAppointmentsByMonth(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const labels = [
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
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Appointments',
        data: labels.map((month) => appointmentsByMonth[month] || 0),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4, // Curves the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Appointments Over Time',
      },
    },
  };

  return (
    <div
      className="p-4 bg-white rounded shadow-md w-full h-[500px] my-8"
      style={{
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1), 0 -3px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}
