 
import { Add, Remove } from "@material-ui/icons";

import classNames from "classnames/bind";
import styles from "./CartProduct.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);

const CartProduct = ({cartProduct}) => {
  const [quantity, setQuantity] = useState(cartProduct.quantity)
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }
  return (
    <div className={cx("cart-product")}>
      <div className={cx("cart-product__detail")}>
        <img
          className={cx("cart-info__image")}
          src={cartProduct.img}
          alt="logo"
        />
        <div className={cx("cart-info__details")}>
          <span>
            <b>Product:</b> {cartProduct.title}
          </span>
          <span>
            <b>ID:</b> {cartProduct._id}
          </span>
          <span style={{ 
            display: "flex",
            alignItems: "center"
           }}>
            <b>Color: </b> 
            <div 
              className={cx("cart-product__color",
                `cart-product__color--${cartProduct.color}`)}>
            </div>
          </span>
          <span>
            <b>Size:</b> {cartProduct.size}
          </span>
        </div>
      </div>
      <div className={cx("cart-product__priceDetail")}>
        <div className={cx("cart-product__amountContainer")}>
          <Remove className={cx("cart-product__amountBtn")} onClick={() => handleQuantity("dec")}/>
          <div className={cx("cart-product__productAmount")}>{quantity}</div>
          <Add className={cx("cart-product__amountBtn")} onClick={() => handleQuantity("inc")}/>
        </div>
        <div className={cx("cart-product__price")}>$ {cartProduct.quantity * cartProduct.price}</div>
      </div>
    </div>
  );
};

export default CartProduct;
