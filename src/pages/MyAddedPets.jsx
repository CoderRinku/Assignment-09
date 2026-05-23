import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyAddedPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/my-pets?email=roknusjamanrinku1@gmail.com')
            .then(res => res.json())
            .then(data => setPets(data));
    }, []);
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
                                    <button className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-blue-600 transition">
                                        Update
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-red-600 transition">
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