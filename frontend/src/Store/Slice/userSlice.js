import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setMessage from "../../Utils/ErrorResponse"
import axios from 'axios'

const userLogin = createAsyncThunk("users/login", async (loginDetails, thunkAPI) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/users/login", loginDetails)
        console.log(data)
        return data
    } catch (error) {
        const message = setMessage(error)
        return thunkAPI.rejectWithValue(message)
    }
})

const userRegister = createAsyncThunk("user/register", async (registerDetails, thunkAPI) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/users", registerDetails)
        return data
    } catch (error) {
        const message = setMessage(error)
        return thunkAPI.rejectWithValue(message)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: "",
        userInfo: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ''
    },
    reducers: {
        logout: (state, action) => {
            state.userInfo = ""
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
            state.userInfo = ""
            state.error = ""
        })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.error = ""
            localStorage.setItem('token', JSON.stringify(payload))
        })
            .addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false
            state.userInfo = ""
            state.error = payload
            })
            .addCase(userRegister.pending, (state) => {
            state.loading = true
            state.userInfo = ""
            state.error = ""
        })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.error = ""
            localStorage.setItem('token', JSON.stringify(payload))
        })
            .addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false
            state.userInfo = ""
            state.error = payload
        })
    }
})

export const userReducer = userSlice.reducer
export const { logout } = userSlice.actions
export { userLogin , userRegister }