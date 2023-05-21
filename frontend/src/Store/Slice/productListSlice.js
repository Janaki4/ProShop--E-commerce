import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setMessage from "../../Utils/ErrorResponse"
import axios from 'axios'

const getProducts = createAsyncThunk("product/getProducts", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/products")
        return data.products
    } catch (error) {
        const message = setMessage(error)
        return thunkAPI.rejectWithValue(message)
    }
})

const getProductById = createAsyncThunk("product/getSingleProduct", async (id, thunkAPI) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
        return data
    } catch (error) {
        const message = setMessage(error)
        return thunkAPI.rejectWithValue(message)
    }
})


const productListSlice = createSlice({
    name: "productList",
    initialState: {
        products: [],
        loading: false,
        product : {},
        error: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true
                state.products = []
                state.error = ""
            })
            .addCase(getProducts.fulfilled, (state, { payload }) => {
                state.loading = false
                state.products = payload
                state.error = ""
            })
            .addCase(getProducts.rejected, (state, { payload }) => {
                console.log(payload, 200)
                state.loading = false
                state.products = []
                state.error = payload
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true
                state.product = {}
                state.error = ""
            })
            .addCase(getProductById.fulfilled, (state, { payload }) => {
                state.loading = false
                state.product = payload
                state.error = ""
            })
            .addCase(getProductById.rejected, (state, { payload }) => {
                console.log(payload, 200)
                state.loading = false
                state.product = {}
                state.error = payload
            })
    }
})

export const productReducer = productListSlice.reducer
export { getProducts , getProductById }
// export const { request, success, error } = productListSlice.actions