import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const Home = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/pets`)
            .then(res => res.json())
            .then(data => {
                setPets(data.slice(0, 6));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="bg-blue-50 dark:bg-gray-850 py-24 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-6 tracking-tight">Give a Pet a Loving Home</h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto px-4">Thousands of pets are waiting for a family. Browse our available pets and find your perfect companion today.</p>
                <Link to="/all-pets">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full text-lg font-semibold shadow-lg transition duration-300">Adopt Now</button>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white tracking-tight">Featured Pets</h2>
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : pets.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-semibold">No featured pets available right now</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pets.map(pet => (
                            <div key={pet._id} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col">
                                <img src={pet.image} alt={pet.name} className="w-full h-64 object-cover" />
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{pet.name}</h3>
                                    <div className="space-y-1 mb-6 text-gray-600 dark:text-gray-300 flex-grow">
                                        <p><span className="font-semibold text-gray-800 dark:text-white">Breed:</span> {pet.category}</p>
                                        <p><span className="font-semibold text-gray-800 dark:text-white">Age:</span> {pet.age}</p>
                                        <p><span className="font-semibold text-gray-800 dark:text-white">Location:</span> {pet.location}</p>
                                    </div>
                                    <Link to={`/pet/${pet._id}`}>
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition duration-300">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 py-20 border-t dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white tracking-tight">Why Adopt Pets?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm border dark:border-gray-600">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Unconditional Love</h3>
                            <p className="text-gray-600 dark:text-gray-300">Adopted pets bring immense joy and a lifetime of affection, gratitude, and true companionship to your family.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm border dark:border-gray-600">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Save a Life</h3>
                            <p className="text-gray-600 dark:text-gray-300">By choosing to adopt instead of buying, you give a deserving animal a second chance at life and a secure home.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm border dark:border-gray-600">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Stop Puppy Mills</h3>
                            <p className="text-gray-600 dark:text-gray-300">Adopting directly discourages commercial breeding facilities that prioritize profit over animal welfare.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white tracking-tight">Happy Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700 flex flex-col sm:flex-row gap-6">
                        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300&h=300" alt="Bella" className="w-full sm:w-40 h-40 object-cover rounded-xl" />
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-850 dark:text-white">Bella & The Smith Family</h3>
                            <p className="text-gray-600 dark:text-gray-350 italic mb-4">"Bella has completely transformed our lives. From the moment we brought her home, she filled our days with happiness and warmth."</p>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">- Adopted in March 2026</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700 flex flex-col sm:flex-row gap-6">
                        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300&h=300" alt="Milo" className="w-full sm:w-40 h-40 object-cover rounded-xl" />
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-850 dark:text-white">Milo & Oliver</h3>
                            <p className="text-gray-600 dark:text-gray-350 italic mb-4">"Milo was extremely shy at first, but with a lot of patience and love, he has blossomed into the most friendly and playful cat."</p>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">- Adopted in January 2026</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-gray-850 py-20 border-t dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white tracking-tight">Essential Pet Care Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border dark:border-gray-600">
                            <h3 className="text-lg font-bold mb-2 text-gray-855 dark:text-white">1. Balanced Diet</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Provide nutritious, species-appropriate food and maintain fresh water accessibility at all times.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border dark:border-gray-600">
                            <h3 className="text-lg font-bold mb-2 text-gray-855 dark:text-white">2. Routine Checkups</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Schedule regular visits with a certified veterinarian for vaccinations, dental health, and preventive checks.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border dark:border-gray-600">
                            <h3 className="text-lg font-bold mb-2 text-gray-855 dark:text-white">3. Daily Exercise</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Engage your pets in daily play, walks, and mental stimulation activities to keep them fit and energetic.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border dark:border-gray-600">
                            <h3 className="text-lg font-bold mb-2 text-gray-855 dark:text-white">4. Comfortable Rest</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Set up a warm, dedicated, and clean sleeping area to help them rest comfortably and feel safe.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;