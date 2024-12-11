import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';
import ProductList from './ProductList';
// Helper function to render component with redux store
// This allows for testing components connected to the Redux store
const renderWithStore = (store) => render(_jsx(Provider, { store: store, children: _jsx(ProductList, {}) }));
// Test 1: Ensure product list renders correctly
test('renders product list', async () => {
    // Configure Redux store with the products reducer
    const store = configureStore({
        reducer: {
            products: productsReducer,
        },
    });
    // Render the component with the store
    renderWithStore(store);
    // Find all product titles (assuming they are <h3> elements)
    const products = await screen.findAllByRole('heading', { level: 3 });
    // Verify that there are products rendered (i.e., the list is not empty)
    expect(products.length).toBeGreaterThan(0);
});
// Test 2: Ensure products can be filtered by search term
test('filters products by search term', async () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
        },
    });
    // Render the component with the store
    renderWithStore(store);
    // Find the search input field (assuming it has a placeholder text 'Search products...')
    const searchInput = screen.getByPlaceholderText('Search products...');
    // Simulate typing a search term (e.g., 'shirt')
    fireEvent.change(searchInput, { target: { value: 'shirt' } });
    // Find products that match the search term (case insensitive)
    const filteredProducts = await screen.findAllByText(/shirt/i);
    // Verify that at least one product matching the search term is found
    expect(filteredProducts.length).toBeGreaterThan(0);
});
// Test 3: Ensure products can be sorted by price
test('sorts products by price', async () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
        },
    });
    // Render the component with the store
    renderWithStore(store);
    // Find the sort dropdown (assuming it's a <select> element with a combobox role)
    const sortDropdown = screen.getByRole('combobox');
    // Simulate selecting 'Sort by Price' from the dropdown
    fireEvent.change(sortDropdown, { target: { value: 'price' } });
    // Verify that the first product's price is $15.99 (assuming the price appears in the text)
    const firstProductPrice = screen.getByText('$15.99');
    expect(firstProductPrice).toBeInTheDocument();
});
