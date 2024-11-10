import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Add routes for Categories and Reports when you create those components */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;