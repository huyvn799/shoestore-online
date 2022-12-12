 
import axios from "axios";
import classNames from "classnames/bind";
import PayButton from "~/components/PayButton";
import styles from "./CartSummary.module.scss";
import { publicRequest } from "~/requestMethod";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
const CartSummary = ({cart}) => {

  const user = useSelector(state => state.auth.login.currentUser);

  const shippingCost = 0;
  const shippingDiscount = 0;

  const handleCheckout = () => {
    const doCheckout = async () => {
        try {
          const res = await publicRequest.post("/stripe/checkout", {
              cartItems: cart.cartItems,
              userId: user._id
            }, {
              headers: {
                token: `Bearer ${user.accessToken}`
              }
            })
          
            window.location.href = res.data.url;
          
        } catch(err) {
            console.log(err);
        }
    }

    doCheckout();
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
      <button className={cx("cart-summary__button")}
        onClick={handleCheckout}
      >CHECKOUT NOW</button>
      {/* <PayButton/> */}
    </div>
  );
};

export default CartSummary;
