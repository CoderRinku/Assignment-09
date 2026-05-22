import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const PetDetails = () => {
    const pet = useLoaderData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdoptSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const phone = form.phone.value;
        const address = form.address.value;

        
        const requestData = {
            petId: pet._id,
            petName: pet.name,
            petImage: pet.image,
            phone: phone,
            address: address,
            status: "pending" 
        };

       
        fetch('http://localhost:5000/requests', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert("Adoption Request Submitted Successfully!");
                setIsModalOpen(false); 
                form.reset(); 
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-8 mb-12">
            <div className="border rounded-lg overflow-hidden shadow-md bg-white relative">
                <img src={pet.image} alt={pet.name} className="w-full h-96 object-cover" />
                <div className="p-6">
                    <h2 className="text-4xl font-bold mb-4">{pet.name}</h2>
                    <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-800">Category:</span> {pet.category}</p>
                    <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-800">Age:</span> {pet.age}</p>
                    <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-800">Location:</span> {pet.location}</p>
                    <p className="text-gray-600 mt-6 mb-6">{pet.shortDescription}</p>
                    
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-green-600 text-white py-3 rounded-md text-xl font-semibold hover:bg-green-700 transition"
                    >
                        Adopt {pet.name}
                    </button>
                </div>
            </div>

            {/* Modal Section */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
                        >
                            ✕
                        </button>
                        
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Adopt {pet.name}</h3>
                        
                        <form onSubmit={handleAdoptSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    placeholder="Enter your phone number" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                                    required 
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                                <textarea 
                                    name="address" 
                                    placeholder="Enter your full address" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                                    rows="3" 
                                    required 
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full bg-green-600 text-white py-2.5 rounded-md font-bold hover:bg-green-700 transition"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetails;