import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/OrderSlice.js';
import editOrderReducer from '../features/EditOrderSlice.js';

export const store = configureStore({
    reducer: {
        orders: orderReducer,
        editedOrder: editOrderReducer
    }
});
