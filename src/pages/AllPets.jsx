import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const AllPets = () => {
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPets();
    }, [search, category]);

    const fetchPets = () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);

        fetch(`${API_URL}/pets?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setPets(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">All Pets Ready for Adoption</h2>

            <div className="bg-white p-5 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by pet name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
                >
                    <option value="">All Categories</option>
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : pets.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl text-gray-500 font-semibold">No pets found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pets.map(pet => (
                        <div key={pet._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                            <img src={pet.image} alt={pet.name} className="w-full h-56 object-cover rounded-md mb-4" />
                            <h3 className="text-2xl font-bold mb-2">{pet.name}</h3>
                            <p className="text-gray-600 mb-1"><span className="font-semibold text-gray-800">Category:</span> {pet.category}</p>
                            <p className="text-gray-600 mb-1"><span className="font-semibold text-gray-800">Age:</span> {pet.age}</p>
                            <p className="text-gray-600 mb-4"><span className="font-semibold text-gray-800">Location:</span> {pet.location}</p>

                            {pet.adopted === true || pet.adopted === "adopted" ? (
                                <button disabled className="w-full bg-gray-300 text-gray-500 py-2.5 rounded-md font-semibold cursor-not-allowed">
                                    Already Adopted
                                </button>
                            ) : (
                                <Link to={`/pet/${pet._id}`}>
                                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 transition">
                                        View Details
                                    </button>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllPets;