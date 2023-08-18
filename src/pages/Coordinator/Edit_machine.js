import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import axios from "axios";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Edit_machine = () => {
  // State to keep track of whether machine details have been fetched
  const [isMachineDetailsFetched, setMachineDetailsFetched] = useState(false);

  const [machineId, setMachineId] = useState("");
  // States to store form data

  const [machineName, setMachineName] = useState("");
  const [machineType, setMachineType] = useState("");
  const [manufactureYr, setManufactureYr] = useState("");
  const [boughtYr, setBoughtYr] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [chasisNo, setChasisNo] = useState("");
  const [salaryRatePerHour, setSalaryRatePerHour] = useState("");
  const [machineStatus, setMachineStatus] = useState("Not Working");
  const [meterReading, setMeterReading] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  // Function to fetch machine details by machine ID from the backend
  const fetchMachineDetails = async () => {
    await axios
      .get(`${baseURL}machine/${machineId}`)
      .then((res) => {
        if (res.status >= 200) {
          const machine = res.data.machine;
          console.log(machine);

          setMachineName(machine.machine_name);
          setBoughtYr(machine.boughtYr);
          setChasisNo(machine.chassis);
          setEngineNo(machine.engineNo);
          setSalaryRatePerHour(machine.salaryRatePerHour);
          setMachineStatus(
            machine.machineStatus !== undefined
              ? machine.machineStatus
              : "Not Working"
          );
          setMeterReading(machine.meterReading);
          setMachineType(machine.machine_type);
          setManufactureYr(machine.manufactureYr);
        }
        setMachineDetailsFetched(true);
      })
      .catch((err) => {
        enqueueSnackbar("Machine Not Found", {
          variant: "error",
        });
        setMachineDetailsFetched(false);
      });
  };

  // Function to handle form submission for editing machine details
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate manufacture year and bought year
    const currentYear = new Date().getFullYear();
    const manufactureYear = parseInt(manufactureYr);
    const boughtYear = parseInt(boughtYr);
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
    const parsedSalaryRatePerHour = parseFloat(salaryRatePerHour);
    const parsedMeterReading = parseFloat(meterReading);
    if (
      isNaN(parsedSalaryRatePerHour) ||
      isNaN(parsedMeterReading) ||
      parsedSalaryRatePerHour < 0 ||
      parsedMeterReading < 0
    ) {
      enqueueSnackbar("Salary rate per hour and meter reading must be positive numbers.", {
        variant: "error",
      });
      return;
    }

    const updatedMachine = {
      machineId,
      machineName,
      manufactureYr,
      boughtYr,
      engineNo,
      chasisNo,
      salaryRatePerHour,
      machineStatus,
      meterReading,
      machineType,
    };

    await axios
      .put(`${baseURL}machine`, updatedMachine)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Machine Updated!.", {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Error!.", {
          variant: "error",
        });
      });
  };

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl ml-4 font-semibold mb-2 mt-6 text-center">
        Edit Machine
      </h2>

      <div className="bg-white min-h-screen">
        <div className="p-4 flex justify-right">
          <div className="ml-auto">
            <Link
              to="/View_machine"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              {" "}
              Back{" "}
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Form for searching the machine by ID */}
            <form className="mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter Machine ID:
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={machineId}
                    onChange={(e) => {
                      setMachineId(e.target.value); // Reset the machine details fetched status when the user changes the Machine ID
                    }}
                    className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter Machine ID"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => fetchMachineDetails()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                  >
                    OK
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Form for editing the machine */}
            {isMachineDetailsFetched && ( // Render the form only when machine details are fetched
              <form onSubmit={handleSubmit} className="p-4">
                {/* Input fields for machine details */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Machine Name:
                  </label>
                  <input
                    type="text"
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                    value={machineType}
                    onChange={(e) => setMachineType(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                    value={manufactureYr}
                    onChange={(e) => setManufactureYr(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                    value={boughtYr}
                    onChange={(e) => setBoughtYr(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter bought year"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Engine Number:
                  </label>
                  <input
                    type="text"
                    value={engineNo}
                    onChange={(e) => setEngineNo(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter engine number"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Chassis Number:
                  </label>
                  <input
                    type="text"
                    value={chasisNo}
                    onChange={(e) => setChasisNo(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter chasis number"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Meter Reading:
                  </label>
                  <input
                    type="number"
                    value={meterReading}
                    onChange={(e) => setMeterReading(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter Meter Reading"
                    required
                  />
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
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter salary rate per hour"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Machine Status:
                  </label>
                  <select
                    value={machineStatus}
                    onChange={(e) => setMachineStatus(e.target.value)}
                    className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  >
                    <option value="Not Working">Not Working</option>
                    <option value="Working">Working</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
                <div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                  >
                    Save Changes
                  </button>
                  {/* Link to navigate back to the machine details page */}
                  <Link
                    to={`/View_machine/${machineId}`}
                    className="col-span-2 ml-5 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-500"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_machine;
