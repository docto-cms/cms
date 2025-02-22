"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
        setter(data.length); // Store only count
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    }

    fetchData("http://localhost:8000/Patient/patients/", setTotalPatients);
    fetchData("http://localhost:8000/Patient/todayspatients/", setTodayPatients);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setCurrentMonth(monthNames[new Date().getMonth()]);
  }, []);

  const chartData = [
    {
      month: currentMonth,
      totalPatients,
      todayPatients,
    },
  ];

  const chartConfig = {
    totalPatients: { label: "Total Patients", color: "#2563eb" },
    todayPatients: { label: "Today's Patients", color: "#60a5fa" },
  };

  return (
    <Card className="w-full min-w-[300px] flex flex-col shadow-md ">
      <CardHeader>
        <CardTitle>Monthly Patient Data</CardTitle>
        <CardDescription>{currentMonth} 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full">
          <div className="w-full h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, bottom: 20 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="totalPatients" fill={chartConfig.totalPatients.color} radius={8}>
                  <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                </Bar>
                <Bar dataKey="todayPatients" fill={chartConfig.todayPatients.color} radius={8}>
                  <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing patient data for {currentMonth}.</div>
      </CardFooter>
    </Card>
  );
}
