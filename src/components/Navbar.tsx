import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">HR and Inventory System</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
          <li><Link to="/products" className="hover:text-blue-200">Products</Link></li>
          <li><Link to="/categories" className="hover:text-blue-200">Categories</Link></li>
          <li><Link to="/reports" className="hover:text-blue-200">Reports</Link></li>
          <li><Link to="/Employment" className="hover:text-blue-200">Employment</Link></li>
          <li><Link to="/Employment" className="hover:text-blue-200">Sign Out</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;