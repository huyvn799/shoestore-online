 
import classNames from "classnames/bind";
import styles from "./CartSummary.module.scss";
const cx = classNames.bind(styles);
const CartSummary = ({cart}) => {

  const shippingCost = 2;
  const shippingDiscount = 1;

  return ( 
    <div className={cx("cart-summary")}>
      <h1 className={cx("cart-summary__title")}>ORDER SUMMARY</h1>
      <div className={cx("cart-summary__item")}>
        <span>Subtotal</span>
        <span>${cart.total}</span>
      </div>
      <div className={cx("cart-summary__item")}>
        <span>Estimated Shipping</span>
        <span>${shippingCost}</span>
      </div>
      <div className={cx("cart-summary__item")}>
        <span>Shipping Discount</span>
        <span>$-{shippingDiscount}</span>
      </div>
      <div className={cx("cart-summary__item", "cart-summary__item--total")}>
        <span>Total</span>
        <span>${cart.total + shippingCost - shippingDiscount}</span>
      </div>
      <button className={cx("cart-summary__button")}>CHECKOUT NOW</button>
    </div>
  );
};

export default CartSummary;
