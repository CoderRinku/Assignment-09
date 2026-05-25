import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const UpdatePet = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [petData, setPetData] = useState({
        name: '',
        age: '',
        category: '',
        location: '',
        shortDescription: '',
        longDescription: '',
        image: ''
    });

    useEffect(() => {
        fetch(`${API_URL}/pets/${id}`)
            .then(res => res.json())
            .then(data => setPetData(data));
    }, [id]);

    const handleChange = (e) => {
        setPetData({
            ...petData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { _id, ...updatedData } = petData;
        const token = localStorage.getItem("token");
        fetch(`${API_URL}/pets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Pet updated successfully!',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setTimeout(() => {
                        navigate('/dashboard/my-listings');
                    }, 2000);
                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Update Pet Information</h2>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-5">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Pet Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={petData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Pet Age</label>
                    <input 
                        type="text" 
                        name="age"
                        value={petData.age}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Pet Category</label>
                    <select 
                        name="category"
                        value={petData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Pet Location</label>
                    <input 
                        type="text" 
                        name="location"
                        value={petData.location}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Short Description</label>
                    <input 
                        type="text" 
                        name="shortDescription"
                        value={petData.shortDescription}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Long Description</label>
                    <textarea 
                        name="longDescription"
                        value={petData.longDescription}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Pet Image URL</label>
                    <input 
                        type="text" 
                        name="image"
                        value={petData.image}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md font-bold text-lg hover:bg-blue-600 transition"
                >
                    Update Pet
                </button>
            </form>
        </div>
    );
};

export default UpdatePet;