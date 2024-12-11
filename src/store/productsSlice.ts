import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

interface ProductsState {
  products: Product[];
  searchTerm: string;
  sortBy: string; // new field for sorting
}

const initialState: ProductsState = {
  products: [],
  searchTerm: '',
  sortBy: 'price', // default sorting by price
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setProducts, setSearchTerm, setSortBy } = productsSlice.actions;

export default productsSlice.reducer;
