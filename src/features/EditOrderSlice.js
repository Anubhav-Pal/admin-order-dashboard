import { createSlice } from "@reduxjs/toolkit";

const initialEditedOrderState = {
    order: {}, // This will hold the currently edited order
};

export const editOrderSlice = createSlice({
    name: "editOrder",
    initialState: initialEditedOrderState,
    reducers: {
        setEditedOrder: (state, action) => {
            state.order = action.payload;
        },
        clearEditedOrder: (state) => {
            state.order = {}; // Reset the edited order to empty object
        }
    },
});

export const { setEditedOrder, clearEditedOrder } = editOrderSlice.actions;

export default editOrderSlice.reducer;
