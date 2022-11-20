import React from "react";
import classNames from "classnames/bind";
import styles from "./Newsletter.module.scss";
import { Send } from "@material-ui/icons";
const cx = classNames.bind(styles);

const Newsletter = () => {
  return (
    <div className={cx("newsLetter-container")}>
      <h1 className={cx("newsLetter-title")}>news letter</h1>
      <div className={cx("newsLetter-description")}>
        get timely updates from your favorite products
      </div>
      <div className={cx("newsLetter-inputContainer")}>
        <input
          placeholder="Your email"
          className={cx("newsLetter-inputContainer__input")}
          type="text"
        />
        <button className={cx("newsLetter-inputContainer__button")}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
