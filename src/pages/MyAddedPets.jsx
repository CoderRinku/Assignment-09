import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const MyAddedPets = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/my-pets?email=${user.email}`)
                .then(res => res.json())
                .then(data => setPets(data));
        }
    }, [user]);

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
                fetch(`http://localhost:5000/pets/${id}`, {
                    method: 'DELETE'
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
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-700">
                            <th className="p-4 border-b">Pet Image</th>
                            <th className="p-4 border-b">Pet Name</th>
                            <th className="p-4 border-b">Category</th>
                            <th className="p-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map(pet => (
                            <tr key={pet._id} className="hover:bg-gray-50 transition border-b">
                                <td className="p-4">
                                    <img src={pet.image} alt={pet.name} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                                <td className="p-4 font-bold text-gray-800">{pet.name}</td>
                                <td className="p-4 text-gray-600">{pet.category}</td>
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
        </div>
    );
};

export default MyAddedPets;