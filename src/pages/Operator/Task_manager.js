import React, { useState, useEffect } from "react";
import Side_bar from "./Side_bar";
import Op_header from "./Op_header";
import axios from "axios";
import { baseURL } from "../../api";

const Task_manager = () => {
  // State to manage whether to show current job details or previous job details
  const [showCurrentTaskDetails, setShowCurrentTaskDetails] = useState(true);
  const [showPreviousTaskDetails, setShowPreviousTaskDetails] = useState(true);

  // States to store current job details and previous job details fetched from the database
  const [currentTasks, setCurrentTasks] = useState([]);
  const [previousTasks, setPreviousTasks] = useState([]);

  // Function to fetch data from the database (replace 'your-api-endpoint' with the actual API endpoint)

  // Fetch data from the database when the component mounts
  useEffect(() => {
    fetchCurrentTaskDetails();
    fetchPreviousTaskDetails();
  }, []);

  const fetchCurrentTaskDetails = async () => {
    const userId = localStorage.getItem("userId");
    await axios.get(`${baseURL}task/operator/${userId}/current`).then((res) => {
      if (res.status >= 200) {
        const tasks = res.data.tasks;
        setCurrentTasks(tasks);
      }
    });
  };

  const fetchPreviousTaskDetails = async () => {
    const userId = localStorage.getItem("userId");
    await axios
      .get(`${baseURL}task/operator/${userId}/previous`)
      .then((res) => {
        if (res.status >= 200) {
          const tasks = res.data.tasks;
          setPreviousTasks(tasks);
        }
      });
  };

  // Function to update the task status in the database
  const updateTaskStatus = async (taskId, status) => {
    axios
      .put(`${baseURL}task/status/${taskId}/update/${status}`)
      .then((res) => {
        if (res.status >= 200) {
          fetchCurrentTaskDetails();
        }
      });
  };

  // Event handler to update the task status to "In Progress"
  const handleStartTask = (taskId) => {
    updateTaskStatus(taskId, "In Progress");
  };

  // Event handler to update the task status to "Completed"
  const handleFinishTask = (taskId) => {
    updateTaskStatus(taskId, "Completed");
  };

  return (
    <div>
      {/* Header and Sidebar components */}
      <Op_header />
      <Side_bar />

      <div className="p-4">
        {/* Buttons to switch between current job and previous job details */}
        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 py-2 text-center ${
              showCurrentTaskDetails
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            } rounded-tl-lg rounded-bl-lg`}
            onClick={() => {
              setShowCurrentTaskDetails(true);
              setShowPreviousTaskDetails(false);
            }}
          >
            Current Tasks Details
          </button>
          <button
            className={`w-1/2 py-2 text-center ${
              showCurrentTaskDetails
                ? "bg-gray-300 text-gray-800"
                : "bg-blue-500 text-white"
            } rounded-tr-lg rounded-br-lg`}
            onClick={() => {
              setShowCurrentTaskDetails(false);
              setShowPreviousTaskDetails(true);
            }}
          >
            Previous Tasks Details
          </button>
        </div>
        {/* Conditionally render either current job details or previous job details */}
        {showCurrentTaskDetails ? (
          <div className="bg-white rounded-lg shadow p-4">
            {/* Current Job Details */}
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Current Tasks Details
            </h2>
            {currentTasks.length === 0 ? (
              <p className="text-center">No tasks to display</p>
            ) : null}
            {currentTasks.map((task, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex flex-col justify-center items-center">
                    {/* Display current job details */}
                    <p className="text-gray-600 font-medium">Task Id:</p>
                    <p className="font-bold">{task.taskID}</p>
                    <p className="text-gray-600 font-medium mt-4">Task Name:</p>
                    <p className="font-bold">{task.task_name}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {/* Display additional current job details */}
                    <p className="text-gray-600 font-medium">Location:</p>
                    <p className="font-bold">{task.location}</p>
                    <p className="text-gray-600 font-medium mt-4">
                      Estimated Hours:
                    </p>
                    <p className="font-bold">{task.estimateHours}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {/* Display additional current job details */}
                    <p className="text-gray-600 font-medium mt-4">
                      Machine ID:
                    </p>
                    <p className="font-bold">{task.machineId}</p>

                    <p className="text-gray-600 font-medium mt-4">
                      Machine Name:
                    </p>
                    <p className="font-bold">{task.machine_name}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {/* Display additional current job details */}
                    <p className="text-gray-600 font-medium mt-4">
                      Meter Reading:
                    </p>
                    <p className="font-bold">{task.meterReading}</p>
                    <p className="text-gray-600 font-medium mt-4">
                      Machine Type:
                    </p>
                    <p className="font-bold">{task.machine_type}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {/* Display additional current job details */}
                    {/* <p className="text-gray-600 font-medium mt-4">
                      Meter Reading:
                    </p>
                    <p className="font-bold">{task.meterReading}</p> */}
                    <p className="text-gray-600 font-medium mt-4">
                      Task Status:
                    </p>
                    <p className="font-bold">{task.taskStatus}</p>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500"
                      onClick={() => handleStartTask(task.taskID)}
                      disabled={task.taskStatus === "In Progress"}
                    >
                      Start Task
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 ml-4"
                      onClick={() => handleFinishTask(task.taskID)}
                      disabled={task.taskStatus === "Completed"}
                    >
                      Finish Task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            {/* Previous Job Details */}
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Previous Job Details
            </h2>
            {previousTasks.map((task, index) => (
              <div className="flex justify-center items-center" key={index}>
                <div className="grid grid-cols-4 gap-4 mb-5 border border-gray-600 w-full p-2">
                  <p className="text-gray-600 font-medium">Task Name:</p>
                  <p className="font-bold">{task.task_name}</p>
                  <p className="text-gray-600 font-medium ">Customer ID:</p>
                  <p className="font-bold">{task.customerID}</p>
                  <p className="text-gray-600 font-medium ">Machine ID:</p>
                  <p className="font-bold">{task.machineId}</p>
                  <p className="text-gray-600 font-medium ">Machine Name:</p>
                  <p className="font-bold">{task.machine_name}</p>
                  <p className="text-gray-600 font-medium ">Location:</p>
                  <p className="font-bold">{task.location}</p>
                  <p className="text-gray-600 font-medium ">Estimated Hours:</p>
                  <p className="font-bold">{task.estimateHours}</p>
                  <p className="text-gray-600 font-medium ">Task Status:</p>
                  <p className="font-bold">{task.taskStatus}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task_manager;
