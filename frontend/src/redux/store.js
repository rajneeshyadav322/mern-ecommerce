import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import {productsReducer} from './slices/productsSlice'
import {cartReducer} from './slices/cartSlice'
import { myReducer } from './slices/mySlice'

const store = configureStore({
    reducer: {
        authReducer: authSlice,
        productsReducer: productsReducer,
        // cartReducer: cartReducer,
        myReducer: myReducer,
    }
})

export default store;