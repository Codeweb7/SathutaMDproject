import React, { useState, useEffect } from 'react';
import Side_bar from './Side_bar';
import Op_header from './Op_header';

const Add_fuel = () => {
  // State to store the current job details
  const [currentJobDetails, setCurrentJobDetails] = useState(null);
  const [startMeter, setStartMeter] = useState('');
  const [endMeter, setEndMeter] = useState('');
  const [typeOfWork, setTypeOfWork] = useState('');
  const [fuelAmount, setFuelAmount] = useState('');

  // Function to fetch the current job details from the backend API
  const fetchCurrentJobDetails = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setCurrentJobDetails(data);
    } catch (error) {
      console.error('Error fetching current job details:', error);
    }
  };

  // Fetch the current job details when the component mounts
  useEffect(() => {
    fetchCurrentJobDetails();
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can submit the form data to your backend API or perform any other necessary actions.
    console.log('Start Meter:', startMeter);
    console.log('End Meter:', endMeter);
    console.log('Type of Work:', typeOfWork);
    console.log('Fuel Amount:', fuelAmount);

    // Reset the form inputs after submission
    setStartMeter('');
    setEndMeter('');
    setTypeOfWork('');
    setFuelAmount('');
  };

  return (
    <div>
      {/* Render the Header and Side_bar components */}
      <Op_header/>
      <Side_bar />

      {/* Display the current job details form */}
      <div className="p-4">
        {!currentJobDetails ? (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Machinery Worked Hours</h2>
            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2">
                {/* Display the customerID, machineID, machineName, and location */}
                <p>Customer ID: 1111</p>
                <p>Machine ID: MMMM</p>
                <p>Machine Name: SSSS</p>
                <p>Location: dddd</p>
              </div>
              <div className="w-full md:w-1/2">
                {/* Display current date and time */}
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Form inputs for startMeter, endMeter, typeOfWork, fuelAmount */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Start Meter:</label>
                <input
                  type="number"
                  value={startMeter}
                  onChange={(e) => setStartMeter(e.target.value)}
                  step="0.01"
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter start meter"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">End Meter:</label>
                <input
                  type="number"
                  value={endMeter}
                  onChange={(e) => setEndMeter(e.target.value)}
                  step="0.01"
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter end meter"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Type of Work:</label>
                <select
                  value={typeOfWork}
                  onChange={(e) => setTypeOfWork(e.target.value)}
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required
                >
                  {/* Options for Type of Work */}
                  <option value="">Select Type of Work</option>
                  <option value="levelling">Levelling</option>
                  <option value="harrowing">Harrowing</option>
                  <option value="digging">Digging</option>
                  <option value="ripping">Ripping</option>
                  <option value="repair">Repair</option>
                  <option value="working">Working</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Fuel Amount:</label>
                <input
                  type="number"
                  value={fuelAmount}
                  onChange={(e) => setFuelAmount(e.target.value)}
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter fuel amount"
                  required
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center p-4">Loading current job details...</div>
        )}
      </div>
    </div>
  );
};

export default Add_fuel;
