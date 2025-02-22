import React, { useEffect, useState } from 'react';
import Patientprofile from "./Patientprofile";
import AddPatient from './AddPatient';
import axios from 'axios';

const initialPatientState = {
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  Email: "",
  Age: "",
  Gender: "",
  City: "",
  Doctor: "",
  RefferedBy: "",
  FeeType: ""
};

export default function WithPatient() {
  const [isWithPatient, setIsWithPatient] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [newPatient, setNewPatient] = useState(initialPatientState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Patient/patients/");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchData();
  }, [isupdated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePatient = async (e) => {
    e.preventDefault();

    if (!newPatient.FirstName || !newPatient.PhoneNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (selectedPatientId) {
        await axios.put(`http://127.0.0.1:8000/Patient/patients/${selectedPatientId}/`, newPatient);
        alert("Patient updated successfully!");
      } else {
        await axios.post("http://127.0.0.1:8000/Patient/patients/", newPatient);
        alert("Patient saved successfully!");
      }
      setisupdated(!isupdated);
      setNewPatient(initialPatientState);
      setSelectedPatientId(null);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleSelectPatient = (e) => {
    const selectedId = Number(e.target.value);
    setSelectedPatientId(selectedId);

    const selectedPatient = patients.find((patient) => patient.RegistrationId === selectedId);
    setNewPatient(selectedPatient || initialPatientState);
  };

  return (
    <div className="flex  items-center h-screen ">
      <div className="bg-white shadow-2xl p-8 w-full ">
        <div className="flex gap-8 mb-6">
          <button
            type="button"
            className={`px-4 py-2 font-semibold ${!isWithPatient ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"}`}
            onClick={() => setIsWithPatient(false)}
          >
            New Patient
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-semibold ${isWithPatient ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"}`}
            onClick={() => setIsWithPatient(true)}
          >
            With Patient
          </button>
        </div>

        {isWithPatient ? (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select Existing Patient
            </label>
            <select
              className="p-3 border border-gray-300 rounded-lg w-full"
              value={selectedPatientId || ""}
              onChange={handleSelectPatient}
            >
              <option value="" disabled>
                -- Select --
              </option>
              {patients.map((patient) => (
                <option key={patient.RegistrationId} value={patient.RegistrationId}>
                  {patient.FirstName} {patient.LastName}
                </option>
              ))}
            </select>

            {selectedPatientId && (
              <Patientprofile
                doctors={doctors}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                patient={patients.find((patient) => patient.RegistrationId === selectedPatientId)}
                onSaveChanges={handleSavePatient}
              />
            )}
          </div>
        ) : (
          <AddPatient
            doctors={doctors}
            setDoctors={setDoctors}
            newPatient={newPatient}
            handleInputChange={handleInputChange}
            handleSavePatient={handleSavePatient}
            isupdated={isupdated}
            setisupdated={setisupdated}
          />
        )}
      </div>
    </div>
  );
}