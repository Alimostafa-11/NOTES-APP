import { useContext } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserProvider, { userContext } from "./context/user.context";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

function AppRoutes() {
  let { token } = useContext(userContext);

  let route = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: token ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/register" />
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

function App() {
  return (
    <UserProvider>
      <AppRoutes />
      <Toaster />
    </UserProvider>
  );
}

export default App;
