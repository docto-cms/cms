"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb", // Blue
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa", // Light Blue
  },
}

export default function AppointmentChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-[50%]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
          <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
