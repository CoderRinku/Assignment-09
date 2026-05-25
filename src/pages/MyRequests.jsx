import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../config";
import Swal from "sweetalert2";

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
        fetch(`${API_URL}/requests?email=${user.email}`, {
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

    const handleCancelRequest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will cancel this adoption request!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                fetch(`${API_URL}/requests/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your request has been cancelled.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setRequests(requests.filter(req => req._id !== id));
                        }
                    });
            }
        });
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
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">My Adoption Requests</h2>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : requests.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-semibold">You have not made any requests yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg border dark:border-gray-700">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-750 text-left text-gray-700 dark:text-gray-250">
                                <th className="p-4 border-b dark:border-gray-700">#</th>
                                <th className="p-4 border-b dark:border-gray-700">Pet Name</th>
                                <th className="p-4 border-b dark:border-gray-700">Request Date</th>
                                <th className="p-4 border-b dark:border-gray-700">Pickup Date</th>
                                <th className="p-4 border-b dark:border-gray-700">Status</th>
                                <th className="p-4 border-b dark:border-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req, index) => (
                                <tr key={req._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition border-b dark:border-gray-700">
                                    <td className="p-4 text-gray-500 dark:text-gray-400">{index + 1}</td>
                                    <td className="p-4 font-bold text-gray-800 dark:text-white">{req.petName}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">{req.requestDate || "N/A"}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">{req.pickupDate || "N/A"}</td>
                                    <td className="p-4">{getStatusBadge(req.status)}</td>
                                    <td className="p-4 space-x-3">
                                        <Link to={`/pet/${req.petId}`}>
                                            <button className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-blue-600 transition">
                                                View
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleCancelRequest(req._id)}
                                            className="bg-red-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-red-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    </td>
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