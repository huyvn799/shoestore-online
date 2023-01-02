import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import UserList from "./page/userList/UserList";
import User from "./page/user/User";
import NewUser from "./page/newUser/NewUser";
import ProductList from "./page/productList/ProductList";
import Product from "./page/product/Product";
import NewProduct from "./page/newProduct/NewProduct";
import Login from "./page/login/Login";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react"
import OrderList from "./page/orderList/OrderList";
import Order from "./page/order/Order";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} >
              <Route path="/" element={<Home />} />
              <Route path="users" element={<UserList />} />
              <Route path="users/:userId" element={<User />} />
              <Route path="users/create" element={<NewUser />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/:productId" element={<Product />} />
              <Route path="products/create" element={<NewProduct />} />
              <Route path="orders" element={<OrderList />} />
              <Route path="orders/:orderId" element={<Order />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
