import React from "react";

import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";
import Products from "~/components/Products";
import Newsletter from "~/components/Newsletter";
import Footer from "~/components/Footer";
import { Add, Remove } from "@material-ui/icons";
const cx = classNames.bind(styles);

const Product = () => {
  return (
    <div className={cx("product-container")}>
      <Navbar />
      <Announcement />
      <div className={cx("product-wrapper")}>
        <div className={cx("product-imgContainer")}>
          <img
            className={cx("product-image")}
            src="https://i.ibb.co/S6qMxwr/jean.jpg"
            alt="logo"
          />
        </div>
        <div className={cx("product-infoContainer")}>
          <h1 className={cx("product-info__title")}>super shose</h1>
          <p className={cx("product-info__desc")}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            ad, unde ipsam dolorem quis mollitia, cum amet facilis expedita ab
            optio voluptates inventore? Accusantium, delectus?
          </p>
          <span className={cx("product-info__price")}>20.000 VND</span>

          <div className={cx("product-info__filterContainer")}>
            {/* filter color */}
            <div className={cx("product-info__filter")}>
              <span className={cx("product-info__filter__title")}>Color</span>
              <div
                className={cx(
                  "product-info__filter__color",
                  "product-info__filter__color--black"
                )}
              ></div>
              <div
                className={cx(
                  "product-info__filter__color",
                  "product-info__filter__color--darkblue"
                )}
              ></div>
              <div
                className={cx(
                  "product-info__filter__color",
                  "product-info__filter__color--gray"
                )}
              ></div>
            </div>

            {/* filter size */}

            <div className={cx("product-info__filter")}>
              <span className={cx("product-info__filter__title")}>Size</span>
              <select className={cx("product-info__filter__size")}>
                <option
                  className={cx("product-info__filter__option")}
                  value="XS"
                >
                  XS
                </option>
                <option
                  className={cx("product-info__filter__option")}
                  value="S"
                >
                  S
                </option>
                <option
                  className={cx("product-info__filter__option")}
                  value="M"
                >
                  M
                </option>
                <option
                  className={cx("product-info__filter__option")}
                  value="L"
                >
                  L
                </option>
                <option
                  className={cx("product-info__filter__option")}
                  value="XL"
                >
                  XL
                </option>
              </select>
            </div>
          </div>

          <div className={cx("product-info__addContainer")}>
            <div className={cx("product-info__amountContainer")}>
              <Remove />
              <span className={cx("product-info__amount")}>1</span>
              <Add />
            </div>
            <button className={cx("product-info__button")}>ADD TO CART</button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
