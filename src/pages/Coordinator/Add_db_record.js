import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";

const Add_db_record = () => {
  // States to store form data
  const [date, setDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [location, setLocation] = useState("");
  const [machineId, setMachineId] = useState("");
  const [startMeter, setStartMeter] = useState("");
  const [stopMeter, setStopMeter] = useState("");
  const [workedHours, setWorkedHours] = useState("");
  const [fuelAmount, setFuelAmount] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [totalReceivable, setTotalReceivable] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [salaryRatePerHour, setSalaryRatePerHour] = useState("");
  const [totalSalary, setTotalSalary] = useState("");

  // States to store success and error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // States to store data for dropdown menus
  const [customers, setCustomers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [operators, setOperators] = useState([]);

  // Function to calculate worked hours when startMeter or stopMeter change
  useEffect(() => {
    if (startMeter && stopMeter) {
      const workedHoursValue = (
        parseFloat(stopMeter) - parseFloat(startMeter)
      ).toFixed(2);
      setWorkedHours(workedHoursValue);
    }
  }, [startMeter, stopMeter]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform input validation
    if (
      !date ||
      !customerId ||
      !location ||
      !machineId ||
      !startMeter ||
      !stopMeter ||
      !workedHours ||
      !fuelAmount ||
      !ratePerHour ||
      !totalReceivable ||
      !operatorId ||
      !salaryRatePerHour ||
      !totalSalary
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (
      isNaN(parseFloat(startMeter)) ||
      isNaN(parseFloat(stopMeter)) ||
      isNaN(parseFloat(workedHours)) ||
      isNaN(parseFloat(fuelAmount)) ||
      isNaN(parseFloat(ratePerHour)) ||
      isNaN(parseFloat(totalReceivable)) ||
      isNaN(parseFloat(salaryRatePerHour)) ||
      isNaN(parseFloat(totalSalary))
    ) {
      setErrorMessage("Numeric fields must be valid numbers.");
      return;
    }

    if (
      parseFloat(startMeter) < 0 ||
      parseFloat(stopMeter) < 0 ||
      parseFloat(fuelAmount) < 0 ||
      parseFloat(ratePerHour) < 0 ||
      parseFloat(totalReceivable) < 0 ||
      parseFloat(salaryRatePerHour) < 0 ||
      parseFloat(totalSalary) < 0
    ) {
      setErrorMessage("Numeric fields cannot be negative.");
      return;
    }

    try {
      // Create the record object with the form data
      const newRecord = {
        date,
        customerId,
        location,
        machineId,
        startMeter,
        stopMeter,
        workedHours,
        fuelAmount,
        ratePerHour,
        totalReceivable,
        operatorId,
        salaryRatePerHour,
        totalSalary,
      };

      // Make an API call to save the new record to the backend (replace 'your-api-endpoint' with the actual API endpoint)
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      });

      if (response.ok) {
        // Record creation successful, clear the form inputs and display success message
        setDate("");
        setCustomerId("");
        setLocation("");
        setMachineId("");
        setStartMeter("");
        setStopMeter("");
        setWorkedHours("");
        setFuelAmount("");
        setRatePerHour("");
        setTotalReceivable("");
        setOperatorId("");
        setSalaryRatePerHour("");
        setTotalSalary("");
        setSuccessMessage("Record added successfully!");
        setErrorMessage(""); // Clear any previous error message
      } else {
        // Record creation failed, display an error message
        setSuccessMessage("");
        setErrorMessage("Error adding record. Please try again.");
      }
    } catch (error) {
      // Handle any other errors that may occur during the API call
      setSuccessMessage("");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl ml-4 font-semibold mb-2 mt-6 text-center">
        Add Record
      </h2>

      <div className="p-4 flex justify-right">
        <div className="ml-auto">
          <Link
            to="/View_main_database"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="w-full md:w-1/2 p-8 bg-gray-200 rounded-lg shadow-md">
          {/* Form for adding a new record */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date:
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter date"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Customer ID:
                </label>
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required
                >
                  <option value="">Select Customer ID</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Machine ID:
                </label>
                <select
                  value={machineId}
                  onChange={(e) => setMachineId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required
                >
                  <option value="">Select Machine ID</option>
                  {machines.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Meter:
                </label>
                <input
                  type="number"
                  value={startMeter}
                  onChange={(e) => setStartMeter(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter start meter"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Stop Meter:
                </label>
                <input
                  type="number"
                  value={stopMeter}
                  onChange={(e) => setStopMeter(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter stop meter"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Worked Hours:
                </label>
                <input
                  type="number"
                  value={workedHours}
                  onChange={(e) => setWorkedHours(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter worked hours"
                  required
                  readOnly // Make the field read-only, as it's auto-calculated
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fuel Amount:
                </label>
                <input
                  type="number"
                  value={fuelAmount}
                  onChange={(e) => setFuelAmount(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter fuel amount"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rate Per Hour:
                </label>
                <input
                  type="number"
                  value={ratePerHour}
                  onChange={(e) => setRatePerHour(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter rate per hour"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total Receivable:
                </label>
                <input
                  type="number"
                  value={totalReceivable}
                  onChange={(e) => setTotalReceivable(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter total receivable"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Operator ID:
                </label>
                <select
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  required
                >
                  <option value="">Select Operator ID</option>
                  {operators.map((operator) => (
                    <option key={operator.id} value={operator.id}>
                      {operator.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Salary Rate Per Hour:
                </label>
                <input
                  type="number"
                  value={salaryRatePerHour}
                  onChange={(e) => setSalaryRatePerHour(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter salary rate per hour"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total Salary:
                </label>
                <input
                  type="number"
                  value={totalSalary}
                  onChange={(e) => setTotalSalary(e.target.value)}
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter total salary"
                  required
                />
              </div>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Add
            </button>
          </form>
          {/* Display success and error messages */}
          {successMessage && (
            <div className="text-green-600 mt-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-600 mt-4">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add_db_record;
