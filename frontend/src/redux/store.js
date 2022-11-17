import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import {productsReducer} from './slices/productsSlice'
import {cartReducer} from './slices/cartSlice'
import { myReducer } from './slices/mySlice'
import { orderReducer } from './slices/orderSlice'

const store = configureStore({
    reducer: {
        authReducer: authSlice,
        productsReducer: productsReducer,
        // cartReducer: cartReducer,
        myReducer: myReducer,
        orderReducer: orderReducer,
    }
})

export default store;