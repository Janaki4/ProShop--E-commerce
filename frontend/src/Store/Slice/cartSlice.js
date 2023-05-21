import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
        shippingAddress:  localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address')) : {},
        paymentMethod:  localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ""
    },
    reducers: {
        addItemToCart: (state, action) => {
            // const { _id , name , brand , category , countInStock , numReviews , price , qty} = action.payload
            const isItemExists = state.cartItems.find(x => x._id === action.payload._id)
            if (isItemExists) {
                state.cartItems.map((x) => {
                    if (x._id === action.payload._id) {
                        return x.qty = +x.qty + +action.payload.qty

                    }
                    else {
                        return x
                    }
                })
            }
            else {
                state.cartItems.push(action.payload)
            }

            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        deleteCartItem: (state, action) => {
            const items = state.cartItems.filter(x => x._id !== action.payload)
            if (items.length !== 0) {
                state.cartItems = items
                localStorage.setItem('cart', JSON.stringify(state.cartItems))
            }
            else {
                state.cartItems = []
                localStorage.removeItem('cart')
            }
        },
        addShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('address' , JSON.stringify(action.payload))
        },
        addPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem('paymentMethod' , JSON.stringify(action.payload))
        },

    }
})

export const { addItemToCart, deleteCartItem , addShippingAddress , addPaymentMethod} = cartSlice.actions
export const cartReducer = cartSlice.reducer

