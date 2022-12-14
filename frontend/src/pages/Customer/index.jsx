import React from "react";
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

const Customer = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Announcement />
      <div className={cx("customer-container")}>
        <Sidebar />
        <div style={{ 
          flex: 1,
          padding: "20px"
         }}>
          <Outlet/>
        </div>
        {/* <Account /> */}
        {/* <Notify /> */}
        {/* <Address /> */}
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
