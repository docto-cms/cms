import React, { useState, useEffect } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PatientGraph() {
  const [patientData, setPatientData] = useState([]);
  const [patientsOfMonthData, setPatientsOfMonthData] = useState([]);

  async function fetchData(url, setter) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }

  useEffect(() => {
    fetchData("http://localhost:8000/Patient/patients/", setPatientData);
    fetchData("http://localhost:8000/Patient/NewPatientsOfMonth/", setPatientsOfMonthData);
  }, []);

  const data = {
    labels: ["January"], // You can make this dynamic if needed
    datasets: [
      {
        label: "Total Patients",
        data: [patientData.length],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "New Patients",
        data: [patientsOfMonthData.length],
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
        text: "Patients Data",
      },
    },
  };

  return (
    <div
      className="p-4 bg-white rounded w-full h-[500px] my-8"
      style={{
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1), 0 -3px 6px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}
