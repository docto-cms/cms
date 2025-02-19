import React, { useState, useEffect } from "react";
import { FaUserMd } from "react-icons/fa";
import axios from "axios";
import AddMobileAppointment from "./AddMobileAppointment";

const WebsiteAppointment = () => {
  const [mobileAppointment, setMobileAppointment] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    id: null,
    doctor: "",
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/appointment/mobileappointments");
      setAppointments(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  // Function to fetch doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/Patient/doctor/");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Function to open modify modal and set appointment data
  const openModifyModal = (appointment) => {
    setAppointmentData({
      id: appointment.id, // Include the appointment ID
      doctor: appointment.doctor || "",
      date: appointment.date || "",
    });
    setIsModifyModalOpen(true);
  };

  // Function to close modify modal
  const closeModifyModal = () => {
    setIsModifyModalOpen(false);
  };

  // Handle Accept button click
  const handleAccept = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:8000/appointment/mobileappointments/${appointmentId}`, {
        status: "Accept"
      });
      fetchAppointments(); // Refresh the appointments list
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  // Handle Decline button click
  const handleDecline = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:8000/appointment/mobileappointments/${appointmentId}`, {
        status: "Decline"
      });
      fetchAppointments(); // Refresh the appointments list
    } catch (error) {
      console.error("Error declining appointment:", error);
    }
  };

  // Handle Modify Appointment
  const handleModifyAppointment = async () => {
    try {
      await axios.put(`http://localhost:8000/appointment/mobileappointmentsedit/${appointmentData.id}`, {
        doctor: appointmentData.doctor,
        date: appointmentData.date,
      });
      fetchAppointments(); // Refresh the appointments list
      closeModifyModal(); // Close the modal
    } catch (error) {
      console.error("Error modifying appointment:", error);
    }
  };

  // Fetch appointments and doctors on component mount
  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  // Pagination Logic
  const indexOfLastAppointment = currentPage * entriesPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - entriesPerPage;

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter((appointment) => {
    const fullName = `${appointment.first_name} ${appointment.last_name}`.toLowerCase();
    const doctorName = appointment.doctor.toString().toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      doctorName.includes(searchQuery.toLowerCase())
    );
  });

  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change entries per page
  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="p-4">
      <div className="text-sm text-gray-600 mb-4">Home / <span className="font-medium">Website Appointment</span></div>
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Website Appointment List</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setMobileAppointment(true)}
          >
            Add Mobile Appointment
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="text-sm font-medium">Show</label>
            <select
              id="entries"
              className="border rounded p-1 text-sm"
              value={entriesPerPage}
              onChange={handleEntriesPerPageChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-sm font-medium">entries</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border rounded p-1 text-sm w-40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-600 p-4">Loading appointments...</div>
        ) : (
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2 flex items-center justify-center">
                  <FaUserMd className="mr-1" /> Doctor
                </th>
                <th className="border border-gray-200 p-2">Patient Name</th>
                <th className="border border-gray-200 p-2">Duration</th>
                <th className="border border-gray-200 p-2">Date</th>
                <th className="border border-gray-200 p-2">Treatment</th>
                <th className="border border-gray-200 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.length > 0 ? (
                currentAppointments.map((appointment, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-200 p-2">{appointment.doctor || "N/A"}</td>
                    <td className="border border-gray-200 p-2">{appointment.first_name} {appointment.last_name}</td>
                    <td className="border border-gray-200 p-2">{appointment.duration} min</td>
                    <td className="border border-gray-200 p-2">{appointment.date}</td>
                    <td className="border border-gray-200 p-2">{appointment.treatment}</td>
                    <td className="p-3">
                      <button 
                        onClick={() => handleAccept(appointment.id)} 
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => openModifyModal(appointment)} 
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Modify
                      </button>
                      <button 
                        onClick={() => handleDecline(appointment.id)} 
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-200 p-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>
            Showing {indexOfFirstAppointment + 1} to{" "}
            {Math.min(indexOfLastAppointment, filteredAppointments.length)} of{" "}
            {filteredAppointments.length} entries
          </span>
          <div className="flex space-x-2">
            <button
              className="border px-3 py-1 rounded"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="border px-3 py-1 rounded"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastAppointment >= filteredAppointments.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Open AddMobileAppointment modal and pass fetchAppointments */}
      {mobileAppointment && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <AddMobileAppointment closeMobileAppointment={() => setMobileAppointment(false)} refreshAppointments={fetchAppointments} />
        </div>
      )}
      
      {/* Modify Appointment Modal */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Modify Appointment Details</h3>
            <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={appointmentData.doctor}
              onChange={(e) => setAppointmentData({ ...appointmentData, doctor: e.target.value })}
            >
              {doctors.map((doctor) => (
                <option key={doctor.id} value={`${doctor.firstname} ${doctor.lastname}`}>
                  {`${doctor.firstname} ${doctor.lastname}`}
                </option>
              ))}
            </select>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="datetime-local"
              className="w-full border rounded p-2 mb-4"
              value={appointmentData.date}
              onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={closeModifyModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button 
                onClick={handleModifyAppointment} 
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteAppointment;