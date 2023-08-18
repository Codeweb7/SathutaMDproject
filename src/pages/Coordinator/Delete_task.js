import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import { useSnackbar } from "notistack";
import axios from "axios";
import { baseURL } from "../../api";

const Delete_task = () => {
  // State to keep track of whether task details have been fetched
  const [isTaskDetailsFetched, setTaskDetailsFetched] = useState(false);

  const [taskId, setTaskId] = useState(""); // State to store the task ID from the URL

  // States to store task details
  const [taskDetails, setTaskDetails] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const fetchTaskDetails = async () => {
    await axios
      .get(`${baseURL}task/${taskId}`)
      .then((res) => {
        if (res.status >= 200) {
          const task = res.data.task;
          setTaskDetails(task);
        }
        setTaskDetailsFetched(true);
      })
      .catch((err) => {
        enqueueSnackbar("Task Not Found", {
          variant: "error",
        });
        setTaskDetailsFetched(false);
      });
  };

  // Function to handle the "Delete" button click and show the confirmation dialog
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  // Function to handle the "Yes" button click in the confirmation dialog
  const handleConfirmDelete = async () => {
    await axios
      .delete(`${baseURL}task/${taskId}`)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Task Deleted", {
            variant: "success",
          });
          setShowConfirmDialog(false);
          setTaskDetailsFetched(false);
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
        Delete Task
      </h2>

      <div className="p-4 flex justify-right">
        <div className="ml-auto">
          <Link
            to="/View_task"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            {" "}
            Back{" "}
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Form for searching the task by ID */}
          <form className="p-4 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter Task ID:
              </label>
              <input
                type="text"
                value={taskId}
                onChange={(e) => {
                  setTaskId(e.target.value);
                }}
                className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter Task ID"
                required
              />
              <button
                type="button"
                onClick={() => {
                  fetchTaskDetails();
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display task details */}
      {isTaskDetailsFetched && (
        <div className="flex justify-center items-center">
          <div className="p-4">
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Task ID:
              </label>
              <span>{taskDetails.taskID}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Task Name:
              </label>
              <span>{taskDetails.task_name}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Customer ID:
              </label>
              <span>{taskDetails.customerID}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Location:
              </label>
              <span>{taskDetails.location}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Machine ID:
              </label>
              <span>{taskDetails.allocated_machineID}</span>
            </div>

            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                operator ID:
              </label>
              <span>{taskDetails.assigned_userID}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                estimated Hours:
              </label>
              <span>{taskDetails.estimateHours}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Customer Rate Per Hour:
              </label>
              <span>{taskDetails.customerRate}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Status:
              </label>
              <span>{taskDetails.status}</span>
            </div>

            {showConfirmDialog && (
              <div className="p-4 bg-white border rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-center text-gray-700 text-lg mb-4">
                  Are you sure you want to delete this task?
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
                disabled={taskDetails.status === "Completed"} // Disable the delete button if the task status is "Completed"
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

export default Delete_task;
