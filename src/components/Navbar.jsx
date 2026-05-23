import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    return (
        <div className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600">PetAdopt</Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Home</NavLink>
                        <NavLink to="/all-pets" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>All Pets</NavLink>
                        {user && (
                            <>
                                <NavLink to="/add-pet" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Add Pet</NavLink>
                                <NavLink to="/my-added-pets" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>My Added Pets</NavLink>
                                <NavLink to="/my-requests" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>My Requests</NavLink>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <img src={user?.photoURL || "https://i.ibb.co/M9F50G1/default-user.png"} alt="profile" className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer" />
                                <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;