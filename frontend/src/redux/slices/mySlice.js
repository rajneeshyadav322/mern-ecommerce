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
        return res?.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


const mySlice = createSlice({
    name: "myInfo",
    initialState: initialState,
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

export const myReducer = mySlice.reducer;