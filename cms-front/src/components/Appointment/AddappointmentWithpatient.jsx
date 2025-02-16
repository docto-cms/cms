import React, { useState, useEffect } from "react";
import axios from "axios";
import AddappointmentNewpatient from "./AddappointmentNewpatient";

const AddappointmentWithpatient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [switchAppointment, setSwitchAppointment] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [patientsDetails, setPatientsDetails] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    Patient: {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Email: "",
      Age: "",
      Gender: "",
      City: "",
    },
    Doctor: "",
    Date: "",
    Duration: "",
    Repeat: false,
    Treatment: "",
    AppointmentType: "",
    Notes: "",
    GoogleMeetLink: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name.startsWith("Patient.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        Patient: {
          ...prev.Patient,
          [field]: inputValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    }
  };

  const validateAppointmentFields = () => {
    let newErrors = {};

    if (!formData.Doctor) {
      newErrors.Doctor = "Please select a doctor";
    }

    if (!formData.Date) {
      newErrors.Date = "Please select a date";
    }

    if (!formData.Duration) {
      newErrors.Duration = "Please select a duration";
    }

    if (!formData.AppointmentType) {
      newErrors.AppointmentType = "Please select an appointment type";
    }

    setErrors(newErrors);
    console.log("Validation Errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAppointment = async (e) => {
    e.preventDefault();

    if (!validateAppointmentFields()) {
      alert("Please fix the errors in the Appointment fields before submitting.");
      return;
    }

    try {
      const requestData = {
        ...formData,
        Doctor: Number(formData.Doctor),
        Duration: Number(formData.Duration),
        Patient: {
          ...formData.Patient,
          Age: Number(formData.Patient.Age) || 0,
        },
        Date: new Date(formData.Date).toISOString(),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/appointment/appointments/",
        requestData
      );

      console.log("Response:", response.data);
      alert("Appointment Scheduled");
    } catch (error) {
      console.error(
        "Error Adding Appointment:",
        error.response?.data || error.message
      );
      alert(
        `Error: ${JSON.stringify(
          error.response?.data || "Something went wrong"
        )}`
      );
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/Patient/doctor/");
        setDoctors(res.data);
        setLoadingDoctors(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setFetchError("Failed to fetch doctors");
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Patient/patients/");
        setPatientsDetails(response.data);
      } catch (error) {
        console.error("Error fetching Patient Name:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData((prev) => ({
      ...prev,
      Patient: {
        FirstName: patient.FirstName,
        LastName: patient.LastName,
        PhoneNumber: patient.PhoneNumber,
        Email: patient.Email,
        Age: patient.Age,
        Gender: patient.Gender,
        City: patient.City,
      },
    }));
    setSearchQuery(`${patient.FirstName} ${patient.LastName}`);
    setShowDropdown(false);
  };

  const filteredPatients = patientsDetails.filter((patient) =>
    `${patient.FirstName} ${patient.LastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-full bg-white shadow-md rounded-lg p-6 m-6">
      <div className="w-full max-w-3xl border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">New Appointments</h2>
        <div className="flex gap-4 mt-2">
          <button
            className={`text-blue-500 font-medium ${
              switchAppointment ? "" : "border-b-2 border-blue-500"
            }`}
            onClick={() => setSwitchAppointment(false)}
          >
            New Patient
          </button>
          <button
            className={`text-blue-500 font-medium ${
              switchAppointment ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setSwitchAppointment(true)}
          >
            With Patient
          </button>
        </div>
      </div>
      {switchAppointment ? (
        <div className="space-y-4">
          {/* Patient Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PATIENT
            </label>
            <input
              type="text"
              name="Patient"
              value={searchQuery}
              placeholder="Search Patient Name"
              onChange={handleSearchChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && showDropdown && (
              <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-md max-h-40 overflow-auto">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <div
                      key={patient.RegistrationId}
                      onClick={() => handleSelectPatient(patient)}
                      className="p-2 hover:bg-blue-100 cursor-pointer text-sm"
                    >
                      {patient.FirstName} {patient.LastName} - {patient.PhoneNumber}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No matching patients found</div>
                )}
              </div>
            )}
          </div>
          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={handleInputChange}
              name="Doctor"
              value={formData.Doctor}
            >
              <option value="">Select Doctor</option>
              {loadingDoctors && <option>Loading doctors...</option>}
              {fetchError && <option>{fetchError}</option>}
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.firstname} {doctor.lastname}
                </option>
              ))}
            </select>
            {errors.Doctor && <p className="text-red-500 text-sm">{errors.Doctor}</p>}
          </div>
          {/* Date, Duration, Repeat */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Appointment
              </label>
              <input
                type="datetime-local"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.Date && <p className="text-red-500 text-sm">{errors.Date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <select
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
                name="Duration"
                onChange={handleInputChange}
                value={formData.Duration}
              >
                <option value="" disabled>
                  0
                </option>
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
              {errors.Duration && <p className="text-red-500 text-sm">{errors.Duration}</p>}
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                onChange={handleInputChange}
                value="repeat"
                name="Repeat"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Repeat</label>
            </div>
          </div>
          {/* Treatment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Treatment
            </label>
            <input
              type="text"
              name="Treatment"
              placeholder="Treatment"
              value={formData.Treatment}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Appointment Type
            </label>
            <div className="flex gap-4 mt-2">
              {["In-Person", "Phone/Online", "Walkin"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="AppointmentType"
                    value={type}
                    checked={formData.AppointmentType === type}
                    onChange={handleInputChange}
                  />
                  {type}
                </label>
              ))}
              {errors.AppointmentType && <p className="text-red-500 text-sm">{errors.AppointmentType}</p>}
            </div>
          </div>
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              placeholder="Notes"
              name="Notes"
              value={formData.Notes}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Google Meet URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Google meet url <span className="text-blue-500">Google meet</span>
            </label>
            <input
              type="text"
              name="GoogleMeetLink"
              placeholder="Google meet url"
              value={formData.GoogleMeetLink}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
            <button
              type="submit"
              onClick={handleSaveAppointment}
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <AddappointmentNewpatient />
      )}
    </div>
  );
};

export default AddappointmentWithpatient;