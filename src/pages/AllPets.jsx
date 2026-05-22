import { useEffect, useState } from "react";

const AllPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/pets')
            .then(res => res.json())
            .then(data => setPets(data));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 mt-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">All Pets Ready for Adoption</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pets.map(pet => (
                    <div key={pet._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                        <img src={pet.image} alt={pet.name} className="w-full h-56 object-cover rounded-md mb-4" />
                        <h3 className="text-2xl font-bold mb-2">{pet.name}</h3>
                        <p className="text-gray-600 mb-1"><span className="font-semibold text-gray-800">Category:</span> {pet.category}</p>
                        <p className="text-gray-600 mb-1"><span className="font-semibold text-gray-800">Age:</span> {pet.age}</p>
                        <p className="text-gray-600 mb-4"><span className="font-semibold text-gray-800">Location:</span> {pet.location}</p>
                        <button className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 transition">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPets;