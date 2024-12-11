import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../store/productsSlice';
import ProductList from './ProductList';
// Helper function to render component with redux store
const renderWithStore = (store) => render(_jsx(Provider, { store: store, children: _jsx(ProductList, {}) }));
test('renders product list', async () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
        },
    });
    renderWithStore(store);
    // Check if product names appear in the list
    const products = await screen.findAllByRole('heading', { level: 3 }); // Assuming product titles are in <h3>
    expect(products.length).toBeGreaterThan(0);
});
test('filters products by search term', async () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
        },
    });
    renderWithStore(store);
    // Type in search term
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'shirt' } });
    const filteredProducts = await screen.findAllByText(/shirt/i);
    expect(filteredProducts.length).toBeGreaterThan(0);
});
test('sorts products by price', async () => {
    const store = configureStore({
        reducer: {
            products: productsReducer,
        },
    });
    renderWithStore(store);
    // Open sort dropdown and select "Sort by Price"
    const sortDropdown = screen.getByRole('combobox');
    fireEvent.change(sortDropdown, { target: { value: 'price' } });
    // Verify that products are sorted by price
    const firstProductPrice = screen.getByText('$15.99');
    expect(firstProductPrice).toBeInTheDocument();
});
