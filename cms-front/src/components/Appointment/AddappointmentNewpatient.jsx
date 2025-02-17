import React, { useState, useEffect } from "react";
import axios from "axios";

const AddappointmentNewpatient = () => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [fetchError, setFetchError] = useState(null);
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

    // Clear the error for the field being edited
    if (name.startsWith("Patient.")) {
      const field = name.split(".")[1];
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
      setFormData((prev) => ({
        ...prev,
        Patient: {
          ...prev.Patient,
          [field]: inputValue,
        },
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setFormData((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.Patient.FirstName.match(/^[A-Za-z]+$/)) {
      newErrors.FirstName = "Please enter a valid first name";
    }
    if (!formData.Patient.LastName.match(/^[A-Za-z]+$/)) {
      newErrors.LastName = "Please enter a valid last name";
    }
    if (!formData.Patient.Email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.Email = "Invalid email address";
    }
    if (!formData.Patient.PhoneNumber.match(/^\d{10}$/)) {
      newErrors.PhoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.Patient.Age || isNaN(formData.Patient.Age) || formData.Patient.Age <= 0) {
      newErrors.Age = "Please enter a valid age";
    }
    if (!formData.Patient.Gender) {
      newErrors.Gender = "Please select a gender";
    }
    if (!formData.Patient.City.trim()) {
      newErrors.City = "City is required";
    }
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAppointment = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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

  return (
    <div className="flex">
      <div className="w-full bg-white">
        <form className="space-y-4" onSubmit={handleSaveAppointment}>
          <div className="grid grid-cols-2 gap-4">
            {/* Patient Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Patient Name
              </label>
              <input
                type="text"
                name="Patient.FirstName"
                value={formData.Patient.FirstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm"
              />
              {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
            </div>

            <div>
              <input
                type="text"
                name="Patient.LastName"
                value={formData.Patient.LastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="mt-6 w-full border rounded-md px-3 py-2 shadow-sm"
              />
              {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="Patient.Email"
                value={formData.Patient.Email}
                onChange={handleInputChange}
                placeholder="Email"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm"
              />
              {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile No
              </label>
              <input
                type="tel"
                name="Patient.PhoneNumber"
                value={formData.Patient.PhoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm"
              />
              {errors.PhoneNumber && <p className="text-red-500 text-sm">{errors.PhoneNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="Patient.Age"
                value={formData.Patient.Age}
                onChange={handleInputChange}
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm"
              />
              {errors.Age && <p className="text-red-500 text-sm">{errors.Age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm"
                name="Patient.Gender"
                value={formData.Patient.Gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.Gender && <p className="text-red-500 text-sm">{errors.Gender}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="Patient.City"
                value={formData.Patient.City}
                onChange={handleInputChange}
                placeholder="City"
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm"
              />
              {errors.City && <p className="text-red-500 text-sm">{errors.City}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Doctor
              </label>
              <select
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm"
                name="Doctor"
                value={formData.Doctor}
                onChange={handleInputChange}
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
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Appointment
              </label>
              <input
                type="datetime-local"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
                className="w-full mt-1 border rounded-md px-3 py-2"
              />
              {errors.Date && <p className="text-red-500 text-sm">{errors.Date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <select
                name="Duration"
                value={formData.Duration}
                onChange={handleInputChange}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm"
              >
                <option value="">Select Duration</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
              {errors.Duration && <p className="text-red-500 text-sm">{errors.Duration}</p>}
            </div>

            <div className="flex items-center gap-2 mt-7">
              <input
                type="checkbox"
                name="Repeat"
                checked={formData.Repeat}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Repeat</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Treatment
            </label>
            <input
              type="text"
              name="Treatment"
              value={formData.Treatment}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm"
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              placeholder="Notes"
              name="Notes"
              value={formData.Notes}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Google Meet URL
            </label>
            <input
              type="text"
              name="GoogleMeetLink"
              value={formData.GoogleMeetLink}
              onChange={handleInputChange}
              placeholder="https://meet.google.com/xyz-abc-def"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-6 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddappointmentNewpatient;