import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../axios/apiclient";


const initialState = {
    orders: [],
    error: "",
    loading: false,
}

export const getOrders = createAsyncThunk('order/getOrders', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('token')
        const obj = {
            email: data
        }
        const res = await api.post('/api/order/history', obj, {
            headers: {
                Authorization: token
            }
        });
        return res?.data;
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.error = ""
            state.loading = false
            state.orders = action.payload
        })
        builder.addCase(getOrders.pending, (state, action) => {
            state.error = ""
            state.loading = true
            state.orders = []
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.orders = []
        })
    } 
})

export const orderReducer = orderSlice.reducer