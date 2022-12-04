import React, { useState } from "react";
import Announcement from "~/components/Announcement";
import Navbar from "~/components/Navbar";

import classNames from "classnames/bind";
import styles from "./Customer.module.scss";
import Sidebar from "~/components/Sidebar";
import Account from "../Account";
import Notify from "../Notify";
import Address from "../Address";
import WishList from "../WishList";
import Footer from "~/components/Footer";
import History from "../History";
import Review from "../Review";
import { Outlet } from "react-router-dom";
const cx = classNames.bind(styles);

const Customer = (props) => {
  // const [content, setContent] = useState(props.content);
  // const data = useSelector((state) => state.customer);
  // console.log(data.content);
  // const Content = (props) => {
  //   switch (props.data) {
  //     case "account":
  //       return <Account />;
  //     case "notify":
  //       return <Notify />;
  //     case "address":
  //       return <Address />;
  //     case "wishlist":
  //       return <WishList />;

  //     case "history":
  //       return <History />;
  //     case "review":
  //       return <Review />;
  //     case "editaddress":
  //       return <EditAddress />;
  //     default:
  //       return "hi";
  //   }
  // };
  // // console.log(data);
  return (
    <div>
      {/* <Navbar /> */}
      <Announcement />
      <div className={cx("customer-container")}>
        <Sidebar />
        <Outlet />
        {/* <Account /> */}
        {/* <Notify /> */}
        {/* <Address /> */}
        {/* <EditAddress /> */}
        {/* <History /> */}
        {/* <WishList /> */}
        {/* <Review /> */}
      </div>
      {/* <Footer /> */}
    </div>

    // <Router>
    //   <div className={cx("customer-container")}>
    //     <Sidebar />
    //     {/* <Routes>
    //         <Route path="/customer/account" element={<Account />} />
    //       </Routes> */}
    //   </div>
    // </Router>
  );
};

export default Customer;
