// Importing necessary dependencies from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main App component and the main CSS file
import './index.css';
import App from './App';

// Importing necessary components and functions from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Using ReactDOM.createRoot to create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application inside the root using React.StrictMode
root.render(
  <React.StrictMode>
    {/* Wrapping the application with BrowserRouter to enable client-side routing */}
    <BrowserRouter>
      {/* Defining the routes for the application using Routes */}
      <Routes>
        {/* A catch-all Route that renders the main App component for all paths */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
