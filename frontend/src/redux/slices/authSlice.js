import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../../axios/apiclient'


const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        const res = api.post('/api/auth/login', data)
        return res?.data
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const initialState = {
    loading: false,
    myInfo: {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action)=> {
          state.loading=false;
          state.myInfo = action.payload.data;
        }),
        builder.addCase(login.pending, (state, action)=> {
          state.loading = true;
        }),
        builder.addCase(login.rejected, (state, action)=> {
            state.loading = false;
            state.myInfo = action.error.message;
        })
    },
})

export default authSlice.reducer