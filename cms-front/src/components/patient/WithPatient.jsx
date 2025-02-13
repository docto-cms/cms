import React, { useEffect, useState } from 'react';
import Patientprofile from "./Patientprofile";
import AddPatient from './AddPatient';
import axios from 'axios';

export default function WithPatient() {
  const [isWithPatient, setIsWithPatient] = useState(false);

  
  const [isEditing, setIsEditing] = useState(false);
  
  
  const initialPatients = [
    {
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
    }
  ];
  sessionStorage.setItem('hello', 'token')

  

  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState();
  const [newPatient, setNewPatient] = useState({
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
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/Patient/patients/");
      console.log("response:", response.data);
      setPatients(response.data);
    };
    fetchData();
  }, []);

  const [id, setId] = useState();


  useEffect(() => 
    {
      const hi = patients.find((patient) => patient.RegistrationId === selectedPatientId);
      console.log("hi:",hi);
      setId(hi);
    }, [selectedPatientId]);



  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePatient = (e) => {
    e.preventDefault();

    if (!newPatient.FirstName || !newPatient.PhoneNumber) {
      alert("Please fill in all required fields.");
      return;
    }

    if (selectedPatientId) {
      const updatedPatients = patients.map((patient) =>
        patient.RegistrationId === selectedPatientId
          ? { ...patient, ...newPatient }
          : patient
      );
      setPatients(updatedPatients);
      alert("Patient updated successfully!");
    } else {
      const newPatientWithId = {
        ...newPatient,
        RegistrationId: Date.now().toString(),
      };
      setPatients((prev) => [...prev, newPatientWithId]);
      alert("Patient saved successfully!");
    }

    setNewPatient({
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
    });

    setSelectedPatientId("");
  };

  const handleSelectPatient = (e) => {
    const selectedId = Number(e.target.value);
    
    setSelectedPatientId(selectedId);

    const selectedPatient = patients.find((patient) => patient.RegistrationId === selectedId);
    setNewPatient(selectedPatient || {
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
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-2xl p-8 w-full max-w-4xl">
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
              value={selectedPatientId}
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
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                patient={patients.find((patient) => patient.RegistrationId === selectedPatientId)}
                onSaveChanges={handleSavePatient}
              />
            )}
          </div>
        ) : (
          <AddPatient
            newPatient={newPatient}
            handleInputChange={handleInputChange}
            handleSavePatient={handleSavePatient}
          />
        )}
      </div>
    </div>
  );
}
