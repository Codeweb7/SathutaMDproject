import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Add_machine = () => {
  // State variables to store form input values
  const [machineData, setMachineData] = useState({
    machine_name: "",
    machine_type: "",
    manufactureYr: "",
    boughtYr: "",
    engineNo: "",
    chassis: "",
    salaryRatePerHour: "",
    machineStatus: "Not Working", // Default value is "Not Working"
    meterReading: "",
  });

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMachineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { enqueueSnackbar } = useSnackbar();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate manufacture year and bought year
    const currentYear = new Date().getFullYear();
    const manufactureYear = parseInt(machineData.manufactureYr);
    const boughtYear = parseInt(machineData.boughtYr);
    if (
      manufactureYear < 1900 ||
      manufactureYear > currentYear ||
      boughtYear < 1900 ||
      boughtYear > currentYear
    ) {
      enqueueSnackbar("Invalid manufacture year or bought year.", {
        variant: "error",
      });
      return;
    }

    // Validate salary rate per hour and meter reading
    const salaryRatePerHour = parseFloat(machineData.salaryRatePerHour);
    const meterReading = parseFloat(machineData.meterReading);
    if (isNaN(salaryRatePerHour) || isNaN(meterReading) || salaryRatePerHour < 0 || meterReading < 0) {
      enqueueSnackbar("Salary rate per hour and meter reading must be positive numbers.", {
        variant: "error",
      });
      return;
    }

    // Create the machine object with the form data
    const newMachine = {
      machine_name: machineData.machine_name,
      machine_type: machineData.machine_type,
      manufactureYr: machineData.manufactureYr,
      boughtYr: machineData.boughtYr,
      engineNo: machineData.engineNo,
      chassis: machineData.chassis,
      salaryRatePerHour: salaryRatePerHour,
      machineStatus: machineData.machineStatus,
      meterReading: meterReading,
    };

    await axios
      .post(`${baseURL}machine`, newMachine)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Machine Added!.", {
            variant: "success",
          });

          setMachineData({
            machine_name: "",
            machine_type: "",
            manufactureYr: "",
            boughtYr: "",
            engineNo: "",
            chassis: "",
            salaryRatePerHour: "",
            machineStatus: "Not Working",
            meterReading: "",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Machine not saved!", {
          variant: "error",
        });
      });
  };

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <div className="p-4">
        {/* Page title */}
        <h2 className="text-3xl font-semibold ml-4 mb-1 mt-4">
          Machine Details
        </h2>

        <div className="bg-white min-h-screen">
          <div className="p-4 flex justify-right">
            <div className="ml-auto">
              <Link
                to="/View_machine"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                Back
              </Link>
            </div>
          </div>

          {/* Form to add a machine */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 px-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Machine Name:
                </label>
                <input
                  type="text"
                  name="machine_name"
                  value={machineData.machine_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter machine name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Machine Type:
                </label>
                <input
                  type="text"
                  name="machine_type"
                  value={machineData.machine_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter machine type"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Manufacture Year:
                </label>
                <input
                  type="number"
                  name="manufactureYr"
                  value={machineData.manufactureYr}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter manufacture year"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Purchased Year:
                </label>
                <input
                  type="number"
                  name="boughtYr"
                  value={machineData.boughtYr}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter purchased year"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Engine No:
                </label>
                <input
                  type="text"
                  name="engineNo"
                  value={machineData.engineNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter engine number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Chassis:
                </label>
                <input
                  type="text"
                  name="chassis"
                  value={machineData.chassis}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter chassis number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Salary Rate Per Hour:
                </label>
                <input
                  type="number"
                  name="salaryRatePerHour"
                  value={machineData.salaryRatePerHour}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter salary rate per hour"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Meter Reading:
                </label>
                <input
                  type="number"
                  name="meterReading"
                  value={machineData.meterReading}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter meter reading"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              {/* Button to submit the form */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                Add Machine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_machine;
