import React, { useEffect } from "react";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./userContext";
import DashBoard from "./components/DashBoard";
import Edit from "./components/Edit";
import Profile from "./components/Profile";
import AddExpense from "./components/AddExpense";
import SingleProfile from "./components/SingleProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/new",
    element: <AddExpense />,
  },
  {
    path: "/profile/:id",
    element: <SingleProfile />,
  },
]);
const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  );
};

export default App;
