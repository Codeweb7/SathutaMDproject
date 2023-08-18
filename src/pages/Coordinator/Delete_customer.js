import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import axios from "axios";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Delete_customer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [customerId, setCustomerId] = useState("");

  // State to keep track of whether customer details have been fetched
  const [isCustomerDetailsFetched, setCustomerDetailsFetched] = useState(false);

  // States to store customer details
  const [customerDetails, setCustomerDetails] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const fetchCustomerDetails = async () => {
    await axios
      .get(`${baseURL}customer/${customerId}`)
      .then((res) => {
        if (res.status >= 200) {
          const customer = res.data.customer;
          setCustomerDetails(customer);
          setCustomerDetailsFetched(true);
        }
      })
      .catch((err) => {
        enqueueSnackbar("Customer Not Found", {
          variant: "error",
        });
      });
  };

  // Function to handle the "Delete" button click and show the confirmation dialog
  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  // Function to handle the "Yes" button click in the confirmation dialog
  const handleConfirmDelete = async () => {
    await axios
      .delete(`${baseURL}customer/${customerId}`)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Customer Deleted", {
            variant: "success",
          });
          setShowConfirmDialog(false);
          setCustomerDetailsFetched(false);
        }
      })
      .catch((err) => {
        enqueueSnackbar(
          "Customer Not Deleted. Please check If the customer assigned to a task.",
          {
            variant: "error",
          }
        );
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
        Delete Customer
      </h2>

      <div className="p-4 flex justify-right">
        <div className="ml-auto">
          <Link
            to="/View_customer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            {" "}
            Back{" "}
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Form for searching the customer by ID */}
          <form className="p-4 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Enter Customer ID:
              </label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => {
                  setCustomerId(e.target.value); // Reset the customer details fetched status when the user changes the Customer ID
                }}
                className="w-200 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Enter Customer ID"
                required
              />
              <button
                type="button"
                onClick={() => fetchCustomerDetails()}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display customer details */}
      {isCustomerDetailsFetched && (
        <div className="flex justify-center">
          <div className="p-4 flex-col self-center justify-center items-start">
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Customer Name:
              </label>
              <span>{customerDetails.customer_name}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Address:
              </label>
              <span>{customerDetails.address}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Contact Number:
              </label>
              <span>{customerDetails.phone}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Contact Person:
              </label>
              <span>{customerDetails.contact_name}</span>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <label className="block text-gray-700 text-sm font-bold ">
                Email:
              </label>
              <span>{customerDetails.email}</span>
            </div>

            {showConfirmDialog && (
              <div className="p-4 bg-white border rounded-lg shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-center text-gray-700 text-lg mb-4">
                  Are you sure you want to delete this customer?
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
                className="mt-4 bg-red-500 text-              white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
                onClick={() => handleDeleteClick()}
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

export default Delete_customer;
