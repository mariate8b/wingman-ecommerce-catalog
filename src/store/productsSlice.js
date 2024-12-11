import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    products: [],
    searchTerm: '',
    sortBy: 'price', // default sorting by price
};
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
    },
});
export const { setProducts, setSearchTerm, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;
