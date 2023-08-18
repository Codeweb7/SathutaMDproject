import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import axios from "axios";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Create_task = () => {
  // States to store form data
  const [customerName, setCustomerName] = useState("");
  const [customerContactName, setCustomerContactName] = useState("");
  const [customerID, setCustomerID] = useState("");

  const [machineID, setMachineID] = useState("");
  const [machineType, setMachineType] = useState("");
  const [lastMeterReading, setLastMeterReading] = useState("");

  const [operatorID, setOperatorID] = useState("");
  const [operatorName, setOperatorName] = useState("");

  const [taskName, setTaskName] = useState("");
  const [location, setLocation] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [status, setStatus] = useState("Not Started");

  // States to store lists of available machines, operators, and customers
  const [availableMachines, setAvailableMachines] = useState([]);
  const [availableOperators, setAvailableOperators] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([]);

  const fetchAvailableData = async () => {
    fetchCustomerData();
    fetchMachineData();
    fetchUserData();
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

  useEffect(() => {
    fetchAvailableData();
  }, []);

  const getCustomerDetails = async (customerID) => {
    setCustomerID(customerID);
    await axios.get(`${baseURL}customer/${customerID}`).then((res) => {
      if (res.status >= 200) {
        const customer = res.data.customer;

        setCustomerName(customer.customer_name);
        setCustomerContactName(customer.contact_name);
      }
    });
  };

  const getMachineDetails = async (machineId) => {
    setMachineID(machineId);
    await axios.get(`${baseURL}machine/${machineId}`).then((res) => {
      if (res.status >= 200) {
        const machine = res.data.machine;

        setMachineType(machine.machine_type);
        setLastMeterReading(machine.meterReading);
      }
    });
  };
  const getOperatorDetails = async (userId) => {
    setOperatorID(userId);
    await axios.get(`${baseURL}user/${userId}`).then((res) => {
      if (res.status >= 200) {
        const operator = res.data.user;
        setOperatorName(operator.first_name + " " + operator.last_name);
      }
    });
  };

  const { enqueueSnackbar } = useSnackbar();
  // Function to handle form submission
  const handleSubmit = async () => {
    const assignedBy = localStorage.getItem("userId");
    console.log(assignedBy);

    const newTask = {
      customerID,
      machineID,
      operatorID,
      location,
      estimatedHours,
      ratePerHour,
      status,
      taskName,
      assignedBy,
    };

    // Validate estimatedHours and ratePerHour as positive numbers
    if (estimatedHours <= 0 || ratePerHour <= 0) {
      enqueueSnackbar("Estimated hours and rate per hour must be positive numbers.", {
        variant: "error",
      });
      return;
    }

    await axios
      .post(`${baseURL}task`, newTask)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Task Created!.", {
            variant: "success",
          });

          setCustomerName("");
          setLocation("");
          setOperatorName("");
          setEstimatedHours("");
          setRatePerHour("");
          setStatus("Not Started");
          setTaskName("");
          setLastMeterReading("");
          setOperatorID("");
          setMachineID("");
          setCustomerID("");
          fetchAvailableData();
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
        Create New Task
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
        <div className="flex flex-col justify-center items-center">
          <div className="w-full md:w-1/2 p-8 bg-gray-200 rounded-lg shadow-md">
            {/* Form for creating a new task */}
            <form className="grid grid-cols-2 gap-4">
              <div className="border border-cyan-200 p-1">
                {/* Input fields and dropdowns for task details */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Customer ID:
                  </label>
                  <select
                    value={customerID}
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
                    Customer Contact Name:
                  </label>
                  <input
                    type="text"
                    value={customerContactName}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="customer contact name"
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="border border-cyan-200 p-1">
                <div className="mb-2 flex-col">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Machine ID:
                  </label>
                  <select
                    value={machineID}
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
                  <div className="text-xs">
                    Only available machines are shown here*
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Machine Type:
                  </label>
                  <input
                    type="text"
                    value={machineType}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder=" Machine Type"
                    required
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Meter reading :
                  </label>
                  <input
                    type="text"
                    value={lastMeterReading}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder=" Last Meter reading "
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="border border-cyan-200 p-1">
                <div className="mb-2 flex-col">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Operator ID:
                  </label>
                  <select
                    value={operatorID}
                    onChange={(e) => getOperatorDetails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  >
                    <option value="">Select Operator ID</option>
                    {availableOperators?.map((operator) => (
                      <option key={operator.userId} value={operator.userId}>
                        {operator.userId}
                      </option>
                    ))}
                  </select>
                  <div className="text-xs">
                    Only available operators are shown here*
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Operator Name:
                  </label>
                  <input
                    type="text"
                    value={operatorName}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="operator name"
                    required
                    disabled
                  />
                </div>
                {/* <div className="border border-b border-b-cyan-300 mb-2"></div> */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Task Name:
                  </label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="task name"
                    required
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
              </div>
              <div className="border border-cyan-200 p-1">
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
              </div>
              {/* Submit button */}
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                {" "}
                Create{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_task;
