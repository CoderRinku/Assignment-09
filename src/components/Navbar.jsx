import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const navLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-blue-600"}>Home</NavLink>
            <NavLink to="/all-pets" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-blue-600"}>All Pets</NavLink>
            {user && (
                <>
                    <NavLink to="/dashboard/add-pet" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-blue-600"}>Add Pet</NavLink>
                    <NavLink to="/dashboard/my-requests" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-blue-600"}>My Requests</NavLink>
                </>
            )}
        </>
    );

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">PetAdopt</Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks}
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                            {theme === "light" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.25-8.25h-2.25M5.25 12H3m16.125-6.125L17.72 7.72M7.72 17.72l-1.57 1.57m12.72 0-1.57-1.57M7.72 7.72 6.15 6.15m10.8 5.65a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                                </svg>
                            )}
                        </button>

                        {user ? (
                            <div className="relative">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/M9F50G1/default-user.png"}
                                    alt="profile"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-50 border dark:border-gray-600">
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 font-semibold truncate">
                                            {user?.displayName || "User"}
                                        </div>
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                handleLogOut();
                                            }}
                                            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">Login</Link>
                        )}

                        <button
                            className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
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
                    <div className="md:hidden flex flex-col space-y-3 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700"
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