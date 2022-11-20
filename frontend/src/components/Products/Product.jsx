import { memo, useEffect, useState } from "react";
import styles from "./Product.module.scss";
import classNames from "classnames/bind";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { publicRequest } from "~/requestMethod";

const cx = classNames.bind(styles);

const Product = ({ item }) => {

  return (
    <div className={cx("product-container")}>
      <div className={cx("product-circle")}></div>
      <img className={cx("product-image")} src={item.img} alt="logo" />
      <div className={cx("product-info")}>
        <div className={cx("product-icon")}>
          <ShoppingCartOutlined />
        </div>
        <Link to={`/product/${item._id}`}>
          <div className={cx("product-icon")}>
            <SearchOutlined />
          </div>
        </Link>
        <div className={cx("product-icon")}>
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
