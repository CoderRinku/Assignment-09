import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-white shadow-md flex flex-col border-r">
                <div className="p-6 border-b">
                    <Link to="/" className="text-2xl font-bold text-blue-600">Dashboard</Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/dashboard/add-pet"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 rounded-lg font-medium transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            }`
                        }
                    >
                        Add Pet
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-listings"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 rounded-lg font-medium transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            }`
                        }
                    >
                        My Listings
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-requests"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 rounded-lg font-medium transition ${
                                isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                            }`
                        }
                    >
                        My Requests
                    </NavLink>
                    <div className="border-t my-4 pt-4">
                        <Link
                            to="/"
                            className="flex items-center px-4 py-2.5 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition"
                        >
                            Back to Home
                        </Link>
                    </div>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
