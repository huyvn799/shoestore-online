import React from "react";
import classNames from "classnames/bind";
import styles from "./CartSummary.module.scss";
const cx = classNames.bind(styles);
const CartSummary = () => {
  return (
    <div className={cx("cart-summary")}>
      <h1 className={cx("cart-summary__title")}>ORDER SUMMARY</h1>
      <div className={cx("cart-summary__item")}>
        <span>Subtotal</span>
        <span>1.000.000</span>
      </div>
      <div className={cx("cart-summary__item")}>
        <span>Estimated Shipping</span>
        <span>70.000</span>
      </div>
      <div className={cx("cart-summary__item")}>
        <span>Shipping Discount</span>
        <span>-70.000</span>
      </div>
      <div className={cx("cart-summary__item", "cart-summary__item--total")}>
        <span>total</span>
        <span>1.000.000 VND</span>
      </div>
      <button className={cx("cart-summary__button")}>CHECKOUT NOW</button>
    </div>
  );
};

export default CartSummary;
