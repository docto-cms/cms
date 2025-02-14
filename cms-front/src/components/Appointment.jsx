import { useState } from "react";
import React from "react";

export default function Calendar() {
  const [dateRange, setDateRange] = useState("Jan 28 - 31, 2025");
  const [view, setView] = useState("4 days"); // Default to '4 days' view
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1)); // Default to January 2025
  const [selectedDate, setSelectedDate] = useState(null); // New state to hold selected date

  // Function to handle date navigation
  const changeDateRange = (direction) => {
    if (view === "month") {
      const newMonth = new Date(currentMonth);
      newMonth.setMonth(currentMonth.getMonth() + (direction === "next" ? 1 : -1));
      setCurrentMonth(newMonth);
      return;
    }

    if (view === "day") {
      const newSelectedDate = new Date(selectedDate);
      newSelectedDate.setDate(selectedDate.getDate() + (direction === "next" ? 1 : -1));
      setSelectedDate(newSelectedDate);
      setDateRange(`${newSelectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
      return;
    }

    const [startDate, endDate] = dateRange.split(" - ");
    const start = new Date(startDate + ", 2025");
    const end = new Date(endDate + ", 2025");

    const newStartDate = new Date(start);
    const newEndDate = new Date(end);

    if (direction === "prev") {
      newStartDate.setDate(start.getDate() - (view === "week" ? 7 : 4));
      newEndDate.setDate(end.getDate() - (view === "week" ? 7 : 4));
    } else if (direction === "next") {
      newStartDate.setDate(start.getDate() + (view === "week" ? 7 : 4));
      newEndDate.setDate(end.getDate() + (view === "week" ? 7 : 4));
    }

    const newDateRange = `${newStartDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${newEndDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;

    setDateRange(newDateRange);
  };

  // Function to set different views (4 days, week, month, day)
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
        newStartDate.setDate(start.getDate() - start.getDay()); // Set start to Sunday of the week
        newEndDate.setDate(newStartDate.getDate() + 6); // Set end to Saturday
        break;
      case "month":
        newStartDate = new Date(start.getFullYear(), start.getMonth(), 1);
        newEndDate = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        break;
      case "day":
        newEndDate = new Date(start);
        break;
      case "list week":
        newEndDate.setDate(newStartDate.getDate() + 6);
        break;
      default:
        return;
    }

    const newDateRange = `${newStartDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${newEndDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
    setDateRange(newDateRange);
  };

  // Generate the list of days for the calendar grid (Full Month)
  const generateDays = () => {
    const [startDate] = dateRange.split(" - ");
    const start = new Date(startDate + ", 2025");

    // If in 'day' view and the range is exactly one day
    if (view === "day" && dateRange === "Jan 28 - 28, 2025") {
      return [start]; // Only return the selected day
    }

    if (view === "month") {
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
      const days = [];

      let day = new Date(startOfMonth);
      day.setDate(day.getDate() - day.getDay()); // Move to the start of the week

      while (days.length < 42) { // Ensures full 6-row grid
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

  // Function to handle day selection
  const handleDayClick = (day) => {
    // Ensure we are working with a clean date without time information
    const selectedDay = new Date(day);
    selectedDay.setHours(0, 0, 0, 0); // Normalize to midnight to avoid time issues

    setSelectedDate(selectedDay);
    changeView("day"); // Switch to 'day' view when a day is clicked
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Left Button */}
          <button onClick={() => changeDateRange("prev")} className="bg-blue-500 border p-2 rounded">
            &lt;
          </button>

          <span className="text-lg font-semibold">
            {view === "day" && selectedDate
              ? `${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
              : view === "month"
              ? `${currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
              : dateRange}
          </span>

          {/* Right Button */}
          <button onClick={() => changeDateRange("next")} className="bg-blue-500 border p-2 rounded">
            &gt;
          </button>
        </div>
        <div>
          <button onClick={() => changeView("4 days")} className={`bg-blue-500 text-white border p-2 rounded ${view === "4 days" ? "bg-blue-700" : ""}`}>4 days</button>
          <button onClick={() => changeView("week")} className={`bg-blue-500 text-white border p-2 rounded ${view === "week" ? "bg-blue-700" : ""}`}>Week</button>
          <button onClick={() => changeView("month")} className={`bg-blue-500 text-white border p-2 rounded ${view === "month" ? "bg-blue-700" : ""}`}>Month</button>
          <button onClick={() => changeView("day")} className={`bg-blue-500 text-white border p-2 rounded ${view === "day" ? "bg-blue-700" : ""}`}>Day</button>
          <button onClick={() => changeView("list week")} className={`bg-blue-500 text-white border p-2 rounded ${view === "list week" ? "bg-blue-700" : ""}`}>List Week</button>
        </div>
      </div>

      {/* Calendar Grid */}
      {view === "month" ? (
        <div className="grid grid-cols-7 mt-4 border border-gray-300 divide-x divide-gray-300">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <div key={i} className="p-2 bg-gray-100 text-center font-semibold">
              {day}
            </div>
          ))}

          {generateDays().map((day, i) => (
            <div
              key={i}
              onClick={() => handleDayClick(day)}
              className={`p-2 text-center ${day.getMonth() !== currentMonth.getMonth() ? "text-gray-400" : "text-black cursor-pointer"}`}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      ) : view === "day" && selectedDate ? (
        <div className="mt-4 p-4 border border-gray-300">
          <h3 className="text-xl font-semibold">
            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </h3>
          <p>Details for {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      ) : (
        <div className={`grid ${view === "week" ? "grid-cols-8" : "grid-cols-5"} mt-4 border border-gray-300 divide-x divide-gray-300`}>
          <div className="p-2 bg-gray-100 text-center font-semibold">Time</div>
          {generateDays().map((day, i) => (
            <div key={i} className="p-2 bg-gray-100 text-center font-semibold">
              {day.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" })}
            </div>
          ))}

          <div className="border-r border-gray-300 p-2 text-sm">6am</div>
          {generateDays().map((_, i) => (
            
            <div key={i} className="border-r border-gray-300 p-2 h-16"></div>
            
          ))}
        </div>
        
      )}
      
    </div>
  );
}
