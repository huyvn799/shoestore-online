import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartFetch } from "./redux/cartRedux";

function App() {
  const user = useSelector(state=>state.auth.login.currentUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user) {
      dispatch(cartFetch(user));
    }
  }, [user])

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
