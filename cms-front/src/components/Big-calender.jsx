import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

// Initialize Moment.js localizer
const localizer = momentLocalizer(moment);

const MyCalendar = ({id}) => {
  // Initial event state
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/appointment/upcomingappointmentsWeek/");
        const data = response.data;
       
  
        // Transform API data into calendar event format
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.PatientName, // Use "Treatment" as the title
          start: new Date(event.Date), // Convert string to Date object
          end: new Date(new Date(event.Date).getTime() + event.Duration * 60000) // Add duration
        }));
  
        setEvents(formattedEvents);
      } catch (error) {
        console.error(`Error fetching data:`, error);
      }
    }
    fetchData();
  }, []);
  


  const [events, setEvents] = useState([]);



  return (
    <div style={{ height: "600px", padding: "20px" }} className="bg-white">
     
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        views={["month", "week", "day", "agenda"]}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
