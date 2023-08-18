import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { Link } from "react-router-dom";
import Co_header from "./Co_header";
import Co_side_bar from "./Co_side_bar";
import { baseURL } from "../../api";
import { useSnackbar } from "notistack";

const Edit_customer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [customerId, setCustomerId] = useState("");
  const [isCustomerDetailsFetched, setCustomerDetailsFetched] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");

  // State variables for error messages during edit
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNameError, setContactNameError] = useState("");

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerId((prevData) => ({
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

  // Function to fetch customer details by customer ID from the backend
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

    // Create the updated customer object with the form data
    const updatedCustomer = {
      customerId,
      customer_name: customerName,
      address,
      phone: contactNo,
      contact_name: contactPerson,
      email,
    };

    await axios
      .put(`${baseURL}customer`, updatedCustomer)
      .then((res) => {
        if (res.status >= 200) {
          enqueueSnackbar("Customer Updated!.", {
            variant: "success",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("Error!.", {
          variant: "error",
        });
      });
  };

  // Fetch customer details when the customerId state changes
  useEffect(() => {
    setCustomerDetailsFetched(false);
    if (customerId.trim() !== "") {
      fetchCustomerDetails();
    }
  }, [customerId]);

  

  return (
    <div>
      <Co_header />
      <Co_side_bar />

      <h2 className="text-3xl ml-4 font-semibold mb-2 mt-6 text-center">
        Edit Customer
      </h2>

      <div className="bg-white min-h-screen">
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
                      // setCustomerDetailsFetched(false); // Reset the customer details fetched status when the user changes the Customer ID
                      // navigate(`/Edit_customer/${e.target.value}`); // Update the URL with the entered Customer ID
                    }}
                    className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter Customer ID"
                    required
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                    onClick={() => fetchCustomerDetails()}
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
              <form onSubmit={handleSubmit} className="p-4">
                {/* Input fields for customer details */}
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
                <div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                  >
                    Save Changes
                  </button>
                  {/* Link to navigate back to the customer details page */}
                  <Link
                    onClick={() => setCustomerDetailsFetched(false)}
                    className="col-span-2 ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-500"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_customer;
