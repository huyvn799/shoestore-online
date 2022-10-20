import React from "react";
import { popularProducts } from "~/data";

import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import Product from "./Product";
const cx = classNames.bind(styles);

const Products = () => {
  return (
    <div className={cx("products-container")}>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Products;
