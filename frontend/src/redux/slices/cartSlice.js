import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../../axios/apiclient'


export const getMyCart = createAsyncThunk('cart/getMyCart', async(data, {fulfillWithValue, rejectWithValue}) => {
    const token = localStorage.getItem('token')

    try {
        const res = await api.post('/api/my/cart', data, {
            headers: {
                Authorization: token
            } 
        })

        console.log(res?.data)
        return res?.data;    
    }
    catch(error) {
        return rejectWithValue(error?.response?.data)
    }
})

const initialState = {
    error: "",
    cart: [],
    loading: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getMyCart.fulfilled, (state, action) => {
            state.cart = action?.payload
            state.error = ""
            state.loading = false
        });
        builder.addCase(getMyCart.rejected, (state, action) => {
            state.loading = false
            state.error = action?.payload
        });
        builder.addCase(getMyCart.pending, (state, action) => {
            state.loading = true
            state.error = ""
        });
    }
})


export const cartReducer = cartSlice.reducer