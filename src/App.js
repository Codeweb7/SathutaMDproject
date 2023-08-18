// Importing necessary components and functions from react-router-dom and other files
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import My_profile from "./pages/My_profile";

// Importing different page components for different routes
import Sign_up from "./pages/Sign_up";
import Sign_in from "./pages/Sign_in";
import Op_dashboard from "./pages/Operator/Op_dashboard";
import Task_manager from "./pages/Operator/Task_manager";
import Meter_reading from "./pages/Operator/Meter_reading";
import Add_fuel from "./pages/Operator/Add_fuel";
import View_salary from "./pages/Operator/View_salary";
import Co_dashboard from "./pages/Coordinator/Co_dashboard";
import View_task from "./pages/Coordinator/View_task";
import Create_task from "./pages/Coordinator/Create_task";
import Edit_task from "./pages/Coordinator/Edit_task";
import Delete_task from "./pages/Coordinator/Delete_task";
import View_main_database from "./pages/Coordinator/View_main_database";
import Add_db_record from "./pages/Coordinator/Add_db_record";
import Edit_db_record from "./pages/Coordinator/Edit_db_record";
import Delete_db_record from "./pages/Coordinator/Delete_db_record";
import View_machine from "./pages/Coordinator/View_machine";
import Add_machine from "./pages/Coordinator/Add_machine";
import Edit_machine from "./pages/Coordinator/Edit_machine";
import Delete_machine from "./pages/Coordinator/Delete_machine";
import View_customer from "./pages/Coordinator/View_customer";
import Add_customer from "./pages/Coordinator/Add_customer";
import Edit_customer from "./pages/Coordinator/Edit_customer";
import Delete_customer from "./pages/Coordinator/Delete_customer";
import ViewReport from "./pages/Coordinator/ViewReport";

// App component function
function App() {
  // Checking for token and role in local storage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // useEffect hook to redirect user based on their role
  // Uncomment this block of code if automatic redirection is required
  // useEffect(() => {
  //   console.log(token, role);
  //   if (role === "admin") {
  //     navigate("/Co_dashboard");
  //   } else {
  //     navigate("/Op_dashboard");
  //   }
  // }, []);

  // Rendering the App component
  return (
    <div className="App">
      {/* Using SnackbarProvider to show snackbars for notifications */}
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        {/* Declaring the routes for the application */}
        <Routes>
          {/* Each Route component is matched to a specific path and renders the corresponding component */}
          {/* Public routes */}
          <Route path="/" element={<Sign_in />} />
          <Route path="/Sign_up" element={<Sign_up />} />

          {/* Operator routes */}
          <Route path="/Op_dashboard" element={<Op_dashboard />} />
          <Route path="/Task_manager" element={<Task_manager />} />
          <Route path="/Meter_reading" element={<Meter_reading />} />
          <Route path="/Add_fuel" element={<Add_fuel />} />
          <Route path="/View_salary" element={<View_salary />} />

          {/* Coordinator routes */}
          <Route path="/Co_dashboard" element={<Co_dashboard />} />
          <Route path="/View_task" element={<View_task />} />
          <Route path="/Create_task" element={<Create_task />} />
          <Route path="/Edit_task" element={<Edit_task />} />
          <Route path="/Delete_task" element={<Delete_task />} />
          <Route path="/View_main_database" element={<View_main_database />} />
          <Route path="/Add_db_record" element={<Add_db_record />} />
          <Route path="/Edit_db_record" element={<Edit_db_record />} />
          <Route path="/Delete_db_record" element={<Delete_db_record />} />
          <Route path="/View_machine" element={<View_machine />} />
          <Route path="/Add_machine" element={<Add_machine />} />
          <Route path="/Edit_machine" element={<Edit_machine />} />
          <Route path="/Delete_machine" element={<Delete_machine />} />
          <Route path="/View_customer" element={<View_customer />} />
          <Route path="/Add_customer" element={<Add_customer />} />
          <Route path="/Edit_customer" element={<Edit_customer />} />
          <Route path="/Delete_customer" element={<Delete_customer />} />
          <Route path="/ViewReport" element={<ViewReport />} />

          {/* Route for user's profile */}
          <Route path="/Profile" element={<My_profile />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

// Exporting the App component as the default export of this module
export default App;
