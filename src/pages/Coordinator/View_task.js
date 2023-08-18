import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import axios from "axios";
import { baseURL } from "../../api";

const View_task = () => {
  // State to store the list of tasks fetched from the database
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    await axios
      .get(`${baseURL}task`)
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch the list of tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  // Table headers with filtering options
  const tableHeaders = [
    { key: "taskID", label: "Task Id" },
    { key: "created_by_userID", label: "Coordinator ID" },
    { key: "customerID", label: "Customer ID" },
    { key: "location", label: "Location" },
    { key: "allocated_machineID", label: "Machine ID" },
    { key: "assigned_userID", label: "Operator ID" },
    { key: "customerRate", label: "Rate Per Hour" },
    { key: "estimateHours", label: "Estimated Hours" },
    { key: "status", label: "Status" },
  ];

  const [filterValues, setFilterValues] = useState({
    taskID: "",
    created_by_userID: "",
    customerID: "",
    location: "",
    allocated_machineID: "",
    assigned_userID: "",
    estimateHours: "",
    customerRate: "",
    status: "",
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
    let filtered = tasks;
    console.log(tasks);

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
  }, [filterValues, tasks]);
  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl font-semibold ml-4 mb-1 mt-4">Tasks</h2>

      <div className="container mx-auto px-4">
        {/* Buttons for Create, Edit, and Delete */}
        <div className="flex justify-end mb-4">
          {/* Create button */}
          <Link
            to="/Create_task"
            className="border rounded-lg px-4 py-2 mr-4 flex items-center bg-green-400 hover:bg-green-500 text-white"
          >
            <img
              src="https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-plus-icon-png-image_515260.jpg"
              alt="Create Icon"
              className="w-6 h-6 mr-2"
            />{" "}
            Create{" "}
          </Link>

          {/* Edit button */}
          <Link
            to="/Edit_task"
            className="border rounded-lg px-4 py-2 mr-4 flex items-center bg-yellow-400 hover:bg-yellow-500 text-white"
          >
            <img
              src="https://p7.hiclipart.com/preview/245/890/350/computer-icons-writing-editing-write.jpg"
              alt="Edit Icon"
              className="w-6 h-6 mr-2"
            />{" "}
            Edit{" "}
          </Link>

          {/* Delete button */}
          <Link
            to="/Delete_task"
            className="border rounded-lg px-4 py-2 flex items-center bg-red-400 hover:bg-red-500 text-white"
          >
            <img
              src="https://banner2.cleanpng.com/20180711/wru/kisspng-computer-icons-clip-art-delete-image-icon-5b45dc96b07912.1758854315313051107228.jpg"
              alt="Delete Icon"
              className="w-6 h-6 mr-2"
            />{" "}
            Delete{" "}
          </Link>
        </div>

        {/* Table with filtering options */}
        <table className="w-full border-collapse border border-gray-300">
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
            {filteredData?.map((customer) => (
              <tr key={customer.customerId}>
                {tableHeaders.map((header) => (
                  <td
                    key={`${customer.customerId}-${header.key}`}
                    className="border px-4 py-2"
                  >
                    {/* Display the customer data based on the header key */}
                    {customer[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View_task;
