import React, { useState } from 'react';
import axios from 'axios';
import { Api } from '../../Api';

const SearchModal = ({ isOpen, onConfirm, onCancel }) => {
  const [policyNumber, setPolicyNumber] = useState('');
  // const [fromDate, setFromDate] = useState(''); 
  // const [toDate, setToDate] = useState('');
  const [premiumType, setPremiumType] = useState('');

  const handleSubmit = async () => {
    const data = {
      policyNumber,
      // fromDate,
      // toDate,
      premiumType
    };

    try {
      // Replace with your backend API endpoint
      const response = await axios.post(`${Api}/commission/getFilteredData`, {   policyNumber,
        // fromDate,
        // toDate,
        premiumType});
      console.log('Success:', response.data);
      onConfirm(); // Call the confirm handler when successful
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send data. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90000000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-dark rounded-lg p-8 shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-white">Search Premiums</h2>

        {/* Policy Number Input */}
        <div className="mb-4">
          <label htmlFor="policyNumber" className="block text-left text-gray-600 dark:text-gray-300 mb-2">
            Policy Number
          </label>
          <input
            id="policyNumber"
            type="text"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter policy number"
          />
        </div>

        {/* From Date Input */}
         {/* <div className="mb-4">
          <label htmlFor="fromDate" className="block text-left text-gray-600 dark:text-gray-300 mb-2">
            From Date
          </label>
          <input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>*/}

        {/* To Date Input */}
        {/*  <div className="mb-4">
          <label htmlFor="toDate" className="block text-left text-gray-600 dark:text-gray-300 mb-2">
            To Date
          </label>
          <input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>*/}

        {/* Premium Type Dropdown */}
        <div className="mb-6">
          <label htmlFor="premiumType" className="block text-left text-gray-600 dark:text-gray-300 mb-2">
            Select Premium Type
          </label>
          <select
            id="premiumType"
            value={premiumType}
            onChange={(e) => setPremiumType(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Premium Type</option>
            <option value="healthPremium">Health Premium</option>
            <option value="dentalPremium">Dental Premium</option>
  
            {/* Add more premium options as needed */}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
