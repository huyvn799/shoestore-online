import React from "react";
import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";

import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import CartProduct from "./CartProduct";
import Footer from "~/components/Footer";
import CartSummary from "./CartSummary";
const cx = classNames.bind(styles);
const Cart = () => {
  return (
    <div className={cx("cart-container")}>
      <Navbar />
      <Announcement />
      <div className={cx("cart-wrapper")}>
        <h1 className={cx("cart-title")}>YOUR SHOSE</h1>
        <div className={cx("cart-top")}>
          <button className={cx("cart-top__button")}>CONTINUE SHOPPING</button>
          <div className={cx("cart-top__texts")}>
            <span className={cx("cart-top__texts__text")}>
              Shopping shose (2)
            </span>
            <span className={cx("cart-top__texts__text")}>
              Your Wishlist (0)
            </span>
          </div>
          <button
            className={cx("cart-top__button", "cart-top__button--filled")}
          >
            CHECKOUT NOW
          </button>
        </div>

        <div className={cx("cart-bottom")}>
          <div className={cx("cart-info")}>
            <CartProduct />
            <hr className={cx("cart-line")} />
            <CartProduct />
          </div>
          <div className={cx("cart-summary__container")}>
            <CartSummary />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
