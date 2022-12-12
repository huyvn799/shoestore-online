import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartFetch } from "./redux/cartRedux";
import { updateCart } from "./redux/apiCalls";
import { ordersFetch } from "./redux/orderRedux";

function App() {
  const user = useSelector(state=>state.auth.login.currentUser);
  const cart = useSelector(state=>state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user) {
      // updateCart(user.accessToken, user._id, cart);
      dispatch(cartFetch(user));
      dispatch(ordersFetch(user));
    }
  }, [user, dispatch])

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        updateCart(user.accessToken, user._id, cart)
      }, 1000)
    }
    return () => {
      console.log("delete");
    }
  }, [cart, user])

  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
