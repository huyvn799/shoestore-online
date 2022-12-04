import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Products from "./components/Products";
import Customer from "./pages/Customer";
import Notify from "./pages/Notify";

import Sidebar from "./components/Sidebar";

import Address from "./pages/Address";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />}>
            <Route path=":category" element={<ProductList />} />
          </Route>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/customer" element={<Customer />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
