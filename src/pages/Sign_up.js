import React, { useState } from "react";
import tree from "../image/signupbg.jpg";
import Sign_in_up_header from "../components/Sign_in_up_header";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api";

const Sign_up = () => {
  // Using state to store form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    // employee_id: "",
    role: "",
    // joined_date: "",
    // phone_number: "",
    // email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Using notistack's useSnackbar to show notifications
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // Check if password and confirm_password match
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    // Make a POST request to the server to save the user data
    await axios
      .post(`${baseURL}auth/register`, formData)
      .then((res) => {
        if (res.status >= 200) {
          // Show success notification and navigate to the home page on successful sign up
          enqueueSnackbar("Sign up completed.", {
            variant: "success",
          });
          navigate("/");
        }
      })
      .catch(() =>
        // Show error notification on sign up failure
        enqueueSnackbar("Sign up Failed.", {
          variant: "error",
        })
      );
  };

  return (
    <div>
      {/* Navigation bar */}
      <Sign_in_up_header />

      {/* Main content */}
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          {/* Left side - Image */}
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={{ backgroundImage: `url(${tree})` }}
          ></div>

          {/* Right side - Sign Up Form */}
          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Sathuta Industry (PVT) LTD
              </h1>
              <p className="mt-4 text-lg font-bold text-gray-500 dark:text-gray-400">
                Machinery Division
              </p>

              {/* Sign Up Form */}
              <form
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    pattern="[A-Z][a-z]{1,24}"
                    title="Only letters starting with an Uppercase (max length = 25 characters)"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Snow"
                    pattern="[A-Z][a-z]{1,24}"
                    title="Only letters starting with an Uppercase (max length = 25 characters)"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employee_id"
                    placeholder="EMP0001"
                    pattern="EMP\d{4}"
                    title="Employee ID should start with 'EMP' followed by four digits."
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                  />
                </div> */}

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Role
                  </label>
                  <select
                    name="role"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Operator">Operator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Joined Date
                  </label>
                  <input
                    type="date"
                    name="joined_date"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.joined_date}
                    onChange={handleChange}
                    required
                  />
                </div> */}

                {/* <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="XXX-XXX-XXXX"
                    pattern="\d{10}"
                    title="Phone number should have exactly 10 numbers."
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div> */}
                {/* 
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="johnsnow@example.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Enter a valid email address."
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div> */}

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="JohnSnow12"
                    pattern="^[a-zA-Z0-9]{3,16}$"
                    title="Username should be 3 to 16 characters long and can contain letters, and numbers."
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number."
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter your password"
                    pattern={formData.password} // Ensures that the confirm password matches the password field
                    title="Passwords must match."
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <span>Sign Up </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sign_up;
