"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import React, { useState, useEffect } from "react";

export default function Rechart() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [todayPatients, setTodayPatients] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    async function fetchData(url, setter) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setter(data.length); // Ensures only the count is stored
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    }

    fetchData("http://localhost:8000/Patient/patients/", setTotalPatients);
    fetchData("http://localhost:8000/Patient/todayspatients/", setTodayPatients);

    // Ensure only one month is set
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setCurrentMonth(monthNames[new Date().getMonth()]);
  }, []);

  const chartData = [
    {
      month: currentMonth, // Only the current month should be in the chart
      totalPatients,
      todayPatients,
    },
  ];

  const chartConfig = {
    totalPatients: { label: "Total Patients", color: "#2563eb" },
    todayPatients: { label: "Today's Patients", color: "#60a5fa" },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-[50%]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalPatients" fill={chartConfig.totalPatients.color} radius={4} />
          <Bar dataKey="todayPatients" fill={chartConfig.todayPatients.color} radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
