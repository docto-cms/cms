const QuickentryForm = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full mx-auto">
        <h2 className="text-xl font-bold mb-4">Quick Entry</h2>
        <p className="text-sm text-gray-500 mb-6">
          <span className="text-blue-600">Home</span> / Quick Entry
        </p>
        <div className="border-t border-gray-300 mb-6"></div>
        <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
        {/* Row for Registration ID, First Name, Last Name, Mobile, Email */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration ID
            </label>
            <input
              type="text"
              defaultValue="PAT137"
              placeholder="Registration ID"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div className="gap-1">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile No
            </label>
            <input
              type="text"
              placeholder="1234567890"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
        </div>
        {/* Second Row Inputs */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              placeholder="Age"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400">
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Referred By
            </label>
            <input
              type="text"
              placeholder="Referred By"
              className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <select className="w-full p-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 placeholder-gray-400">
              <option>Select Doctor</option>
              <option>Doctor 1</option>
              <option>Doctor 2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuickentryForm;






