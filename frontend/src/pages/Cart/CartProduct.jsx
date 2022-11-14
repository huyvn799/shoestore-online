import React from "react";
import { Add, Remove } from "@material-ui/icons";

import classNames from "classnames/bind";
import styles from "./CartProduct.module.scss";
const cx = classNames.bind(styles);
const CartProduct = () => {
  return (
    <div className={cx("cart-product")}>
      <div className={cx("cart-product__detail")}>
        <img
          className={cx("cart-info__image")}
          src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A"
          alt="logo"
        />
        <div className={cx("cart-info__details")}>
          <span>
            <b>Product:</b> JESSIE THUNDER SHOES
          </span>
          <span>
            <b>ID:</b> 93813718293
          </span>
          <div className={cx("cart-product__color")}></div>
          <span>
            <b>Size:</b> 37.5
          </span>
        </div>
      </div>
      <div className={cx("cart-product__priceDetail")}>
        <div className={cx("cart-product__amountContainer")}>
          <Add />
          <div className={cx("cart-product__productAmount")}>2</div>
          <Remove />
        </div>
        <div className={cx("cart-product__price")}>500.000 VND</div>
      </div>
    </div>
  );
};

export default CartProduct;
