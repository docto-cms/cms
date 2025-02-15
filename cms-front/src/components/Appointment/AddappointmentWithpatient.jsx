import React, { useState , useEffect } from "react";
import axios from "axios";
import AddappointmentNewpatient from "./AddappointmentNewpatient";

const AddappointmentWithpatient = () => {
  const [switchAppointment, setSwitchAppointment] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [fetchError, setFetchError] = useState(null);
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
  
      if (name.startsWith("Patient.")) {
        const field = name.split(".")[1];
        setFormData(prev => ({
          ...prev,
          Patient: {
            ...prev.Patient,
            [field]: inputValue,
          },
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: inputValue,
        }));
      }
    };
  
    const handleSaveAppointment = async (e) => {
      e.preventDefault();
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
    <div className="max-w-full bg-white shadow-md rounded-lg p-6 m-6">
      <div className="w-full max-w-3xl border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">New Appointments</h2>
        <div className="flex gap-4 mt-2">
          <button
             className={`text-blue-500 font-medium ${switchAppointment
              ? ""
              :"border-b-2 border-blue-500"
            }`}
            onClick={() => setSwitchAppointment(false)}
          >
            New Patient
          </button>
          <button
            className={`text-blue-500 font-medium ${switchAppointment
              ? "border-b-2 border-blue-500"
              :""
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
             value={formData.Patient}
             placeholder="Search Patient Name"
             onChange={handleInputChange}
             className="mt-1 w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
           />
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
             <option >Select Doctor</option>
             {loadingDoctors && <option>Loading doctors...</option>}
             {fetchError && <option>{fetchError}</option>}
             {doctors.map((doctor) => (
               <option key={doctor.id} value={doctor.id}>
                 {doctor.firstname} {doctor.lastname}
               </option>
             ))}
           </select>
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
               <option value="" disabled>0</option>
               <option>5</option>
               <option>10</option>
               <option>15</option>
             </select>
           </div>
           <div className="flex items-center gap-2 mt-5">
             <input
               type="checkbox"
               onChange={handleInputChange}
               value="repeat"
               name="Repeat"
               className="h-4 w-4 text-blue-500 border-gray-300 rounded"
             />
              <label className="text-sm text-gray-700">Repeat
            </label>
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
           <div className="pt-4">
 </div>
 {/* Action Buttons */}
 <div className=" flex justify-end space-x-4 mt-6">
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
       </div>
     
      ) : (
       <AddappointmentNewpatient
      />
      )}
    </div>
  );
};

export default AddappointmentWithpatient;
