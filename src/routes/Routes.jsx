import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AddPet from "../pages/AddPet";
import AllPets from "../pages/AllPets";
import PetDetails from "../pages/PetDetails";
import MyRequests from "../pages/MyRequests";
import MyAddedPets from "../pages/MyAddedPets";
import UpdatePet from "../pages/UpdatePet";
import PrivateRoute from "./PrivateRoute";
import { API_URL } from "../config";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/all-pets",
                element: <AllPets />
            },
            {
                path: "/pet/:id",
                element: <PrivateRoute><PetDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`${API_URL}/pets/${params.id}`)
            },
            {
                path: "/update-pet/:id",
                element: <PrivateRoute><UpdatePet /></PrivateRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <MyAddedPets />
            },
            {
                path: "add-pet",
                element: <AddPet />
            },
            {
                path: "my-requests",
                element: <MyRequests />
            },
            {
                path: "my-listings",
                element: <MyAddedPets />
            }
        ]
    }
]);

export default router;