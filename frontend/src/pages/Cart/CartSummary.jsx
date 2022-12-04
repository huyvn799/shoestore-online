 
import classNames from "classnames/bind";
import PayButton from "~/components/PayButton";
import styles from "./CartSummary.module.scss";
const cx = classNames.bind(styles);
const CartSummary = ({cart}) => {

  const shippingCost = 0;
  const shippingDiscount = 0;

  const handleCheckout = () => {

  }

  return ( 
    <div className={cx("cart-summary")}>
      <h1 className={cx("cart-summary__title")}>ORDER SUMMARY</h1>
      {/* <div className={cx("cart-summary__item")}>
        <span>Subtotal</span>
        <span>${cart.cartTotal}</span>
      </div>
      <div className={cx("cart-summary__item")}>
        <span>Estimated Shipping</span>
        <span>${shippingCost}</span>
      </div>
      <div className={cx("cart-summary__item")}>
        <span>Shipping Discount</span>
        <span>-${shippingDiscount}</span>
      </div> */}
      <div className={cx("cart-summary__item", "cart-summary__item--total")}>
        <span>Subtotal</span>
        <span>${cart.cartTotal + shippingCost - shippingDiscount}</span>
      </div>
      <button className={cx("cart-summary__button")}>CHECKOUT NOW</button>
      {/* <PayButton/> */}
    </div>
  );
};

export default CartSummary;
