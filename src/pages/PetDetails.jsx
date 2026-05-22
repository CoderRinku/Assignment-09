import { useLoaderData } from "react-router-dom";

const PetDetails = () => {
    const pet = useLoaderData();

    return (
        <div className="max-w-4xl mx-auto p-6 mt-8 mb-12">
            <div className="border rounded-lg overflow-hidden shadow-md bg-white">
                <img src={pet.image} alt={pet.name} className="w-full h-96 object-cover" />
                <div className="p-6">
                    <h2 className="text-4xl font-bold mb-4">{pet.name}</h2>
                    <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-800">Category:</span> {pet.category}</p>
                    <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-800">Age:</span> {pet.age}</p>
                    <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-800">Location:</span> {pet.location}</p>
                    <p className="text-gray-600 mt-6 mb-6">{pet.shortDescription}</p>
                    
                    <button className="w-full bg-green-600 text-white py-3 rounded-md text-xl font-semibold hover:bg-green-700 transition">
                        Adopt {pet.name}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;