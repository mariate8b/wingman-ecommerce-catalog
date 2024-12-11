import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts, setSearchTerm, setSortBy } from '../store/productsSlice';
const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const searchTerm = useSelector((state) => state.products.searchTerm);
    const sortBy = useSelector((state) => state.products.sortBy);
    // Dark Mode State
    const [darkMode, setDarkMode] = useState(() => {
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
            }
            catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [dispatch]);
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        if (darkMode) {
            document.documentElement.classList.add('dark'); // Add dark class
        }
        else {
            document.documentElement.classList.remove('dark'); // Remove dark class
        }
    }, [darkMode]);
    // Sorting logic
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price;
        }
        else if (sortBy === 'rating') {
            return b.rating.rate - a.rating.rate;
        }
        return 0;
    });
    const filteredProducts = sortedProducts.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const ProductCard = ({ product }) => (_jsxs("div", { className: "p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-600", children: [_jsx("img", { src: product.image, alt: product.title, className: "w-full h-48 object-cover rounded-t-lg" }), _jsx("h2", { className: "text-lg font-bold mt-2 text-primary dark:text-darkText", children: product.title }), _jsxs("p", { className: "text-gray-600 dark:text-gray-300", children: ["$", product.price.toFixed(2)] })] }));
    return (_jsxs("div", { className: "container mx-auto p-4 dark:bg-darkBackground transition-colors duration-300 min-h-screen", children: [_jsxs("div", { className: "mb-4 flex justify-between items-center", children: [_jsx("input", { type: "text", placeholder: "Search products...", className: "p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white", onChange: (e) => dispatch(setSearchTerm(e.target.value)) }), _jsxs("select", { className: "p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white", value: sortBy, onChange: (e) => dispatch(setSortBy(e.target.value)), children: [_jsx("option", { value: "price", children: "Sort by Price" }), _jsx("option", { value: "rating", children: "Sort by Rating" })] }), _jsx("button", { className: "ml-4 p-2 bg-accent text-white rounded-full dark:bg-secondary", onClick: toggleDarkMode, children: "Toggle Dark Mode" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: filteredProducts.map((product) => (_jsx(ProductCard, { product: product }, product.id))) })] }));
};
export default ProductList;
