import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
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
                path: "/add-pet",
                element: <PrivateRoute><AddPet /></PrivateRoute>
            },
            {
                path: "/pet/:id",
                element: <PrivateRoute><PetDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/pets/${params.id}`)
            },
            {
                path: "/my-requests",
                element: <PrivateRoute><MyRequests /></PrivateRoute>
            },
            {
                path: "/my-added-pets",
                element: <PrivateRoute><MyAddedPets /></PrivateRoute>
            },
            {
                path: "/update-pet/:id",
                element: <PrivateRoute><UpdatePet /></PrivateRoute>
            }
        ]
    }
]);

export default router;