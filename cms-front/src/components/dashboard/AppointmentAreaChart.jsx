"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function AppointmentAreaChart() {
  const [chartData, setChartData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8000/appointment/AppointmentsByMonth/");
      const data = await response.json();

      // Format data to match the Area Chart structure
      const formattedData = Object.entries(data).map(([month, totalAppointments]) => ({
        month,
        appointments: totalAppointments,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const chartConfig = {
    appointments: {
      label: "Total Appointments",
      color: "#2563eb", // Blue color
    },
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Monthly Appointments</CardTitle>
        <CardDescription>Showing total appointments for the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>  {/* Increased height */}
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis allowDecimals={false} />
              <Tooltip content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="appointments"
                type="monotone"
                stroke={chartConfig.appointments.color}
                fillOpacity={0.3}
                fill={chartConfig.appointments.color}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {chartData.length > 0 ? `${chartData[0].month} - ${chartData[chartData.length - 1].month} 2024` : "Loading..."}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
