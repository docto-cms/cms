import React from "react";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientGraph() {
  const data = {
    labels: ["January"],
    datasets: [
      {
        label: "Total Patients",
        data: [20],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Review Patient",
        data: [10],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "New Patients",
        data: [10],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Patients",
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded  w-[100%] h-[500px] my-8"  style={{
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1), 0 -3px 6px rgba(0, 0, 0, 0.05)",
      }}>
      <Bar options={options} data={data}  />
    </div>
  );
}
