import React from 'react';
import Navbar from './Navbar';
import Footer from './footer'
const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto mt-8 p-4">
        <h2 className="text-3xl font-semibold mb-4">Welcome to Your Inventory System</h2>
        <p className="mb-4">Here you can manage your products, categories, and generate reports.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Low Stock Items</h3>
            <p className="text-3xl font-bold text-yellow-600">23</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Out of Stock</h3>
            <p className="text-3xl font-bold text-red-600">5</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;