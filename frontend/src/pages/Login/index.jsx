import React from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
const cx = classNames.bind(styles);
const Login = () => {
  return (
    <div className={cx("login-container")}>
      <div className={cx("login-wrapper")}>
        <h1 className={cx("login-title")}>SIGN IN</h1>
        <form action="post" className={cx("login-form")}>
          <input className={cx("login-input")} placeholder="password" />
          <input className={cx("login-input")} placeholder="username" />
          <button className={cx("login-button")}>SIGN IN</button>
          <a className={cx("login-link")} href=".">
            DO NOT YOU REMEMBER THE PASSWORD?
          </a>
          <a className={cx("login-link")} href=".">
            CREATE A NEW ACCOUNT
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
