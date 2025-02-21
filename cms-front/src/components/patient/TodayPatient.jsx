import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import PropTypes from "prop-types";

export default function TodayPatient() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [missedAppointmentData, setMissedAppointmentData] = useState([]);
  const [upComingAppointmentsData, setUpComingAppointmentsData] = useState([]);
  const [upComingAppointmentsWeek, setUpComingAppointmentsWeek] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("appointment");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const initialStatus = location.state?.selectedStatus || "appointment";
  useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [initialStatus]);

  async function fetchData(url, setter) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Fetch doctors, patient data, and today's appointments
  useEffect(() => {
    fetchData("http://localhost:8000/Patient/doctor/", setDoctors);
    fetchData("http://localhost:8000/Patient/patients/", setPatientData);
    fetchData("http://localhost:8000/appointment/appointmentbydate/", setAppointments);
    fetchData("http://localhost:8000/appointment/MissedAppointments/", setMissedAppointmentData);
    fetchData("http://localhost:8000/appointment/UpComingAppointmentsToday/", setUpComingAppointmentsData);
    fetchData("http://localhost:8000/appointment/upcomingappointmentsWeek/", setUpComingAppointmentsWeek);
  }, []);

  // Filter appointments based on selected doctor and status
  useEffect(() => {
    let filtered = appointments;

    if (selectedDoctor) {
      filtered = filtered.filter(appointment => appointment.Doctor === parseInt(selectedDoctor));
    }

    if (selectedStatus === "UpComingAppointments") {
      filtered = upComingAppointmentsData;
    } else if (selectedStatus === "missedAppointment") {
      filtered = missedAppointmentData;
    }else if (selectedStatus === "UpComingAppointmentsWeek") {
      filtered = upComingAppointmentsWeek;
    }

    const enrichedAppointments = filtered.map(appointment => {
      const patient = patientData.find(p => p.RegistrationId == appointment.RegistrationId);
      return {
        ...appointment,
        Name: patient ? `${patient.FirstName} ${patient.LastName}` : "Unknown",
        Referral: patient ? patient.RefferedBy : "N/A"
      };
    });

    setFilteredAppointments(enrichedAppointments);
    setCurrentPage(1); // Reset to the first page when filtering changes
  }, [selectedDoctor, selectedStatus, appointments, patientData, upComingAppointmentsData, missedAppointmentData]);

  // Filter appointments based on search term
  const searchedAppointments = filteredAppointments.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      appointment.Name.toLowerCase().includes(searchLower) ||
      appointment.RegistrationId.toString().includes(searchTerm.toString())
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedAppointments.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 bg-gray-100 min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">Patients</h1>
        <div className="text-sm text-gray-500 mt-1">
          <a href="#" className="text-blue-500">
            Home
          </a>{" "}
          / Patients
        </div>
      </div>
      {/* Filters Section */}
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            name="Doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstname} {doctor.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="appointment">Appointment</option>
            <option value="UpComingAppointments">UpComingAppointments</option>
            <option value="missedAppointment">MissedAppointment</option>
          </select>
        </div>
      </div>
      {/* Table Section */}
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 text-sm">Show</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-gray-700 text-sm">entries</span>
          </div>
          <div>
            <label className="text-gray-700 text-sm mr-2">Search:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Scrollable Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-300 min-w-full outline 2">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="border p-2">Registration Id</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Doctor Name</th>
                <th className="border p-2">Referral</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">Duration</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {currentItems.length > 0 ? (
                currentItems.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="border p-2">{appointment.RegistrationId}</td>
                    <td className="border p-2">{appointment.Name}</td>
                    <td className="border p-2">
                      {doctors.find((doc) => doc.id === appointment.Doctor)?.firstname}{" "}
                      {doctors.find((doc) => doc.id === appointment.Doctor)?.lastname}
                    </td>
                    <td className="border p-2">{appointment.Referral}</td>
                    <td className="border p-2">{new Date(appointment.Date).toLocaleString()}</td>
                    <td className="border p-2">{appointment.Duration} minutes</td>
                    <td className="border p-2">{appointment.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border p-2 text-center" colSpan="7">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 text-gray-700 text-sm">
            <span>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, searchedAppointments.length)} of{" "}
              {searchedAppointments.length} entries
            </span>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200 disabled:opacity-50"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 border border-gray-300 rounded-md bg-gray-200 disabled:opacity-50"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(searchedAppointments.length / itemsPerPage)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TodayPatient.propTypes = {
  doctors: PropTypes.array,
  patientData: PropTypes.array,
  appointments: PropTypes.array,
  filteredAppointments: PropTypes.array,
  missedAppointmentData: PropTypes.array,
  upComingAppointmentsData: PropTypes.array,
  selectedDoctor: PropTypes.string,
  selectedStatus: PropTypes.string,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
};