 
import classNames from "classnames/bind";
import styles from "./PayButton.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

const PayButton = () => {

  const handleCheckout = () => {

  }

  return (
    <button className={cx("cart-summary__button")}>CHECKOUT</button>
  );
};

export default PayButton;
