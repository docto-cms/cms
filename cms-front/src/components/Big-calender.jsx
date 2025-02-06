import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Initialize Moment.js localizer
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // Initial event state
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Meeting with Team",
      start: new Date(2025, 1, 5, 10, 0),
      end: new Date(2025, 1, 5, 11, 0),
    },
    {
      id: 2,
      title: "Lunch with Client",
      start: new Date(2025, 1, 6, 12, 30),
      end: new Date(2025, 1, 6, 13, 30),
    },
  ]);

  // Handle selecting a date/time to add a new event
  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter event title:");
    if (title) {
      const newEvent = { id: events.length + 1, title, start, end };
      setEvents([...events, newEvent]);
    }
  };

  // Handle event selection
  const handleSelectEvent = (event) => {
    alert(`Event: ${event.title}`);
  };

  return (
    <div style={{ height: "600px", padding: "20px" }} className="bg-white">
     
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={["month", "week", "day", "agenda"]}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
