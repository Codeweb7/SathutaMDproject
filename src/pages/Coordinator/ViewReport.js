import React, { useState } from "react";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import axios from "axios";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const ViewReport = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [customerId, setCustomerId] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const [isCustomerDetailsFetched, setCustomerDetailsFetched] = useState(false);

  const fetchCustomerDetails = async () => {
    await axios
      .get(`${baseURL}customer/${customerId}`)
      .then((res) => {
        if (res.status >= 200) {
          const customer = res.data.customer;

          setCustomerName(customer.customer_name);
          setAddress(customer.address);
          setContactNo(customer.phone);
          setContactPerson(customer.contact_name);
          setEmail(customer.email);
        }
        setCustomerDetailsFetched(true);
      })
      .catch((err) => {
        enqueueSnackbar("Customer Not Found", {
          variant: "error",
        });
      });
  };

  const generateReport = async (e) => {
    await axios
      .get(`${baseURL}customer/generateInvoice/${customerId}/${date}`, {
        responseType: "blob", // Set the response type to 'blob' to receive binary data
      })
      .then((res) => {
        if (res.status >= 200) {
          const url = URL.createObjectURL(res.data);

          //   console.log(res.data);

          // Create a link element to trigger the download
          const a = document.createElement("a");
          a.href = url;
          a.download = "invoice.pdf";

          // Trigger the download by programmatically clicking the link
          a.click();

          // Clean up the temporary URL
          URL.revokeObjectURL(url);
        }
      })
      .catch((err) => {
        enqueueSnackbar("Generation error", {
          variant: "error",
        });
      });
  };
  return (
    <div>
      {/* Render the header and side bar components */}
      <Co_header />
      <Co_side_bar />

      <div className="p-4">
        {/* Page title */}
        <h2 className="text-3xl font-semibold ml-4 mb-1 mt-4">
          Generate Customer Invoice
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Form for searching the task by ID */}
          <form className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter Customer ID:
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={customerId}
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                  }}
                  className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter Customer ID"
                  required
                />
                <button
                  type="button"
                  onClick={() => fetchCustomerDetails()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Form for editing the customer */}
          {isCustomerDetailsFetched && ( // Render the form only when customer details are fetched
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Customer Name:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contact Number:
                </label>
                <input
                  type="text"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter contact number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contact Person:
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter contact person"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter email"
                  required
                />
              </div>
              <input
                type="month"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="mr-5 flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 "
                onClick={() => generateReport()}
              >
                Generate Invoice
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
