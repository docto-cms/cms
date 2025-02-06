import React from 'react';
import { useState } from "react";

export default function AppointmentCalender() {
    const [dateRange, setDateRange] = useState("Jan 28 - 31, 2025");
    const [view, setView] = useState("4 days");
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1));
    const [selectedDate, setSelectedDate] = useState(null);
  
    const timeSlots = [];
    for (let h = 9; h <= 15; h++) {
      for (let m = 0; m < 60; m += 15) {
        const time = `${h}:${m === 0 ? "00" : m}`;
        timeSlots.push(time);
      }
    }
  
    const changeDateRange = (direction) => {
      const [startDateStr] = dateRange.split(" - ");
      const startDate = new Date(startDateStr + ", 2025");
    
      let newStartDate = new Date(startDate);
      let newEndDate = new Date(startDate);
    
      const increment = direction === "next" ? 1 : -1; // Determines whether to move forward or backward
    
      switch (view) {
        case "4 days":
          newStartDate.setDate(newStartDate.getDate() + increment * 4);
          newEndDate.setDate(newStartDate.getDate() + 3);
          break;
        case "week":
          newStartDate.setDate(newStartDate.getDate() + increment * 7);
          newEndDate.setDate(newStartDate.getDate() + 6);
          break;
        case "month":
          newStartDate.setMonth(newStartDate.getMonth() + increment);
          newStartDate.setDate(1);
          newEndDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0);
          setCurrentMonth(newStartDate); // Update the current month
          break;
        case "day":
          newStartDate.setDate(newStartDate.getDate() + increment);
          newEndDate = new Date(newStartDate);
          setSelectedDate(newStartDate);
          break;
        case "list week":
          newStartDate.setDate(newStartDate.getDate() + increment * 7);
          newEndDate.setDate(newStartDate.getDate() + 6);
          break;
        default:
          return;
      }
    
      const newDateRange = `${newStartDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${newEndDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      setDateRange(newDateRange);
    };
    
  
    const changeView = (newView) => {
      setView(newView);
  
      const [startDate] = dateRange.split(" - ");
      const start = new Date(startDate + ", 2025");
  
      let newStartDate = new Date(start);
      let newEndDate = new Date(start);
  
      switch (newView) {
        case "4 days":
          newEndDate.setDate(newStartDate.getDate() + 3);
          break;
        case "week":
          newStartDate.setDate(start.getDate() - start.getDay());
          newEndDate.setDate(newStartDate.getDate() + 6);
          break;
        case "month":
          newStartDate = new Date(start.getFullYear(), start.getMonth(), 1);
          newEndDate = new Date(start.getFullYear(), start.getMonth() + 1, 0);
          break;
        case "day":
          const today = new Date();
          setSelectedDate(today);
          newEndDate = new Date(today);
          break;
        case "list week":
          newEndDate.setDate(newStartDate.getDate() + 6);
          break;
        default:
          return;
      }
  
      const newDateRange = `${newStartDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${newEndDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      setDateRange(newDateRange);
    };
  
    const generateDays = () => {
      const [startDate] = dateRange.split(" - ");
      const start = new Date(startDate + ", 2025");
  
      if (view === "day" && dateRange === "Jan 28 - 28, 2025") {
        return [start];
      }
  
      if (view === "month") {
        const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const days = [];
  
        let day = new Date(startOfMonth);
        day.setDate(day.getDate() - day.getDay());
  
        while (days.length < 42) {
          days.push(new Date(day));
          day.setDate(day.getDate() + 1);
        }
  
        return days;
      }
  
      const days = [];
      for (let i = 0; i < (view === "week" ? 7 : 4); i++) {
        const newDay = new Date(start);
        newDay.setDate(start.getDate() + i);
        days.push(newDay);
      }
  
      return days;
    };
  
    const handleDayClick = (day) => {
      const selectedDay = new Date(day);
      selectedDay.setHours(0, 0, 0, 0); // Reset time to midnight
  
      setSelectedDate(selectedDay); // Set the selected date
      setView("day"); // Switch to day view
      setDateRange(`${selectedDay.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`); // Update date range
    };
  
    return (
      <div className="p-4 m-15  max-w-4xl w-full mx-auto bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={() => changeDateRange("prev")} className="bg-blue-500 border p-2 rounded">&lt;</button>
            <span className="text-lg font-semibold">
              {view === "day" && selectedDate
                ? `${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                : view === "month"
                ? `${currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
                : dateRange}
            </span>
            <button onClick={() => changeDateRange("next")} className="bg-blue-500 border p-2 rounded">&gt;</button>
          </div>
          <div>
            <button onClick={() => changeView("4 days")} className={`bg-blue-500 text-white border p-2 rounded ${view === "4 days" ? "bg-blue-700" : ""}`}>4 days</button>
            <button onClick={() => changeView("week")} className={`bg-blue-500 text-white border p-2 rounded ${view === "week" ? "bg-blue-700" : ""}`}>Week</button>
            <button onClick={() => changeView("month")} className={`bg-blue-500 text-white border p-2 rounded ${view === "month" ? "bg-blue-700" : ""}`}>Month</button>
            <button onClick={() => changeView("day")} className={`bg-blue-500 text-white border p-2 rounded ${view === "day" ? "bg-blue-700" : ""}`}>Day</button>
          </div>
        </div>
  
        {view === "month" ? (
          <div className="grid grid-cols-7 mt-4 border border-gray-100  max-h-80 overflow-y-scroll divide-x divide-gray-100">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
              <div key={i} className="p-4 bg-gray-100 text-center font-semibold">{day}</div>
            ))}
            {generateDays().map((day, i) => (
              <div
                key={i}
                onClick={() => handleDayClick(day)} // This will trigger the day view and set the selected date
                className={`p-5 text-center ${day.getMonth() !== currentMonth.getMonth() ? "text-gray-400 border-b-2 " : "text-black cursor-pointer border-b-2 "}`}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        ) : view === "day" && selectedDate ? (
          <div className="mt-4 border border-gray-300">
    <h3 className="text-xl font-semibold text-center bg-gray-100 p-4">
      {selectedDate.toLocaleDateString("en-US", { 
        weekday: "long", 
        month: "long", 
        day: "numeric", 
        year: "numeric" 
      })}
    </h3>
    <div className=" grid grid-cols-[1fr_3fr] border-t divide-gray-300 border-gray-100 max-h-80 overflow-y-scroll">
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <div className="border-b border-r border-gray-300 p-5 text-center">{time}</div>
          <div className="border-b border-gray-300 p-4 text-left"></div>
        </React.Fragment>
      ))}
    </div>
  </div>
  
        
        ) : (
          <div className={`grid ${view === "week" ? "grid-cols-8"  : "grid-cols-5"} mt-4 border border-gray-300 divide-x divide-gray-300 max-h-80  overflow-y-scroll`}>
            <div className="p-2 bg-gray-100 text-center font-semibold">Time</div>
            {generateDays().map((day, i) => (
              <div key={i} className="p-3 bg-gray-100 text-center font-semibold">
                {day.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" })}
              </div>
            ))}
            {timeSlots.map((time, timeIndex) => (
    <React.Fragment key={time}>
      <div className=" text-center p-2 text-sm">{time}</div>
      {generateDays().map((_, dayIndex) => (
        <div key={`${time}-${dayIndex}`} className=" p-2 h-16 relative">
          {timeIndex === 2 && dayIndex === 2 && ( // 9:30 AM on Tuesday
            <div className="absolute top-0 left-0 w-full h-full bg-green-500 text-white rounded-md text-xs flex items-center justify-center text-center">
              9:30 - 10:00 AM Meeting
            </div>
          )}
        </div>
      ))}
    </React.Fragment>
  ))}
  
          </div>
        )}
      </div>
    );
  }
