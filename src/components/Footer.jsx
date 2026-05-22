const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Pet Adoption Platform</h2>
                <p className="mb-4">Find your new best friend today and save a life.</p>
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" className="hover:text-blue-400">Facebook</a>
                    <a href="#" className="hover:text-blue-400">Twitter</a>
                    <a href="#" className="hover:text-blue-400">Instagram</a>
                </div>
                <p className="text-sm text-gray-400">© 2026 PetAdopt. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;