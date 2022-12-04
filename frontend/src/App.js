import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartFetch } from "./redux/cartRedux";

import Sidebar from "./components/Sidebar";

import Address from "./pages/Address";
import History from "./pages/History";

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(cartFetch(user));
    }
  }, [user]);

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
