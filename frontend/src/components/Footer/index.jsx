import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <div className={cx("footer-container")}>
      <div className={cx("footer-left")}>
        <h1 className={cx("footer-logo")}>TuanStore</h1>
        <p className={cx("footer-desc")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          voluptate quidem ex beatae? Neque dignissimos error accusantium
          expedita ipsa reprehenderit.
        </p>
        <div className={cx("footer-socialContainer")}>
          <div
            className={cx("footer-socialIcon", "footer-socialIcon--facebook")}
          >
            <Facebook />
          </div>
          <div
            className={cx("footer-socialIcon", "footer-socialIcon--instagram")}
          >
            <Instagram />
          </div>
          <div
            className={cx("footer-socialIcon", "footer-socialIcon--twitter")}
          >
            <Twitter />
          </div>
          <div
            className={cx("footer-socialIcon", "footer-socialIcon--pinterest")}
          >
            <Pinterest />
          </div>
        </div>
      </div>
      <div className={cx("footer-center")}>
        <h3 className={cx("footer-title")}>Useful Links</h3>
        <ul className={cx("footer-list")}>
          <li className={cx("footer-list__item")}>Home</li>
          <li className={cx("footer-list__item")}>Cart</li>
          <li className={cx("footer-list__item")}>Man Fashion</li>
          <li className={cx("footer-list__item")}>Shoes Fashion</li>
          <li className={cx("footer-list__item")}>Accessories</li>
          <li className={cx("footer-list__item")}>My Account</li>
          <li className={cx("footer-list__item")}>Order Tracking</li>
          <li className={cx("footer-list__item")}>Wishlist</li>
          <li className={cx("footer-list__item")}>Wishlist</li>
          <li className={cx("footer-list__item")}>Terms</li>
        </ul>
      </div>
      <div className={cx("footer-right")}>
        <h3 className={cx("footer-title")}>Contact</h3>
        <div className={cx("footer-contactItem")}>
          <Room style={{ marginRight: "10px" }} />
          Quan 9, Tp.HCM, VietNam
        </div>
        <div className={cx("footer-contactItem")}>
          <Phone style={{ marginRight: "10px" }} />
          +84 123020201010
        </div>
        <div className={cx("footer-contactItem")}>
          <MailOutline style={{ marginRight: "10px" }} />
          abc@gmail.com
        </div>
        <img
          className={cx("footer-payment")}
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Footer;
