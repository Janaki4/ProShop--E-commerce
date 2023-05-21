import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Slice/productListSlice";
import { cartReducer, addItemToCart, deleteCartItem , addShippingAddress , addPaymentMethod} from "./Slice/cartSlice";
import { userReducer , logout } from "./Slice/userSlice";

const store = configureStore({
    reducer: {
        productList: productReducer,
        cart: cartReducer,
        user:userReducer
    },
})

export {
    store,
    addItemToCart,
    deleteCartItem,
    logout, 
    addShippingAddress,
    addPaymentMethod,
}