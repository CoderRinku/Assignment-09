const Home = () => {
    return (
        <div>
            <div className="bg-blue-50 py-20 text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">Give a Pet a Loving Home</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Thousands of pets are waiting for a family. Browse our available pets and find your perfect companion today.</p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition">Adopt Now</button>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Pets</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="border p-8 rounded-lg shadow-sm text-center text-gray-500 bg-white">
                        Featured Pets Coming Soon...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;