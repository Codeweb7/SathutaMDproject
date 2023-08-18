import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import Co_header from './Co_header';
import Co_side_bar from './Co_side_bar';

const Delete_db_record = () => {
  const [readingId, setReadingId] = useState('');
  const [recordDetails, setRecordDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (fieldName, value) => {
    setReadingId(value);
    setRecordDetails({});
    setErrorMessage('');
    setSuccessMessage('');
  };

  const fetchRecordDetails = async () => {
    try {
      // Replace 'your-api-endpoint-for-fetching-record-by-readingId' with the actual API endpoint for fetching the record by readingId
      const response = await axios.get('your-api-endpoint-for-fetching-record-by-readingId', {
        params: {
          readingId,
        },
      });
      setRecordDetails(response.data);
    } catch (error) {
      setErrorMessage('Record not found.');
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Do you want to delete this readingId?');
    if (confirmDelete) {
      // Perform the delete operation using your backend API
      // Replace 'your-api-endpoint-for-deleting-record' with the actual API endpoint for deleting the record
      axios.delete('your-api-endpoint-for-deleting-record', {
        params: {
          readingId,
        },
      })
      .then(() => {
        setSuccessMessage('Record deleted successfully.');
        setRecordDetails({});
      })
      .catch((error) => {
        setErrorMessage('Failed to delete the record.');
      });
    }
  };

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl ml-4 font-semibold mb-2 mt-6 text-center">Delete Record</h2>

      <div className="p-4 flex justify-right">
        <div className='ml-auto'>
          <Link to="/View_main_database" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"> Back </Link>
        </div>
      </div>

      <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="p-4">
        <form onSubmit={(e) => {
          e.preventDefault();
          fetchRecordDetails();
        }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Reading ID:</label>
            <input
              type="text"
              value={readingId}
              onChange={(e) => handleInputChange('readingId', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Search
            </button>
          </div>
        </form>

        {recordDetails.date && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
              <p>{recordDetails.date}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Customer ID:</label>
              <p>{recordDetails.customerId}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
              <p>{recordDetails.location}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Machine ID:</label>
              <p>{recordDetails.machineId}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Start Meter:</label>
              <p>{recordDetails.startMeter}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Stop Meter:</label>
              <p>{recordDetails.stopMeter}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Worked Hours:</label>
              <p>{recordDetails.workedHours}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Fuel Amount:</label>
              <p>{recordDetails.fuelAmount}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Rate Per Hour:</label>
              <p>{recordDetails.ratePerHour}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Total Receivable:</label>
              <p>{recordDetails.totalReceivable}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Operator ID:</label>
              <p>{recordDetails.operatorId}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Salary Rate Per Hour:</label>
              <p>{recordDetails.salaryRatePerHour}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Total Salary:</label>
              <p>{recordDetails.totalSalary}</p>
            </div>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-500 mr-4"
              >
                Delete
              </button>
              <Link
                to="/View_main_database"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                Cancel
              </Link>
            </div>
          </>
        )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Delete_db_record;