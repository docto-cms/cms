import React, { useState, useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md";

export default function SearchPatient() {
  const [patientData, setPatientData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch patient data
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
    }
  }

  useEffect(() => {
    fetchData("http://localhost:8000/Patient/doctor/", setDoctors);
    fetchData("http://localhost:8000/Patient/patients/", setPatientData);
  }, []);

  // Confirm delete
  function confirmDelete(id) {
    setDeleteId(id);
    setShowConfirm(true);
  }

  // Delete a patient by RegistrationId
  async function deletePatient() {
    try {
      const response = await fetch(
        `http://localhost:8000/Patient/patients/${deleteId}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchData();
        console.log(`Patient with ID ${deleteId} deleted successfully.`);
      } else {
        console.error(`Failed to delete patient with ID ${deleteId}.`);
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  }

  // Filter patients by selected doctor and search term
  const filteredPatients = patientData.filter((patient) => {
    const matchesDoctor = selectedDoctor
      ? patient.Doctor === parseInt(selectedDoctor)
      : true;
    const matchesSearch = searchTerm
      ? patient.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.PhoneNumber.toString().includes(searchTerm.toString()) ||
        patient.RegistrationId.toString().includes(searchTerm.toString())
      : true;
    return matchesDoctor && matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 relative">
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-medium mb-4">
              Are you sure you want to delete this patient?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deletePatient}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <nav className="text-sm text-gray-600">
          <span className="hover:underline cursor-pointer">Home</span> /{" "}
          <span>Patients</span>
        </nav>
      </div>

      {showFilter && (
        <div className="bg-white p-4 shadow rounded mb-6 relative">
          <button
            onClick={() => setShowFilter(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 absolute top-2 right-2"
          >
            Hide
          </button>
          <h2 className="text-lg font-medium mb-4">Filter Patients</h2>
          <div className="grid grid-cols-7 gap-4">
            <select
              className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">All Doctors</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.firstname} {doctor.lastname}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by name, email, or phone"
              className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="bg-white p-4 shadow rounded mb-6">
        <h3 className="text-lg font-medium mb-4">List of Patients</h3>
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <label className="mr-2 text-gray-600">Show</label>
              <select
                className="border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="ml-2 text-gray-600">entries</span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowFilter(true)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Filter
              </button>
              <button
                onClick={fetchData}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Refresh
              </button>
            </div>
          </div>

          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Action
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Basic Info
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((patient) => (
                <tr key={patient.RegistrationId} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => confirmDelete(patient.RegistrationId)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                    >
                      <MdOutlineDelete />
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {patient.FirstName} {patient.LastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Registration ID: {patient.RegistrationId}, Gender:{" "}
                    {patient.Gender}, Age: {patient.Age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Email: {patient.Email}, Phone: {patient.PhoneNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredPatients.length)} of{" "}
              {filteredPatients.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= filteredPatients.length}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
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
