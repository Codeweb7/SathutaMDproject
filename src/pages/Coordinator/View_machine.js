import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import { baseURL } from "../../api";

const View_machine = () => {
  // State variables to store machine data and filtered data
  const [machineData, setMachineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // State variable to store the filter input values
  const [filterValues, setFilterValues] = useState({
    machineId: "",
    machineName: "",
    manufactureYr: "",
    boughtYr: "",
    engineNo: "",
    chasisNo: "",
    salaryRatePerHour: "",
    machineStatus: "",
    customerId: "",
    location: "",
  });

  // Fetch the machine data from the API
  const fetchMachineData = async () => {
    await axios
      .get(`${baseURL}machine`)
      .then((res) => {
        console.log(res.data.machines);
        setMachineData(res.data.machines);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch machine data when the component mounts
  useEffect(() => {
    fetchMachineData();
  }, []);

  // Function to handle changes in filter inputs
  const handleFilterChange = (columnName, value) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [columnName]: value,
    }));
  };

  // Apply filters to the machine data
  useEffect(() => {
    let filtered = machineData;

    for (const [columnName, filterValue] of Object.entries(filterValues)) {
      if (filterValue !== "") {
        filtered = filtered.filter((machine) =>
          String(machine[columnName])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      }
    }

    setFilteredData(filtered);
  }, [filterValues, machineData]);

  // Table headers
  const tableHeaders = [
    { key: "machineId", label: "Machine ID" },
    { key: "machine_name", label: "Machine Name" },
    { key: "machine_type", label: "Machine Type" },
    { key: "manufactureYr", label: "Manufacture Year" },
    { key: "boughtYr", label: "Purchased Year" },
    { key: "engineNo", label: "Engine No" },
    { key: "chassis", label: "Chassis No" },
    { key: "salaryRatePerHour", label: "Salary Rate Per Hour" },
    { key: "machineStatus", label: "Machine Status" },
    { key: "meterReading", label: "Meter Reading" },
  ];

  // Render the component
  return (
    <div>
      {/* Render the header and side bar components */}
      <Co_header />
      <Co_side_bar />

      <div className="p-4">
        {/* Page title */}
        <h2 className="text-3xl font-semibold ml-4 mb-1 mt-4">
          Machine Details
        </h2>

        <div className="flex justify-end mb-4">
          {/* Create button */}
          <Link
            to="/Add_machine"
            className="border rounded-lg px-4 py-2 mr-4 flex items-center bg-green-400 hover:bg-green-500 text-white"
          >
            <img
              src="https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-plus-icon-png-image_515260.jpg"
              alt="Create Icon"
              className="w-6 h-6 mr-2"
            />{" "}
            Add
          </Link>

          {/* Edit button */}
          <Link
            to="/Edit_machine"
            className="border rounded-lg px-4 py-2 mr-4 flex items-center bg-yellow-400 hover:bg-yellow-500 text-white"
          >
            <img
              src="https://p7.hiclipart.com/preview/245/890/350/computer-icons-writing-editing-write.jpg"
              alt="Edit Icon"
              className="w-6 h-6 mr-2"
            />{" "}
            Edit
          </Link>

          {/* Delete button */}
          <Link
            to="/Delete_machine"
            className="border rounded-lg px-4 py-2 flex items-center bg-red-400 hover:bg-red-500 text-white"
          >
            <img
              src="https://banner2.cleanpng.com/20180711/wru/kisspng-computer-icons-clip-art-delete-image-icon-5b45dc96b07912.1758854315313051107228.jpg"
              alt="Delete Icon"
              className="w-6 h-6 mr-2"
            />{" "}
            Delete
          </Link>
        </div>

        {/* Table to display machine data */}
        <div className="overflow-x-auto">
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
                      {machine[header.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default View_machine;
