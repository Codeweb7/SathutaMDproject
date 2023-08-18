import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios"; // Used for API requests
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import { baseURL } from "../../api";

const View_main_database = () => {
  // State to store the list of meter readings
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  // Function to fetch meter readings from the API
  const fetchData = async () => {
    await axios
      .get(`${baseURL}main`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch meter readings when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (columnName, value) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [columnName]: value,
    }));
  };

  useEffect(() => {
    let filteredData = data;

    for (const [columnName, filterValue] of Object.entries(filterValues)) {
      if (filterValue !== "") {
        filteredData = filteredData.filter((reading) =>
          String(reading[columnName])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      }
    }

    setFilteredData(filteredData);
  }, [filterValues, data]);

  const tableHeaders = [
    { key: "taskID", label: "Task ID" },
    { key: "date", label: "Date" },
    { key: "customerID", label: "Customer ID" },
    { key: "customer_name", label: "Customer Name" },
    { key: "location", label: "Location" },
    { key: "allocated_machineID", label: "Machine Id" },
    { key: "startmeter", label: "Start Meter" },
    { key: "endmeter", label: "Stop Meter" },
    { key: "totalHours", label: "Worked Hours" },
    { key: "fuel", label: "Fuel" },
    { key: "customerRate", label: "Rate Per Hour" },
    { key: "totalCost", label: "Total Receivable" },
    { key: "assigned_userID", label: "Operator ID" },
    { key: "salaryRatePerHour", label: "Salary Rate" },
    { key: "totalSalary", label: "Total Salary" },
  ];

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl font-semibold ml-4 mb-1 mt-4">Main Database</h2>

      <div className="flex justify-end mb-4">
        {/* Create button */}
        <Link
          to="/Add_db_record"
          className="border rounded-lg px-4 py-2 mr-4 flex items-center bg-green-400 hover:bg-green-500 text-white"
        >
          <img
            src="https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-plus-icon-png-image_515260.jpg"
            alt="Create Icon"
            className="w-6 h-6 mr-2"
          />{" "}
          Add{" "}
        </Link>

        {/* Edit button */}
        <Link
          to="/Edit_db_record"
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
          to="/Delete_db_record"
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

      <div className="p-4 overflow-x-auto w-full">
        {/* Add overflow-x-auto to enable horizontal scrolling */}
        {data.length > 0 ? (
          <>
            <div className="overflow-x-auto w-full">
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
                  {filteredData.map((machine) => (
                    <tr key={machine.machineId}>
                      {tableHeaders.map((header) => (
                        <td
                          key={`${machine.machineId}-${header.key}`}
                          className="border px-4 py-2"
                        >
                          {/* Display the machine data based on the header key */}
                          {header.key === "date"
                            ? new Date(machine[header.key]).toLocaleDateString()
                            : machine[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No Data available.</p>
        )}
      </div>
    </div>
  );
};

export default View_main_database;
