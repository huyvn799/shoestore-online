import React from "react";
import classNames from "classnames/bind";
import styles from "./CategoryItem.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const CategoryItem = ({ item }) => {
  return (
    <div className={cx("categoryItem-container")}>
      <Link to={`/products/${item.category}`}>
        <img className={cx("categoryItem-img")} src={item.img} alt="logo" />
        <div className={cx("categoryItem-info")}>
          <h1 className={cx("categoryItem-title")}>{item.title}</h1>
          <button className={cx("categoryItem-button")}>Show now</button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
