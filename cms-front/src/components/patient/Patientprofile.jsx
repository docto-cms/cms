import { input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import { MdOutlineModeEdit } from "react-icons/md";
import axios from "axios";

const PatientProfile = ({ patient, onSaveChanges, isEditing, setIsEditing }) => {


  
  const [formData, setFormData] = useState({
    RegistrationId: patient.RegistrationId || "",
    firstName: patient.FirstName || "",
    lastName: patient.lastName || "",
    email: patient.email || "",
    city: patient.city || "",
    refferedBy: patient.refferedBy || "",
    age: patient.age || "",
    phone: patient.phone || "",
    gender: patient.gender || "",
    feeType: patient.feeType || "",
    fee: patient.fee || "",
    doctor: patient.doctor || "",
  });

  useEffect(() => {
    setFormData({
      RegistrationId: patient.RegistrationId ,
      firstName: patient.FirstName ,
      lastName: patient.LastName ,
      email: patient.Email ,
      city: patient.City,
      refferedBy: patient.RefferedBy ,
      age: patient.Age ,
      phone: patient.PhoneNumber ,
      gender: patient.Gender ,
      feeType: patient.FeeType ,
      fee: patient.Fee ,
      doctor: patient.Doctor,
    });
  }, [patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const updatedPatientData = {
      RegistrationId: formData.RegistrationId,
      FirstName: formData.firstName.trim(),   // Changed to PascalCase
      LastName: formData.lastName.trim(),     // Changed to PascalCase
      Email: formData.email,
      City: formData.city,
      RefferedBy: formData.refferedBy,       // Ensure correct spelling
      Age: Number(formData.age) || "",
      PhoneNumber: formData.phone,           // Changed from 'phone' to 'PhoneNumber'
      Gender: formData.gender,
      FeeType: formData.feeType,
      Fee: Number(formData.fee) || "",       // Ensure PascalCase
      Doctor: formData.doctor,
    }
  
    try {
      const res = await axios.patch(`http://127.0.0.1:8000/Patient/patients/${patient.RegistrationId}/`,
        updatedPatientData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", res);
      alert("Update Successful!");
    } catch (err) {
      console.error("Error occurred:", err.response ? err.response.data : err.message);
      alert(`Error: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    }
  };
  
  
    // try {
    //   const response = await axios.put(
    //     `http://127.0.0.1:8000/Patient/patients/${patient.RegistrationId}/`,
    //     updatedPatientData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log("Update Successful:", response.data);
    //   onSaveChanges(response.data);
    //   setIsEditing(false);
    // } catch (error) {
    //   console.error("Error updating patient:", error);
    //   alert("Failed to update patient data.");
    // }
  

  

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="bg-white p-7 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold">Patient Profile</h2>
        <button onClick={handleEditClick} className="text-black-500 hover:text-black text-lg">
          {isEditing ? <GrView /> : <MdOutlineModeEdit />}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-4">
        {/* Basic Information */}
        <div className="p-2">
          
          <div className="space-y-2">
            {/* First Name */}
            <div className="flex">
              <span className="font-semibold text-gray-700 w-40">First Name</span>
              <span className="font-semibold">:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="ml-2 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="ml-2">{patient.FirstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex">
              <span className="font-semibold text-gray-700 w-40">Last Name</span>
              <span className="font-semibold">:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="ml-2 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="ml-2">{patient.LastName}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex">
              <span className="font-semibold text-gray-700 w-40">Email</span>
              <span className="font-semibold">:</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="ml-2 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="ml-2">{patient.Email}</span>
              )}
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-700 w-40">Doctor</span>
              <span className="font-semibold">:</span>
              {isEditing ? (
               <select
               name="doctor"
               value={formData.doctor}
               onChange={handleInputChange}
               className="ml-2 p-2 border border-gray-300 rounded-md">
              <option value="" disabled>
                Select Doctor
              </option>
              <option value="jithin">Dr. Jithin</option>
              <option value="john">Dr. John</option>
            </select>
              ) : (
                <span className="ml-2">{patient.Doctor}</span>
              )}
            </div> 


           

        
          
          
          <div className="flex">
              
              {isEditing ? (
               ""
              ) : (
                <span className="ml-2 w-[50%]">
                   <span className="font-semibold text-gray-700 ">Fee Type</span>
                   <span className="font-semibold">:</span>{patient.FeeType}</span>
              )}
            </div> 

          

          </div>
        </div>

        {/* Medical Details */}
        <div className="p-2">
         
          <div className="space-y-2">
            <div className="flex">
              <span className="font-semibold text-gray-700 w-40">Registration ID</span>
              <span className="font-semibold">:</span>
              {isEditing ? (
                <input
                  disabled
                  type="number"
                  name="RegistrationId"
                  value={formData.RegistrationId}
                  onChange={handleInputChange}
                  className="ml-2 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="ml-2">{patient.RegistrationId}</span>
              )}
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-40">Age</span>
              <span className="font-semibold">:</span>
              {isEditing ? (
                <input
                  type="number"
                  name="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="ml-2 p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="ml-2">{patient.Age}</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex">
              <span className="font-semibold text-gray-700 w-40">Gender</span>
              <span className="font-semibold">:</span>
              {isEditing ? (
               <input
               disabled
               name="gender"
               value={formData.gender}
               onChange={handleInputChange}
               className="ml-2 p-2 border border-gray-300 rounded-md"/>
              ) : (
                <span className="ml-2">{patient.Gender}</span>
              )}
            </div>
            
            <div className="flex">
             
             {isEditing ? (
               ""
             ) : (
               <span className="ml-2">
                  <span className="font-semibold text-gray-700 w-40">Consultation Fee</span>
                  <span className="font-semibold">:</span>
                 {patient.Fee}</span>
             )}
           </div>
           

          </div>
        </div>
      </div>

      {/* Save Button */} 
      <div className="p-4 flex justify-end">
        {isEditing && (
          <button
            type="button"
            onClick={(e)=>handleSaveChanges(e)}
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
