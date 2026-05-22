import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <p className="text-2xl font-semibold text-gray-800 mt-4">Oops! Page not found.</p>
            <p className="text-gray-500 mt-2 mb-8">The page you are looking for doesn't exist or has been moved.</p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;