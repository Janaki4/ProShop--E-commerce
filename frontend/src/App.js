import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Screens/Layout";
import ProductScreen from "./Screens/ProductScreen";
import Cart from "./Screens/CartScreen";
import UserAuthScreen from "./Screens/UserAuthScreen"
import ShippingAddress from "./Screens/ShippingAddress"
import PaymentScreen from "./Screens/PaymentScreen"
import PlaceOrder from "./Screens/PlaceOrder"
import OrderDetailsScreen from "./Screens/OrderDetailsScreen"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth/:page" element={<UserAuthScreen />} />
          <Route path="/shipping-address" element={<ShippingAddress />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/order-details/:id" element={<OrderDetailsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
