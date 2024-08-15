import { createBrowserRouter, redirect } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import MainLayout from "../layouts/MainLayout";
import SelectConversation from "../pages/SelectConversation";
import Conversation from "../components/Conversation";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/messages"),
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/messages",
    element: <ProtectedRoute element={<MainLayout />} />,
    children: [
      {
        path: "",
        element: <SelectConversation />,
      },
      {
        path: ":id",
        element: <Conversation />,
      },
    ],
  },
]);

export default router;
