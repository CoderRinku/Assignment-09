import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const AddPet = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddPet = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const age = form.age.value;
        const category = form.category.value;
        const location = form.location.value;
        const image = form.image.value;
        const shortDescription = form.shortDescription.value;

        const petData = {
            name,
            age,
            category,
            location,
            image,
            shortDescription,
            adopted: false,
            dateAdded: new Date(),
            authorEmail: user?.email,
            authorName: user?.displayName
        };

        const token = localStorage.getItem("token");
        fetch(`${API_URL}/pets`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(petData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Pet added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
                navigate("/dashboard/my-listings");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-md shadow-md mt-10 mb-10 border">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Add a New Pet</h2>
            <form onSubmit={handleAddPet} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="name" placeholder="Pet Name" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="number" name="age" placeholder="Pet Age (Months/Years)" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" name="category" placeholder="Category (e.g., Dog, Cat, Bird)" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="text" name="location" placeholder="Location" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <input type="url" name="image" placeholder="Pet Image URL" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <textarea name="shortDescription" placeholder="Short Description" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" required></textarea>
                
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition">
                    Submit Pet
                </button>
            </form>
        </div>
    );
};

export default AddPet;