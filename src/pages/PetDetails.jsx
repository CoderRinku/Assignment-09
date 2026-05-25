import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const PetDetails = () => {
    const pet = useLoaderData();
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleAdoptSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const pickupDate = form.pickupDate.value;
        const message = form.message.value;

        if (user?.email === pet.authorEmail) {
            Swal.fire({
                icon: "error",
                title: "Action Denied",
                text: "Pet owners cannot adopt their own pets."
            });
            return;
        }

        const requestData = {
            petId: pet._id,
            petName: pet.name,
            petImage: pet.image,
            petAuthorEmail: pet.authorEmail,
            requesterName: user?.displayName || "User",
            requesterEmail: user?.email,
            pickupDate,
            message,
            status: "pending",
            requestDate: new Date().toLocaleDateString()
        };

        const token = localStorage.getItem("token");
        fetch(`${API_URL}/requests`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Submitted!",
                    text: "Adoption request submitted successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsModalOpen(false);
                form.reset();
                navigate("/dashboard/my-requests");
            }
        });
    };

    const isOwner = user?.email === pet.authorEmail;
    const isAdopted = pet.adopted === true || pet.adopted === "adopted";

    return (
        <div className="max-w-4xl mx-auto p-6 mt-8 mb-12">
            <div className="border rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 relative">
                <img src={pet.image} alt={pet.name} className="w-full h-96 object-cover" />
                <div className="p-6">
                    <h2 className="text-4xl font-bold mb-4 text-gray-850 dark:text-white">{pet.name}</h2>
                    <p className="text-lg text-gray-750 dark:text-gray-300 mb-2"><span className="font-semibold text-gray-850 dark:text-white">Category:</span> {pet.category}</p>
                    <p className="text-lg text-gray-750 dark:text-gray-300 mb-2"><span className="font-semibold text-gray-850 dark:text-white">Age:</span> {pet.age}</p>
                    <p className="text-lg text-gray-750 dark:text-gray-300 mb-2"><span className="font-semibold text-gray-850 dark:text-white">Location:</span> {pet.location}</p>
                    <p className="text-gray-650 dark:text-gray-400 mt-6 mb-6">{pet.shortDescription}</p>
                    
                    {isAdopted ? (
                        <button 
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-3 rounded-md text-xl font-semibold cursor-not-allowed"
                        >
                            Already Adopted
                        </button>
                    ) : isOwner ? (
                        <button 
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-3 rounded-md text-xl font-semibold cursor-not-allowed"
                            title="You cannot adopt your own pet"
                        >
                            Adopt (Disabled for Owner)
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-green-600 text-white py-3 rounded-md text-xl font-semibold hover:bg-green-700 transition"
                        >
                            Adopt {pet.name}
                        </button>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative border dark:border-gray-750">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl"
                        >
                            ✕
                        </button>
                        
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Adopt {pet.name}</h3>
                        
                        <form onSubmit={handleAdoptSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-305 font-semibold mb-1 text-sm">Pet Name</label>
                                <input 
                                    type="text" 
                                    value={pet.name}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-350 font-semibold mb-1 text-sm">User Name</label>
                                <input 
                                    type="text" 
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-350 font-semibold mb-1 text-sm">User Email</label>
                                <input 
                                    type="text" 
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-350 font-semibold mb-1 text-sm">Pickup Date</label>
                                <input 
                                    type="date" 
                                    name="pickupDate" 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-350 font-semibold mb-1 text-sm">Message</label>
                                <textarea 
                                    name="message" 
                                    placeholder="Enter your message..." 
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white" 
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