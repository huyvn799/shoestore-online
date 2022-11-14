import React from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
const cx = classNames.bind(styles);
const Register = () => {
  return (
    <div className={cx("register-container")}>
      <div className={cx("register-wrapper")}>
        <h1 className={cx("register-title")}>CREATE AN ACCOUNT</h1>
        <form className={cx("register-form")} action="post">
          <input
            className={cx("register-input")}
            placeholder="name"
            type="text"
          />
          <input
            className={cx("register-input")}
            placeholder="last name"
            type="text"
          />
          <input
            className={cx("register-input")}
            placeholder="use name"
            type="text"
          />
          <input
            className={cx("register-input")}
            placeholder="email"
            type="text"
          />
          <input
            className={cx("register-input")}
            placeholder="password"
            type="text"
          />
          <input
            className={cx("register-input")}
            placeholder="confirm password"
            type="text"
          />

          <span className={cx("register-agreement")}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>

          <button className={cx("register-button")}>CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
