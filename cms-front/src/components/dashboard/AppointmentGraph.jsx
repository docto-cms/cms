import React from 'react';

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AppointmentGraph() {
  // Define chart data
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Appointments",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4, // Curves the line
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Appointments over time",
      },
    },
  };

  return (
    <div  className="p-4 bg-white rounded shadow-md w-[100%] h-[500px] my-8 " style={{
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1), 0 -3px 6px rgba(0, 0, 0, 0.05)",
      }}>
      <Line data={data} options={options} />
    </div>
  );
}
