import React from "react";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";

// Define the layout component that includes the header
const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      {/* Outlet will render the routed components */}
      <div className="pt-16"> {/* Add padding if needed to ensure content doesn't overlap with Header */}
        <Outlet />
      </div>
    </div>
  );
};

// Define routes with the layout
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main layout with header
    children: [
      { path: "/", element: <SignIn /> }, // SignIn will render within the layout
      { path: "/signup", element: <SignUp /> }, // SignUp within the layout
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const Body: React.FC = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default Body;
