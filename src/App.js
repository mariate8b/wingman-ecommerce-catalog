import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
const App = () => {
    // State to manage dark mode
    const [darkMode, setDarkMode] = useState(() => {
        // Check if the user prefers dark mode from localStorage
        return localStorage.getItem('darkMode') === 'true' || false;
    });
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    useEffect(() => {
        // Store dark mode preference in localStorage
        localStorage.setItem('darkMode', darkMode.toString());
        if (darkMode) {
            document.documentElement.classList.add('dark'); // Add the "dark" class to the HTML element
        }
        else {
            document.documentElement.classList.remove('dark'); // Remove the "dark" class
        }
    }, [darkMode]);
    return (_jsxs("div", { className: "min-h-screen bg-background dark:bg-darkBackground transition-colors duration-300", children: [_jsx("h1", { className: "text-4xl text-primary dark:text-darkText font-bold py-8 text-center", children: "Product Catalog" }), _jsx(ProductList, {})] }));
};
export default App;
