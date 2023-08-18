import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import axios from "axios";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Edit_task = () => {
  // State to keep track of whether task details have been fetched
  const [isTaskDetailsFetched, setTaskDetailsFetched] = useState(false);

  const [taskId, setTaskId] = useState("");

  const [availableMachines, setAvailableMachines] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([]);
  const [availableOperators, setAvailableOperators] = useState([]);

  const fetchMachineData = async () => {
    await axios
      .get(`${baseURL}machine`)
      .then((res) => {
        const machines = res.data.machines;
        setAvailableMachines(
          machines.filter((machine) => machine.machineStatus === "Not Working")
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchUserData = async () => {
    await axios
      .get(`${baseURL}user/available/operators`)
      .then((res) => {
        const users = res.data.operators;
        console.log(users);
        setAvailableOperators(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCustomerData = async () => {
    await axios
      .get(`${baseURL}customer`)
      .then((res) => {
        console.log(res.data.customers);
        setAvailableCustomers(res.data.customers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCustomerDetails = async (customerID) => {
    setNewCustomerID(customerID);
    await axios.get(`${baseURL}customer/${customerID}`).then((res) => {
      if (res.status >= 200) {
        const customer = res.data.customer;

        setCustomerName(customer.customer_name);
      }
    });
  };

  const getMachineDetails = async (machineId) => {
    setNewMachineID(machineId);
    await axios.get(`${baseURL}machine/${machineId}`).then((res) => {
      if (res.status >= 200) {
        const machine = res.data.machine;

        setMachineType(machine.machine_type);
      }
    });
  };
  const getOperatorDetails = async (userId) => {
    setNewOperatorID(userId);
    await axios.get(`${baseURL}user/${userId}`).then((res) => {
      if (res.status >= 200) {
        const operator = res.data.user;
        setOperatorName(operator.first_name + " " + operator.last_name);
      }
    });
  };

  // States to store form data
  const [taskName, setTaskName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [location, setLocation] = useState("");
  const [machineID, setMachineID] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [operatorID, setOperatorID] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [status, setStatus] = useState("Not Started");

  const [newMachineId, setNewMachineID] = useState("");
  const [newOperatorId, setNewOperatorID] = useState("");
  const [newCustomerID, setNewCustomerID] = useState("");

  const [machineType, setMachineType] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  // States to handle success and error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch task details by task ID from the backend
  const fetchTaskDetails = async () => {
    await axios
      .get(`${baseURL}task/${taskId}`)
      .then((res) => {
        if (res.status >= 200) {
          const task = res.data.task;
          fetchMachineData();
          fetchUserData();
          fetchCustomerData();

          setTaskName(task.task_name);
          setCustomerID(task.customerID);
          setLocation(task.location);
          setMachineID(task.allocated_machineID);
          setOperatorID(task.assigned_userID);
          setEstimatedHours(task.estimateHours);
          setRatePerHour(task.customerRate);
          setStatus(task.status);
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

  // Function to handle form submission for editing task details
  const handleSubmit = async () => {
    // Validate estimatedHours and ratePerHour as positive numbers
    if (estimatedHours <= 0 || ratePerHour <= 0) {
      setSuccessMessage("");
      setErrorMessage("Estimated hours and rate per hour must be positive numbers.");
      return;
    }

    const data = {
      taskName: taskName,
      newCustomerID: newCustomerID,
      customerID: customerID,
      location: location,
      machineID: machineID,
      newMachineId: newMachineId,
      operatorID: operatorID,
      newOperatorId: newOperatorId,
      estimateHours: estimatedHours,
      ratePerHour: ratePerHour,
      status: status,
      taskId: taskId,
    };
    await axios
      .put(`${baseURL}task/${taskId}`, data)
      .then((res) => {
        if (res.status >= 200) {
          setSuccessMessage("Task details updated successfully.");
          setErrorMessage("");
        }
      })
      .catch((err) => {
        setSuccessMessage("");
        setErrorMessage("Failed to update task details.");
      });
  };

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl ml-4 font-semibold mb-2 mt-6 text-center">
        Edit Task
      </h2>

      <div className="bg-white min-h-screen">
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
            <form className="mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter Task ID:
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={taskId}
                    onChange={(e) => {
                      setTaskId(e.target.value);
                    }}
                    className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter Task ID"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => fetchTaskDetails()}
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
            {/* Form for editing the task */}
            {isTaskDetailsFetched && ( // Render the form only when task details are fetched
              <form className="p-4">
                {/* Input fields and dropdowns for task details */}

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task Name:
                  </label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Customer ID:
                  </label>
                  <input
                    type="text"
                    value={customerID}
                    readOnly
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Customer ID will be automatically updated"
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Customer ID:
                  </label>
                  <select
                    value={newCustomerID}
                    onChange={(e) => getCustomerDetails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  >
                    <option value="">Select Customer ID</option>
                    {availableCustomers?.map((cus) => (
                      <option key={cus.customerId} value={cus.customerId}>
                        {cus.customerId}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Customer Name:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="customer name"
                    required
                    disabled
                  />
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
                    Machine Id:
                  </label>
                  <input
                    type="text"
                    value={machineID}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter location"
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Machine ID:
                  </label>
                  <select
                    value={newMachineId}
                    onChange={(e) => getMachineDetails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  >
                    <option value="">Select Machine ID</option>
                    {availableMachines?.map((machine) => (
                      <option key={machine.machineId} value={machine.machineId}>
                        {machine.machineId}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Machine Name:
                  </label>
                  <input
                    type="text"
                    value={machineType}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Machine name"
                    required
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Operator ID:
                  </label>
                  <input
                    type="text"
                    value={operatorID}
                    readOnly
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Operator ID will be automatically updated"
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Operator ID:
                  </label>
                  <select
                    value={newOperatorId}
                    onChange={(e) => getOperatorDetails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  >
                    <option value="">Select New Operator ID</option>
                    {availableOperators?.map((op) => (
                      <option key={op.userId} value={op.userId}>
                        {op.userId}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Operator Name:
                  </label>
                  <input
                    type="text"
                    value={operatorName}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Operator name"
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Estimated Hours:
                  </label>
                  <input
                    type="number"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                    step="1.00"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter estimated hours"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Customer Rate Per Hour:
                  </label>
                  <input
                    type="number"
                    value={ratePerHour}
                    onChange={(e) => setRatePerHour(e.target.value)}
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter Customer Rate per Hour"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Status:
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  {/* Submit button */}
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                  >
                    Save Changes
                  </button>
                  {/*link to navigate back to the task details page */}
                  <Link
                    to={`/View_task/${taskId}`}
                    className="col-span-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-500"
                  >
                    Cancel
                  </Link>
                </div>
                {successMessage && (
                  <p className="text-green-600 mt-4">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="text-red-600 mt-4">{errorMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_task;
