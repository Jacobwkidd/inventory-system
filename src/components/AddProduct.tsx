import React, { useState } from 'react';
import Navbar from './Navbar';

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    color: '',
    price: '',
    weight: '',
    costToMake: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const calculateProfit = () => {
    const price = parseFloat(product.price);
    const costToMake = parseFloat(product.costToMake);
    if (!isNaN(price) && !isNaN(costToMake)) {
      return (price - costToMake).toFixed(2);
    }
    return '0.00';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the product data to your backend
    console.log('Product to add:', product);
    console.log('Profit per item:', calculateProfit());
    // Reset form or navigate to another page
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-semibold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={product.color}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (lb)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required />
        </div>

        <div className="mb-4">
          <label htmlFor="costToMake" className="block text-sm font-medium text-gray-700">Cost to Make ($)</label>
          <input
            type="number"
            id="costToMake"
            name="costToMake"
            value={product.costToMake}
            onChange={handleChange}
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Profit per Item</label>
          <p className="mt-1 text-2xl font-bold text-green-600">${calculateProfit()}</p>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
    </div></>
  );
};

export default AddProduct;