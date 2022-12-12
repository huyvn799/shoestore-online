import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./page/home/Home";
import UserList from "./page/userList/UserList";
import User from "./page/user/User";
import NewUser from "./page/newUser/NewUser";
import ProductList from "./page/productList/ProductList";
import Product from "./page/product/Product";
import NewProduct from "./page/newProduct/NewProduct";
import Login from "./page/login/Login";

function App() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
