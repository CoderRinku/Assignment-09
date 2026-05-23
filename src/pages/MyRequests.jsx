import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchMyRequests();
        }
    }, [user]);

    const fetchMyRequests = () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5000/requests?email=${user.email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setRequests(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const getStatusBadge = (status) => {
        if (status === "accepted") {
            return <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-bold capitalize">Accepted</span>;
        }
        if (status === "rejected") {
            return <span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-bold capitalize">Rejected</span>;
        }
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-bold capitalize">Pending</span>;
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">My Adoption Requests</h2>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : requests.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-semibold">You have not made any requests yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-700">
                                <th className="p-4 border-b">#</th>
                                <th className="p-4 border-b">Pet Name</th>
                                <th className="p-4 border-b">Phone Number</th>
                                <th className="p-4 border-b">Address</th>
                                <th className="p-4 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, index) => (
                                <tr key={req._id} className="hover:bg-gray-50 transition border-b">
                                    <td className="p-4 text-gray-500">{index + 1}</td>
                                    <td className="p-4 font-bold text-gray-800">{req.petName}</td>
                                    <td className="p-4 text-gray-600">{req.phone}</td>
                                    <td className="p-4 text-gray-600">{req.address}</td>
                                    <td className="p-4">{getStatusBadge(req.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyRequests;