import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const navLinks = (
        <>
            <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Home</NavLink>
            <NavLink to="/all-pets" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>All Pets</NavLink>
            {user && (
                <>
                    <NavLink to="/add-pet" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Add Pet</NavLink>
                    <NavLink to="/my-added-pets" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>My Added Pets</NavLink>
                    <NavLink to="/my-requests" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>My Requests</NavLink>
                    <NavLink to="/manage-requests" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Manage Requests</NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600">PetAdopt</Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks}
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/M9F50G1/default-user.png"}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                                    title={user?.displayName || user?.email}
                                />
                                <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">Login</Link>
                        )}

                        <button
                            className="md:hidden text-gray-600 focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden flex flex-col space-y-3 pb-4 pt-2 border-t border-gray-100"
                        onClick={() => setMenuOpen(false)}
                    >
                        {navLinks}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;