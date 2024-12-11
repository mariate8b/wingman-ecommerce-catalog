import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts, setSearchTerm, setSortBy } from '../store/productsSlice';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const searchTerm = useSelector((state: any) => state.products.searchTerm);
  const sortBy = useSelector((state: any) => state.products.sortBy);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true' || false;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark'); // Add dark class
    } else {
      document.documentElement.classList.remove('dark'); // Remove dark class
    }
  }, [darkMode]);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      return b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductCard = ({ product }) => (
    <div className="p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-600">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
      <h2 className="text-lg font-bold mt-2 text-primary dark:text-darkText">{product.title}</h2>
      <p className="text-gray-600 dark:text-gray-300">${product.price.toFixed(2)}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4 dark:bg-darkBackground transition-colors duration-300 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <select
          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
        <button
          className="ml-4 p-2 bg-accent text-white rounded-full dark:bg-secondary"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
