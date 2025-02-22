import React from 'react';
import { FaHome } from "react-icons/fa";
const SupportPage = () => {
  return (
    <div className="min-h-screen p-6">
       
      <nav className="flex mb-4 text-gray-600 gap-1">
            <div className="text-blue-600 p-1"><FaHome/></div>
              <a className="flex text-blue-600">Home</a>/{" "}
              <span className="text-gray-800">support</span>
            </nav>
            <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full text-left border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-semibold">Timing</td>
              <td className="p-4">Mon-Sat - 09:30 AM IST TO 06:30 PM IST</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Contact No</td>
              <td className="p-4">
                +91-79071 42154<br />
                +91-9074266533<br />
                +91-8921850402
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Email</td>
              <td className="p-4">
                doctosmartshr@gmail.com<br />
                doctosmart@gmail.com
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Emergency</td>
              <td className="p-4">+91-7907142154 (24/7) Helpline</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">WhatsApp</td>
              <td className="p-4">
                <a href="#" className="text-blue-500 hover:underline">Click here</a>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Service Ticket</td>
              <td className="p-4">
                Kindly Click The Below Link To create a Service Ticket <a href="#" className="text-blue-500 hover:underline">Click here</a>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
  );
};
export default SupportPage;