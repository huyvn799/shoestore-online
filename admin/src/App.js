import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";

import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAdmin as admin } from "./requestMethod";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "./redux/apiCalls";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!admin) {
  //     navigate("/login");
  //   }
  // }, [admin])

  // console.log(admin);
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } 
  }, [user])

  return (
    admin && (
      <div>
        <ToastContainer/>
        <Topbar />
        <div className="container">
          <Sidebar />
          <div className="outlet"><Outlet/></div>
        </div>
      </div>
    )
  );
}

export default App;
