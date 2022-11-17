import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import api from '../../../axios/apiclient'

const initialState = {
    loading: false,
    info: {},
    error: ""
}
 
export const getMyInfo = createAsyncThunk('myInfo/get', async (thunkAPI) => {
    const token = localStorage.getItem('token')
    try {
        const res = await api.get('/api/my/info', {
            headers: {
                Authorization: token
            }
        })
        localStorage.setItem("email", res?.data?.email)
        return res?.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


const mySlice = createSlice({
    name: "myInfo", 
    initialState: initialState,
    reducers: {
        incrementItem : (state, action) => {
            for(let item of state?.info?.products) {
                if(item?.product?._id == action.payload.product._id) {
                    item.quantity++
                    state.info.subTotal += item.product.price
                    break;
                }
            }
        },
        decrementItem : (state, action) => {
            for(let item of state?.info?.products) {
                if(item?.product?._id == action.payload.product._id) {
                    if(item.quantity > 1) {
                        item.quantity--;
                        state.info.subTotal -= item.product.price
                    }   
                    break;
                }
            }
        },
        removeItem(state, action) {
            
            const newCart = []
            state.info.products.forEach((item) => {
                if(item?.product?._id !== action.payload.product._id) {
                    newCart.push(item);
                }
                else {
                    state.info.subTotal -= (item.product.price*item.quantity)
                }
            })
            state.info.products = newCart
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.pending, (state, action) =>{
            state.loading = true
            state.error = "" 
        })
        builder.addCase(getMyInfo.rejected, (state, action) => {
            state.loading = false
            state.error = action?.error?.message; 
        })
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.info = action?.payload
        })
    }
})

export const {incrementItem, decrementItem, removeItem} = mySlice.actions

export const myReducer = mySlice.reducer;