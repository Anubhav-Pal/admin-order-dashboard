import { createSlice } from "@reduxjs/toolkit";
import dummyData from '../constants/DummyData.json'

const initialState = {
    orders: dummyData,
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.unshift(action.payload); // Assuming action.payload is the new order data
        },
        removeOrder: (state, action) => {
            // state.orders = state.orders.filter((order) => order!== action.payload)
            state.orders = state.orders.filter(order => order.id !== action.payload.id);
        },
    },

})


export const { addOrder, removeOrder } = orderSlice.actions

export default orderSlice.reducer;