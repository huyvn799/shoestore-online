import React from "react";

import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";
import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";
import Products from "~/components/Products";
import Newsletter from "~/components/Newsletter";
import Footer from "~/components/Footer";
const cx = classNames.bind(styles);

const ProductList = () => {
  return (
    <div className={cx("productList-container")}>
      <Navbar />
      <Announcement />
      <h1 className={cx("productList-title")}>Shose</h1>
      {/* filter */}
      <div className={cx("productList-filterContainer")}>
        {/* filter products */}
        <div className={cx("productList-filter")}>
          <span className={cx("productList-filter__text")}>
            Filter Products:
          </span>
          {/* choose color */}
          <select className={cx("productList-filter__select")}>
            <option
              disabled
              selected
              className={cx("productList-filter__select__option")}
              value="Color"
            >
              Color
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="white"
            >
              white
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="white"
            >
              black
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="white"
            >
              red
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="white"
            >
              blue
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="white"
            >
              yellow
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="white"
            >
              green
            </option>
          </select>

          {/* choose size */}
          <select className={cx("productList-filter__select")}>
            <option
              disabled
              selected
              className={cx("productList-filter__select__option")}
              value="Size"
            >
              Size
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="XS"
            >
              XS
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="S"
            >
              S
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="M"
            >
              M
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="M"
            >
              L
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="M"
            >
              XL
            </option>
          </select>
        </div>

        {/* sort products */}
        <div className={cx("productList-filter")}>
          <span className={cx("productList-filter__text")}>Sort Products:</span>
          <select className={cx("productList-filter__select")}>
            <option
              className={cx("productList-filter__select__option")}
              selected
              value="Newest"
            >
              Newest
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="asc"
            >
              Price (asc)
            </option>
            <option
              className={cx("productList-filter__select__option")}
              value="desc"
            >
              Price (desc)
            </option>
          </select>
        </div>
      </div>

      {/* list product */}
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
