import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { login } from "~/redux/apiCalls";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const Login = () => {
  // const navigate = useNavigate();

  // const [user, setUser] = useState(true);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user])

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
  }

  return (
    <div className={cx("login-container")}>
      <div className={cx("login-wrapper")}>
        <h1 className={cx("login-title")}>SIGN IN</h1>
        <form action="post" className={cx("login-form")}>
          <input className={cx("login-input")} placeholder="username" 
          onChange={(e) => setUsername(e.target.value) }
            value={username}
          />
          <input
            type="password"
            className={cx("login-input")}
            placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button 
            className={cx("login-button")}
            onClick={handleClick}
          >SIGN IN</button>
          <Link className={cx("login-link")} to=".">
            DO NOT YOU REMEMBER THE PASSWORD?
          </Link>
          <Link className={cx("login-link")} to=".">
            CREATE A NEW ACCOUNT
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
