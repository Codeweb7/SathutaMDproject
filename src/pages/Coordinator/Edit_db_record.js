import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import Co_header from './Co_header';
import Co_side_bar from './Co_side_bar';

const Edit_db_record = () => {
  const [readingId, setReadingId] = useState('');
  const [editedDetails, setEditedDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [machineData, setMachineData] = useState([]);

  // Fetch the machine data from the API
  const fetchMachineData = async () => {
    try {
      // Replace 'your-api-endpoint-for-machine-data' with the actual API endpoint for fetching machine data
      const response = await axios.get('your-api-endpoint-for-machine-data');
      setMachineData(response.data); // Assuming the response data is an array of machine data
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  // Fetch machine data when the component mounts
  useEffect(() => {
    fetchMachineData();
  }, []);

  const handleInputChange = (fieldName, value) => {
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Replace 'your-api-endpoint-for-updating-record' with the actual API endpoint for updating the record
      await axios.put('your-api-endpoint-for-updating-record', editedDetails);
      setSuccessMessage('Record updated successfully.');
    } catch (error) {
      setErrorMessage('Failed to update the record.');
    }
  };

  // Calculate workedHours whenever startMeter or stopMeter changes
  useEffect(() => {
    const { startMeter, stopMeter } = editedDetails;
    if (startMeter !== undefined && stopMeter !== undefined) {
      const workedHours = stopMeter - startMeter;
      setEditedDetails((prevDetails) => ({
        ...prevDetails,
        workedHours,
      }));
    }
  }, [editedDetails.startMeter, editedDetails.stopMeter]);

  // Calculate totalReceivable whenever workedHours or ratePerHour changes
  useEffect(() => {
    const { workedHours, ratePerHour } = editedDetails;
    if (workedHours !== undefined && ratePerHour !== undefined) {
      const totalReceivable = workedHours * ratePerHour;
      setEditedDetails((prevDetails) => ({
        ...prevDetails,
        totalReceivable,
      }));
    }
  }, [editedDetails.workedHours, editedDetails.ratePerHour]);

  // Update salaryRatePerHour whenever machineId changes
  useEffect(() => {
    const { machineId } = editedDetails;
    if (machineId !== undefined) {
      const selectedMachine = machineData.find((machine) => machine.id === machineId);
      if (selectedMachine) {
        const { salaryRatePerHour } = selectedMachine;
        setEditedDetails((prevDetails) => ({
          ...prevDetails,
          salaryRatePerHour,
        }));
      }
    }
  }, [editedDetails.machineId, machineData]);

  // Calculate totalSalary whenever workedHours or salaryRatePerHour changes
  useEffect(() => {
    const { workedHours, salaryRatePerHour } = editedDetails;
    if (workedHours !== undefined && salaryRatePerHour !== undefined) {
      const totalSalary = workedHours * salaryRatePerHour;
      setEditedDetails((prevDetails) => ({
        ...prevDetails,
        totalSalary,
      }));
    }
  }, [editedDetails.workedHours, editedDetails.salaryRatePerHour]);

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl ml-4 font-semibold mb-2 mt-6 text-center">Edit Record</h2>
      <div className="flex justify-right mb-2">
        <div className="ml-auto">
          <Link
            to="/View_main_database"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* Reading ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Reading ID:</label>
            <input
              type="text"
              value={readingId}
              onChange={(e) => setReadingId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={async () => {
                try {
                  // Replace 'your-api-endpoint-for-fetching-record-by-readingId' with the actual API endpoint for fetching the record by readingId
                  const response = await axios.get('your-api-endpoint-for-fetching-record-by-readingId', {
                    params: {
                      readingId,
                    },
                  });
                  setEditedDetails(response.data);
                } catch (error) {
                  setErrorMessage('Record not found.');
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Search
            </button>
          </div>
          
          {/* Date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
            <input
              type="date"
              value={editedDetails.date || ''}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Customer ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Customer ID:</label>
            <input
              type="text"
              value={editedDetails.customerId || ''}
              onChange={(e) => handleInputChange('customerId', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
            <input
              type="text"
              value={editedDetails.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Machine ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Machine ID:</label>
            <input
              type="text"
              value={editedDetails.machineId || ''}
              onChange={(e) => handleInputChange('machineId', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Start Meter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Meter:</label>
            <input
              type="number"
              value={editedDetails.startMeter || ''}
              onChange={(e) => handleInputChange('startMeter', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Stop Meter */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Stop Meter:</label>
            <input
              type="number"
              value={editedDetails.stopMeter || ''}
              onChange={(e) => handleInputChange('stopMeter', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Worked Hours */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Worked Hours:</label>
            <input
              type="number"
              value={editedDetails.workedHours || ''}
              onChange={(e) => handleInputChange('workedHours', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Fuel Amount */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Fuel Amount:</label>
            <input
              type="number"
              value={editedDetails.fuelAmount || ''}
              onChange={(e) => handleInputChange('fuelAmount', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Rate Per Hour */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rate Per Hour:</label>
            <input
              type="number"
              value={editedDetails.ratePerHour || ''}
              onChange={(e) => handleInputChange('ratePerHour', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Total Receivable */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Receivable:</label>
            <input
              type="number"
              value={editedDetails.totalReceivable || ''}
              onChange={(e) => handleInputChange('totalReceivable', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Operator ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Operator ID:</label>
            <input
              type="text"
              value={editedDetails.operatorId || ''}
              onChange={(e) => handleInputChange('operatorId', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Salary Rate Per Hour */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Salary Rate Per Hour:</label>
            <input
              type="number"
              value={editedDetails.salaryRatePerHour || ''}
              onChange={(e) => handleInputChange('salaryRatePerHour', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          {/* Total Salary */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Salary:</label>
            <input
              type="number"
              value={editedDetails.totalSalary || ''}
              onChange={(e) => handleInputChange('totalSalary', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Edit_db_record;
