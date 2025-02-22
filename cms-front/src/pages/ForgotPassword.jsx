import React from "react";
const ForgotPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-xl font-semibold mt-4">Forgot Password</h2>
      <p className="mt-6 text-gray-700">Enter Email Address</p>
      <input
        type="email"
        placeholder="example@gmail.com"
        className="w-full max-w-sm mt-2 p-3 border rounded-full text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="mt-2 text-blue-500 text-sm">Back to sign in</button>
      <button className="w-full max-w-sm mt-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white text-lg font-medium py-3 rounded-full shadow-md hover:opacity-90 transition">
        Send
      </button>
      <p className="mt-4 text-gray-500">or</p>
      <p className="mt-6 text-gray-500">Do you have an account?</p>
      <button className="w-full max-w-sm mt-2 border border-gray-400 text-gray-700 text-lg font-medium py-3 rounded-full hover:bg-blue-100 transition">
        Back to Login
      </button>
      </div>
    </div>
  );
};
export default ForgotPassword;