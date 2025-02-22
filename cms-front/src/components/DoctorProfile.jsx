import React ,{useState,useEffect} from 'react'

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState("");
  const clinic_id = localStorage.getItem("clinic_id")

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/Doctorget/${clinic_id}/`) // Update API URL if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error("Doctor not found");
        }
        return response.json();
      })
      .then((data) => setDoctor(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="flex justify-center   bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8  w-full">
      <h2 className="text-xl font-bold mb-4">Basic Information</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            value={doctor.first_name}
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            value={doctor.last_name}
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
          
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={doctor.email}
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="phone number"
            value={doctor.phone_number}
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">
            Clinic Id
          </label>
          <input
            type="clinic id"
            value={doctor.clinic_id}
            className="w-full py-3 px-2 border border-gray rounded-md focus:ring focus:ring-blue-200"
          />
          </div>
        

   </div>

 
  </div>
  </div>
  )
}
