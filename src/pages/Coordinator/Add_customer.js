import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Add_customer = () => {
  // State variables to store form input values and error messages
  const [customerData, setCustomerData] = useState({
    customerId: "",
    customerName: "",
    address: "",
    contact_name: "",
    phone: "",
    email: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNameError, setContactNameError] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Perform validations based on the input field
    switch (name) {
      case "phone":
        validatePhone(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "contact_name":
        validateContactName(value);
        break;
      default:
        break;
    }
  };

  // Function to validate contact number
  const validatePhone = (value) => {
    const phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(value)) {
      setPhoneError("Invalid phone number. Must start with '0' followed by 9 digits.");
    } else {
      setPhoneError("");
    }
  };

  // Function to validate email address
  const validateEmail = (value) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  // Function to validate contact person name
  const validateContactName = (value) => {
    const contactNamePattern = /^[A-Z][A-Za-z .]*$/;
    if (!contactNamePattern.test(value)) {
      setContactNameError("Invalid contact person name. Must start with a capital letter and contain only letters, full stop, and spaces.");
    } else {
      setContactNameError("");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for any validation errors before submitting the form
    if (phoneError || emailError || contactNameError) {
      enqueueSnackbar("Please fix the errors in the form.", {
        variant: "error",
      });
      return;
    }

    await axios
      .post(`${baseURL}customer`, customerData)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Customer Added!.", {
            variant: "success",
          });

          setCustomerData({
            customerId: "",
            customerName: "",
            address: "",
            contact_name: "",
            phone: "",
            email: "",
          });
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

      <div className="p-4">
        {/* Page title */}
        <h2 className="text-3xl font-semibold ml-4 mb-1 mt-4">
          Customer Details
        </h2>

        <div className="bg-white min-h-screen">
          <div className="p-4 flex justify-right">
            <div className="ml-auto">
              <Link
                to="/View_customer"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                Back
              </Link>
            </div>
          </div>

          {/* Form to add a customer */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 px-4">
              {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Customer ID:
                </label>
                <input
                  type="text"
                  name="customerId"
                  value={customerData.customerId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter customer ID"
                  required
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Customer Name:
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={customerData.customerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                  name="address"
                  value={customerData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                  name="phone"
                  value={customerData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                  name="contact_name"
                  value={customerData.contact_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              {/* Button to submit the form */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_customer;
