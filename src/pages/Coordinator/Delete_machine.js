import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import axios from "axios";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Delete_machine = () => {
  const [machineId, setMachineId] = useState(""); // State variable to store the machine ID from the URL (path parameter)

  // State to keep track of whether machine details have been fetched
  const [isMachineDetailsFetched, setMachineDetailsFetched] = useState(false);

  // States to store machine details
  const [machineDetails, setMachineDetails] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  // Function to fetch machine details by machine ID from the backend
  const fetchMachineDetails = async () => {
    await axios
      .get(`${baseURL}machine/${machineId}`)
      .then((res) => {
        if (res.status >= 200) {
          const machine = res.data.machine;
          setMachineDetails(machine);
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

  // Function to handle the "Delete" button click and show the confirmation dialog
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  // Function to handle the "Yes" button click in the confirmation dialog
  const handleConfirmDelete = async () => {
    await axios
      .delete(`${baseURL}machine/${machineId}`)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Machine Deleted", {
            variant: "success",
          });
          setShowConfirmDialog(false);
          setMachineDetailsFetched(false);
        }
      })
      .catch((err) => {
        enqueueSnackbar("Machine Not Deleted.", {
          variant: "error",
        });
        setShowConfirmDialog(false);
      });
  };

  // Function to handle the "No" button click in the confirmation dialog
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl ml-4 font-semibold mb-2 mt-6 text-center">
        Delete Machine
      </h2>

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
          <form className="p-4 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold ">
                Enter Machine ID:
              </label>
              <input
                type="text"
                value={machineId}
                onChange={(e) => {
                  setMachineId(e.target.value);
                }}
                className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter Machine ID"
                required
              />
              <button
                type="button"
                onClick={() => fetchMachineDetails()}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display machine details */}
      {isMachineDetailsFetched && (
        <div className="flex justify-center items-center">
          <div className="p-4">
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Machine Name:
              </label>
              <span>{machineDetails.machine_name}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Machine Type:
              </label>
              <span>{machineDetails.machine_type}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Manufacture Year:
              </label>
              <span>{machineDetails.manufactureYr}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Purchased Year:
              </label>
              <span>{machineDetails.boughtYr}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Engine Number:
              </label>
              <span>{machineDetails.engineNo}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Chasis Number:
              </label>
              <span>{machineDetails.chassis}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Salary Rate Per Hour:
              </label>
              <span>{machineDetails.salaryRatePerHour}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Machine Status:
              </label>
              <span>{machineDetails.machineStatus}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                MeterReading
              </label>
              <span>{machineDetails.meterReading}</span>
            </div>

            {showConfirmDialog && (
              <div className="p-4 bg-white border rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-center text-gray-700 text-lg mb-4">
                  Are you sure you want to delete this machine?
                </p>
                <div className="flex justify-center">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
                    onClick={handleConfirmDelete}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-500"
                    onClick={handleCancelDelete}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            {!showConfirmDialog && (
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
                onClick={handleDeleteClick}
                disabled={machineDetails.machineStatus === "Working"} // Disable the delete button if the machine status is "Working"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete_machine;
