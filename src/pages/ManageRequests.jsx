import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const ManageRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchRequests();
        }
    }, [user]);

    const fetchRequests = () => {
        setLoading(true);
        fetch(`http://localhost:5000/requests?ownerEmail=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setRequests(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleStatusUpdate = (requestId, petId, newStatus) => {
        const actionLabel = newStatus === "accepted" ? "Accept" : "Reject";
        const actionColor = newStatus === "accepted" ? "#22c55e" : "#ef4444";

        Swal.fire({
            title: `${actionLabel} this request?`,
            text: newStatus === "accepted"
                ? "The pet will be marked as adopted."
                : "This request will be rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: actionColor,
            cancelButtonColor: "#6b7280",
            confirmButtonText: `Yes, ${actionLabel}`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/requests/${requestId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus, petId }),
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: `Request ${actionLabel}ed!`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        fetchRequests();
                    });
            }
        });
    };

    const getStatusBadge = (status) => {
        if (status === "accepted") {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Accepted</span>;
        }
        if (status === "rejected") {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Rejected</span>;
        }
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>;
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Manage Adoption Requests</h2>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : requests.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-semibold">No adoption requests yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="w-full text-sm text-left bg-white">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Pet Name</th>
                                <th className="px-6 py-4">Requester</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {requests.map((req, index) => (
                                <tr key={req._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">{req.petName}</td>
                                    <td className="px-6 py-4 text-gray-700">{req.requesterName}</td>
                                    <td className="px-6 py-4 text-gray-600">{req.requesterEmail}</td>
                                    <td className="px-6 py-4 text-gray-600">{req.phone}</td>
                                    <td className="px-6 py-4 text-gray-600">{req.address}</td>
                                    <td className="px-6 py-4">{getStatusBadge(req.status)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleStatusUpdate(req._id, req.petId, "accepted")}
                                                disabled={req.status !== "pending"}
                                                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-md transition disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(req._id, req.petId, "rejected")}
                                                disabled={req.status !== "pending"}
                                                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-md transition disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Reject
                                            </button>
                                        </div>
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

export default ManageRequests;