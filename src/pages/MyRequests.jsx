import { useEffect, useState } from "react";

const MyRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/requests')
            .then(res => res.json())
            .then(data => setRequests(data));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 mt-8 mb-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">My Adoption Requests</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-700">
                            <th className="p-4 border-b">Pet Image</th>
                            <th className="p-4 border-b">Pet Name</th>
                            <th className="p-4 border-b">Phone Number</th>
                            <th className="p-4 border-b">Address</th>
                            <th className="p-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id} className="hover:bg-gray-50 transition border-b">
                                <td className="p-4">
                                    <img src={req.petImage} alt={req.petName} className="w-16 h-16 object-cover rounded-md" />
                                </td>
                                <td className="p-4 font-bold text-gray-800">{req.petName}</td>
                                <td className="p-4 text-gray-600">{req.phone}</td>
                                <td className="p-4 text-gray-600">{req.address}</td>
                                <td className="p-4">
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-bold capitalize">
                                        {req.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRequests;
