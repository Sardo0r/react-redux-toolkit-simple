import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStorage } from "../../utils/local-storage";
import { saveState } from "../../utils/storage";

export interface Product {
	count: number;
	price: number
	id: number
}
const initialState: {
	products: Array<Product>
} = {
	products: Array.isArray(getStorage('products', '[]')) ? getStorage('products', '[]') : []
};

const countSlice = createSlice({
	name: 'count',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			const ind = state.products?.findIndex((i: Product) => i.id === action.payload.id)
			if (ind !== -1) {
				state.products[ind].count = action.payload.count
				saveState("products", state.products);
			} else {
				state.products.push(action.payload)
				saveState("products", state.products);
			}
		},
		substractProduct: (state, action: PayloadAction<{ count: number, id: number, price: number }>) => {
			const indx = state.products?.findIndex((i: Product) => i.id === action.payload.id)
			if (state.products[indx].count === 1) {
				state.products.splice(indx, 1)
			} else {
				state.products[indx].count = action.payload.count
			}
			saveState("products", state.products);
		},
		removeProduct: (state, action: PayloadAction<{ count: number, id: number, price: number }>) => {
			state.products?.splice(state.products.findIndex((itm: Product) => itm.id === action.payload.id), 1)
			saveState(
				"products",
				state.products
			);
		},
	}
});
export const { addProduct, removeProduct, substractProduct } = countSlice.actions

export default countSlice.reducer;
