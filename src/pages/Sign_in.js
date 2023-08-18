import React, { useState } from "react";
import tree from "../image/signinbg.jpg";
import Sign_in_up_header from "../components/Sign_in_up_header";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api";

export default function Sign_in() {
  // Using state to store form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Using notistack's useSnackbar to show notifications
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Using state to store form validation errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear previous errors when the user starts typing again
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the server to perform user authentication
    await axios
      .post(`${baseURL}auth/login`, formData)
      .then((res) => {
        if (res.status >= 200) {
          // Store user data in local storage after successful login
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("role", res.data.role);

          console.log(res.data);

          // Redirect user based on their role after successful login
          if (res.data.role === "admin") {
            navigate("/Co_dashboard");
          } else {
            navigate("/Task_manager");
          }
        }
      })
      .catch(() =>
        // Show error notification on login failure
        enqueueSnackbar("Log in Failed.", {
          variant: "error",
        })
      );
  };

  return (
    <div>
      {/* Navigation bar */}
      <Sign_in_up_header />

      {/* Main content */}
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          {/* Left side - Image */}
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{ backgroundImage: `url(${tree})` }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-3xl">
                  Sathuta Industry (PVT) LTD
                </h2>
                <p className="max-w-2xl mt-3 text-gray-300">
                  Machinery Division
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Sign-in Form */}
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                    alt=""
                  />
                </div>
                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="flex justify-start mb-2">
                    <label
                      htmlFor="username"
                      className="block text-sm text-gray-600 dark:text-gray-200"
                    >
                      Username
                    </label>
                  </div>
                  {/* Input field for username */}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your Username"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {/* Display username validation error, if any */}
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}

                  {/* Password */}
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    {/* Input field for password */}
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {/* Display password validation error, if any */}
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Sign In Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                {/* Sign Up Link */}
                <p className="mt-6 text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="/Sign_up"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
