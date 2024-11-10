import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer';

interface ProductDetail {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sellPrice: number;
  costToMake: number;
  weight: number;
  timeToMake: number;
  taxes: number;
  inventoryCount: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState<ProductDetail>({
    id: id || '0',
    title: 'Sample Product',
    description: 'This is a sample product description.',
    imageUrl: 'https://via.placeholder.com/200',
    sellPrice: 100,
    costToMake: 50,
    weight: 24, // 1 pound 8 ounces
    timeToMake: 2.5,
    taxes: 5,
    inventoryCount: 50,
  });

  
  const calculateTaxes = (price: number) => {
    return price * 0.05;
  };

  const handleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
    if (field === 'sellPrice') {
      setProduct({ ...product, taxes: calculateTaxes(product.sellPrice) });
    }
  };

  const handleCancel = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'inventoryCount') {
      setProduct({ ...product, [name]: parseInt(value) });
    } else {
      setProduct({ ...product, [name]: name === 'timeToMake' ? parseFloat(value) : value });
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const pounds = name === 'weightPounds' ? parseInt(value) : Math.floor(product.weight / 16);
    const ounces = name === 'weightOunces' ? parseInt(value) : product.weight % 16;
    const totalOunces = pounds * 16 + ounces;
    setProduct({ ...product, weight: totalOunces });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  const formatWeight = (ounces: number) => {
    const pounds = Math.floor(ounces / 16);
    const remainingOunces = ounces % 16;
    return `${pounds} lb ${remainingOunces} oz`;
  };

  const renderField = (field: string, label: string, type: string = 'text') => {
    if (field === 'weight') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Weight</label>
          {isEditing[field] ? (
            <div>
              <input
                type="number"
                name="weightPounds"
                value={Math.floor(product.weight / 16)}
                onChange={handleWeightChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                min="0"
              /> lbs
              <input
                type="number"
                name="weightOunces"
                value={product.weight % 16}
                onChange={handleWeightChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                min="0"
                max="15"
              /> oz
              <div className="mt-2">
                <button onClick={() => handleSave(field)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Save
                </button>
                <button onClick={() => handleCancel(field)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{formatWeight(product.weight)}</span>
              <button onClick={() => handleEdit(field)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        {isEditing[field] ? (
          <div>
            <input
              type={type}
              name={field}
              value={product[field as keyof ProductDetail]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              step={type === 'number' ? '0.01' : undefined}
            />
            <div className="mt-2">
              <button onClick={() => handleSave(field)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                Save
              </button>
              <button onClick={() => handleCancel(field)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span>{field === 'timeToMake' ? formatTime(product[field]) : product[field as keyof ProductDetail]}</span>
            <button onClick={() => handleEdit(field)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-semibold mb-6">Product Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover rounded-lg shadow-md mb-4" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload New Photo
            </button>
          </div>
          <div>
            {renderField('title', 'Title')}
            {renderField('description', 'Description', 'textarea')}
            {renderField('sellPrice', 'Selling Price', 'number')}
            {renderField('costToMake', 'Cost to Make', 'number')}
            {renderField('weight', 'Weight')}
            {renderField('timeToMake', 'Time to Make', 'number')}
            {renderField('inventoryCount', 'Inventory Count', 'number')}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Taxes (5%)</label>
              <span>${product.taxes.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;