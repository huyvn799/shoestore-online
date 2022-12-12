
import React from "react"
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { Provider } from "react-redux";
import { store, persistor } from "~/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Products from "./components/Products";
import Customer from "./pages/Customer";
import Notify from "./pages/Notify";
import Review from "./pages/Review";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Address from "./pages/Address";
import WishList from "./pages/WishList";
import { productsFetch } from "./redux/productRedux";
import CheckoutSuccess from "./components/CheckoutSuccess";
import History from "./pages/History";

store.dispatch(productsFetch());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles>
        <Router>
          <Routes>
            <Route path="/" element={<App />} >
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />}>
                <Route path=":category" element={<ProductList />} />
              </Route>
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/customer" element={<Customer />} >
                <Route path="profile" element={<Account />}/>
                <Route path="notification" element={<Notify />}/>
                <Route path="address" element={<Address />}/>
                <Route path="wishlist" element={<WishList />}/>
                <Route path="review" element={<Review />}/>
                <Route path="order" element={<History />}/>
              </Route>

              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        </GlobalStyles>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

