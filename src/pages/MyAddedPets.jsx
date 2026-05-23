import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const MyAddedPets = () => {
    const { user } = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchMyPets();
        }
    }, [user]);

    const fetchMyPets = () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        fetch(`http://localhost:5000/my-pets?email=${user.email}`, {
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
                fetch(`http://localhost:5000/pets/${id}`, {
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
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">My Added Pets</h2>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : pets.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-semibold">You have not added any pets yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-700">
                                <th className="p-4 border-b">#</th>
                                <th className="p-4 border-b">Pet Image</th>
                                <th className="p-4 border-b">Pet Name</th>
                                <th className="p-4 border-b">Category</th>
                                <th className="p-4 border-b">Status</th>
                                <th className="p-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet, index) => (
                                <tr key={pet._id} className="hover:bg-gray-50 transition border-b">
                                    <td className="p-4 text-gray-500">{index + 1}</td>
                                    <td className="p-4">
                                        <img src={pet.image} alt={pet.name} className="w-16 h-16 object-cover rounded-md" />
                                    </td>
                                    <td className="p-4 font-bold text-gray-800">{pet.name}</td>
                                    <td className="p-4 text-gray-600">{pet.category}</td>
                                    <td className="p-4">
                                        {pet.adopted === true || pet.adopted === "adopted" ? (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Adopted</span>
                                        ) : (
                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Available</span>
                                        )}
                                    </td>
                                    <td className="p-4 space-x-3">
                                        <Link to={`/update-pet/${pet._id}`}>
                                            <button className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-blue-600 transition">
                                                Update
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pet._id)}
                                            className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-red-600 transition">
                                            Delete
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

export default MyAddedPets;