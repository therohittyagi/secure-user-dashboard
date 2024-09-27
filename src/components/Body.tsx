import React from "react";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";

interface Route {
  path: string;
  element: React.ReactNode;
}

const routes: Route[] = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

const appRouter = createBrowserRouter(routes);

const Body: React.FC = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
