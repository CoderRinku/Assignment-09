import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const MyAddedPets = () => {
    const { user } = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPet, setSelectedPet] = useState(null);
    const [petRequests, setPetRequests] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        if (user?.email) {
            fetchMyPets();
        }
    }, [user]);

    const fetchMyPets = () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        fetch(`${API_URL}/my-pets?email=${user.email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPets(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleOpenRequests = (pet) => {
        setSelectedPet(pet);
        setModalLoading(true);
        const token = localStorage.getItem("token");
        fetch(`${API_URL}/requests?ownerEmail=${user.email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(req => req.petId === pet._id);
                setPetRequests(filtered);
                setModalLoading(false);
            })
            .catch(() => setModalLoading(false));
    };

    const handleRequestAction = (requestId, petId, newStatus) => {
        const actionLabel = newStatus === "accepted" ? "Approve" : "Reject";
        const actionColor = newStatus === "accepted" ? "#22c55e" : "#ef4444";

        Swal.fire({
            title: `Are you sure you want to ${actionLabel.toLowerCase()} this request?`,
            text: newStatus === "accepted"
                ? "This will approve adoption and mark the pet as adopted."
                : "This request will be rejected.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: actionColor,
            cancelButtonColor: "#6b7280",
            confirmButtonText: `Yes, ${actionLabel}`
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                fetch(`${API_URL}/requests/${requestId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status: newStatus, petId })
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: `Request ${newStatus}!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        handleOpenRequests(selectedPet);
                        fetchMyPets();
                    });
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                fetch(`${API_URL}/pets/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Pet has been deleted successfully.',
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });
                            setPets(pets.filter(pet => pet._id !== id));
                        }
                    });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">My Added Pets</h2>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : pets.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-semibold">You have not added any pets yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg border dark:border-gray-700">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200">
                                <th className="p-4 border-b dark:border-gray-750">#</th>
                                <th className="p-4 border-b dark:border-gray-750">Pet Image</th>
                                <th className="p-4 border-b dark:border-gray-750">Pet Name</th>
                                <th className="p-4 border-b dark:border-gray-750">Category</th>
                                <th className="p-4 border-b dark:border-gray-750">Status</th>
                                <th className="p-4 border-b dark:border-gray-750">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet, index) => (
                                <tr key={pet._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition border-b dark:border-gray-750">
                                    <td className="p-4 text-gray-500 dark:text-gray-400">{index + 1}</td>
                                    <td className="p-4">
                                        <img src={pet.image} alt={pet.name} className="w-16 h-16 object-cover rounded-md" />
                                    </td>
                                    <td className="p-4 font-bold text-gray-800 dark:text-white">{pet.name}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">{pet.category}</td>
                                    <td className="p-4">
                                        {pet.adopted === true || pet.adopted === "adopted" ? (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Adopted</span>
                                        ) : (
                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Available</span>
                                        )}
                                    </td>
                                    <td className="p-4 space-x-2">
                                        <button
                                            onClick={() => handleOpenRequests(pet)}
                                            className="bg-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-bold hover:bg-purple-750 transition"
                                        >
                                            Requests
                                        </button>
                                        <Link to={`/update-pet/${pet._id}`}>
                                            <button className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm font-bold hover:bg-blue-600 transition">
                                                Update
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pet._id)}
                                            className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-bold hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedPet && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-3xl relative border dark:border-gray-700 max-h-[85vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedPet(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Adoption Requests for {selectedPet.name}</h3>

                        {modalLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : petRequests.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">No requests for this pet yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                        <tr>
                                            <th className="p-3">User Name</th>
                                            <th className="p-3">User Email</th>
                                            <th className="p-3">Pickup Date</th>
                                            <th className="p-3">Message</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-gray-700">
                                        {petRequests.map((req) => (
                                            <tr key={req._id} className="dark:text-gray-300">
                                                <td className="p-3">{req.requesterName}</td>
                                                <td className="p-3">{req.requesterEmail}</td>
                                                <td className="p-3">{req.pickupDate}</td>
                                                <td className="p-3 truncate max-w-[150px]" title={req.message}>{req.message}</td>
                                                <td className="p-3 font-semibold capitalize">{req.status}</td>
                                                <td className="p-3 text-center">
                                                    {req.status === "pending" ? (
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                onClick={() => handleRequestAction(req._id, req.petId, "accepted")}
                                                                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-bold transition"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleRequestAction(req._id, req.petId, "rejected")}
                                                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-bold transition"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold">Processed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddedPets;