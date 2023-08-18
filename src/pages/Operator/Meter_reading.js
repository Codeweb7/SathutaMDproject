import React, { useState, useEffect } from "react";
import Side_bar from "./Side_bar";
import Op_header from "./Op_header";
import axios from "axios";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Meter_reading = () => {
  // State to store the current job details
  const [taskID, setTaskID] = useState("");
  const [startMeter, setStartMeter] = useState("");
  const [endMeter, setEndMeter] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [fuel, setFuesl] = useState("");
  const [machineId, setMachineId] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  // Fetch the current job details when the component mounts
  useEffect(() => {
    fetchCurrentTaskDetails();
  }, []);

  const [currentTasks, setCurrentTasks] = useState([]);

  const fetchCurrentTaskDetails = async () => {
    const userId = localStorage.getItem("userId");
    await axios.get(`${baseURL}task/operator/${userId}/current`).then((res) => {
      if (res.status >= 200) {
        const tasks = res.data.tasks;

        setCurrentTasks(tasks);
        setTaskID(tasks[0]?.taskID);
        setStartMeter(tasks[0]?.meterReading);
        setMachineId(tasks[0]?.allocated_machineID)
      }
    });
  };

  // Function to validate whether a value is a positive number
  const isPositiveNumber = (value) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && parsedValue >= 0;
  };

  // Function to validate whether the end meter is greater than or equal to the start meter
  const isEndMeterValid = () => {
    if (isPositiveNumber(startMeter) && isPositiveNumber(endMeter)) {
      const parsedStartMeter = parseFloat(startMeter);
      const parsedEndMeter = parseFloat(endMeter);
      return parsedEndMeter >= parsedStartMeter;
    }
    return false;
  };

  const saveStartMeter = async (taskId) => {
    if (!isPositiveNumber(startMeter)) {
      enqueueSnackbar("Start meter should be a positive number.", {
        variant: "error",
      });
      return;
    }

    await axios
      .post(`${baseURL}task/meter/${"start"}`, {
        date: date,
        meterReading: startMeter,
        taskId: taskId,
        machienId: machineId,
      })
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Meter Reading Saved", {
            variant: "success",
          });
          fetchCurrentTaskDetails();
          fetchTaskDetails();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Meter Reading Not Saved", {
          variant: "error",
        });
      });
  };

  const saveEndMeter = async (taskId) => {
    if (!isPositiveNumber(endMeter)) {
      enqueueSnackbar("End meter should be a positive number.", {
        variant: "error",
      });
      return;
    }

    if (!isEndMeterValid()) {
      enqueueSnackbar("End meter should be greater than or equal to the start meter.", {
        variant: "error",
      });
      return;
    }

    await axios
      .post(`${baseURL}task/meter/${"end"}`, {
        date: date,
        meterReading: endMeter,
        taskId: taskId,
        machineId: machineId,
      })
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Meter Reading Saved", {
            variant: "success",
          });
          fetchCurrentTaskDetails();
          fetchTaskDetails();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Meter Reading Not Saved", {
          variant: "error",
        });
      });
  };

  const saveFuel = async (taskId) => {
    if (!isPositiveNumber(fuel)) {
      enqueueSnackbar("Fuel amount should be a positive number.", {
        variant: "error",
      });
      return;
    }

    await axios
      .post(`${baseURL}task/meter/${"fuel"}`, {
        date: date,
        fuel: fuel,
        taskId: taskId,
        machineId: machineId,
      })
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Fuel Amount Saved", {
            variant: "success",
          });

          fetchCurrentTaskDetails();
          fetchTaskDetails();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Fuel Amount Saved Not Saved", {
          variant: "error",
        });
      });
  };

  const tableHeaders = [
    { key: "taskID", label: "Task Id" },
    { key: "date", label: "Date" },
    { key: "startmeter", label: "Start Meter Reading" },
    { key: "endmeter", label: "End Meter Reading" },
    { key: "fuel", label: "Fuel Filled" },
  ];
  // State variables to store customer data and filtered data
  const [taskData, setTaskData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // State variable to store the filter input values
  const [filterValues, setFilterValues] = useState({
    taskID: "",
    date: "",
    startmeter: "",
    endmeter: "",
    fuel: "",
  });

  // Function to handle changes in filter inputs
  const handleFilterChange = (columnName, value) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [columnName]: value,
    }));
  };
  // Apply filters to the customer data
  useEffect(() => {
    let filtered = taskData;

    for (const [columnName, filterValue] of Object.entries(filterValues)) {
      if (filterValue !== "") {
        filtered = filtered.filter((customer) =>
          String(customer[columnName])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      }
    }

    setFilteredData(filtered);
  }, [filterValues, taskData]);

  // Fetch the customer data from the API
  const fetchTaskDetails = async () => {
    await axios
      .get(`${baseURL}task/taskDetails/${taskID}`)
      .then((res) => {
        setTaskData(res.data.taskDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch customer data when the component mounts
  useEffect(() => {
    fetchTaskDetails();
  }, [taskID]);

  return (
    <div>
      {/* Render the Header and Side_bar components */}
      <Op_header />
      <Side_bar />

      <div>
        {!showTaskDetail ? (
          <div className="bg-white rounded-lg shadow p-4">
            {/* Current Job Details */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Current Task
              </h2>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 "
                onClick={() => {
                  fetchTaskDetails();
                  setShowTaskDetail(true);
                }}
              >
                Show Task Details Table
              </button>
            </div>
            {currentTasks.length === 0 ? (
              <p className="text-center">No tasks to display</p>
            ) : null}
            {currentTasks.map((task, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center items-center">
                      {/* Display current job details */}
                      <p className="text-gray-600 font-medium">Task Id:</p>
                      <p className="font-bold">{task.taskID}</p>
                      <p className="text-gray-600 font-medium mt-4">
                        Task Name:
                      </p>
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
                      {/* <p className="text-gray-600 font-medium mt-4">
                        Meter Reading:
                      </p>
                      <p className="font-bold">{task.meterReading}</p> */}
                      <p className="text-gray-600 font-medium mt-4">
                        Machine Type:
                      </p>
                      <p className="font-bold">{task.machine_type}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      {/* Display additional current job details */}
                      <p className="text-gray-600 font-medium mt-4">
                        Meter Reading:
                      </p>
                      <p className="font-bold">{task.meterReading}</p>
                      <p className="text-gray-600 font-medium mt-4">
                        Task Status:
                      </p>
                      <p className="font-bold">{task.taskStatus}</p>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <form>
                    <div className="flex justify-center items-center gap-20">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="date"
                      >
                        Select Date:
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-300 px-8 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="startMeter"
                        >
                          Start Meter
                        </label>
                        <input
                          type="number"
                          id="startMeter"
                          name="startMeter"
                          value={startMeter}
                          onChange={(e) => setStartMeter(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 ml-4"
                          onClick={() => saveStartMeter(task.taskID)}
                          disabled={task.taskStatus === "Completed"}
                        >
                          Save Start Meter
                        </button>
                      </div>
                    </div>{" "}
                    <div className="flex justify-center items-center">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="endMeter"
                        >
                          End Meter
                        </label>
                        <input
                          type="number"
                          id="endMeter"
                          name="endMeter"
                          value={endMeter}
                          onChange={(e) => setEndMeter(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 ml-4"
                          onClick={() => saveEndMeter(task.taskID)}
                          disabled={task.taskStatus === "Completed"}
                        >
                          Save End Meter
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold"
                          htmlFor="endMeter"
                        >
                          Enter Fuel Amount
                        </label>
                        <input
                          type="number"
                          id="fuel"
                          name="fuel"
                          value={fuel}
                          onChange={(e) => setFuesl(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 ml-4"
                          onClick={() => saveFuel(task.taskID)}
                          disabled={task.taskStatus === "Completed"}
                        >
                          Save Fuel Amount
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-col justify-center items-center mt-5 px-5">
            <div className="self-end flex w-full justify-end gap-4 mr-10">
              <button
                type="button"
                className="self-end bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 "
                onClick={() => setShowTaskDetail(false)}
              >
                Show Current Task
              </button>
            </div>
            <div className="overflow-x-auto mt-10">
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header.key} className="border px-4 py-2">
                        <div>
                          {/* Display the header label */}
                          {header.label}
                        </div>
                        <div>
                          {/* Filter input */}
                          <input
                            type="text"
                            className="border px-2 py-1 w-full mt-2"
                            value={filterValues[header.key]}
                            onChange={(e) =>
                              handleFilterChange(header.key, e.target.value)
                            }
                            placeholder={`Filter by ${header.label}`}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((task) => (
                    <tr key={task.taskID}>
                      {tableHeaders.map((header) => (
                        <td
                          key={`${task.taskID}-${header.key}`}
                          className="border px-4 py-2"
                        >
                          {/* Display the customer data based on the header key */}
                          {header.key === "date"
                            ? new Date(task[header.key]).toDateString()
                            : task[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meter_reading;
