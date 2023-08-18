import React, { useState, useEffect } from "react";
import Op_header from "./Op_header";
import Side_bar from "./Side_bar";
import axios from "axios";
import { baseURL } from "../../api";

const View_salary = () => {
  // State to store the operator's salary sheets for the past three months
  const [salarySheet, setSalarySheet] = useState([]);

  // State to store the selected month for viewing the salary sheet
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Function to fetch the operator's salary sheets for the past three months from the backend API
  const fetchSalarySheets = async () => {
    const id = localStorage.getItem("userId");
    await axios
      .get(`${baseURL}user/getSalaryDetails/${id}/${selectedMonth}`)
      .then((res) => {
        console.log(res.data);
        setSalarySheet(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateSubTotal = () => {
    let total = 0;
    salarySheet.forEach((day) => {
      total += Number(day.totalSalary);
    });
    return total;
  };

  return (
    <div>
      {/* Render the Header and Side_bar components */}
      <Op_header />
      <Side_bar />

      {/* Display the operator's salary sheets for the past three months */}
      <div className="p-4">
        {salarySheet ? (
          <div className="container mx-auto mt-5">
            <h1 className="text-3xl font-bold mb-4">Salary Details</h1>
            <div className="flex mb-4">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border border-gray-300 rounded mr-4"
              />
              <button
                className="p-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  fetchSalarySheets();
                }}
              >
                Find
              </button>
            </div>
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">
                    Total Worked Hours
                  </th>
                  <th className="border border-gray-300 p-2">Rate</th>
                  <th className="border border-gray-300 p-2">Total per Day</th>
                </tr>
              </thead>
              <tbody>
                {salarySheet.map((day) => (
                  <tr key={day.date}>
                    <td className="border border-gray-300 p-2">
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {day.totalHours}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {day.salaryRatePerHour}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {day.totalSalary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <strong>Subtotal : {generateSubTotal()} /=</strong>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">Loading salary sheets data...</div>
        )}
      </div>
    </div>
  );
};

export default View_salary;
