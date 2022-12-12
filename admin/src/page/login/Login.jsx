import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
// import { login } from "~/redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { loginStart } from "~/redux/authRedux";
// import useMessageApi from "~/messageApi";

const cx = classNames.bind(styles);

const Login = () => {
  // const navigate = useNavigate();

  // const [user, setUser] = useState(true);
  // const user = useSelector(state => state.auth.login.currentUser);

  useEffect(() => {
    document.title = "SIGN IN"
  }, [])

  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1500);
  //   }
  // }, [user])

  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();
  // const dispatch = useDispatch();

  // const handleClick = (e) => {
  //   e.preventDefault();

  //   login(dispatch, { username, password });
  // }

//   const [messageApi, contextMsg] = useMessageApi();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required").matches(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,14}[a-zA-Z0-9]$/, "Username must be 4-14 characters which include letter or number"),
      password: Yup.string().required("Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters, one letter and one number"),
    }),
    onSubmit: (values) => {
    //   login(dispatch, values, navigate, messageApi);
      // formik.resetForm();
    },
  })

  useEffect(() => {
    // dispatch(loginStart());
  }, [])

  // const { error, errMsg } = useSelector(state => state.auth.login);
  // console.log(useSelector(state => state.auth.login));

  const error = "";
  const errMsg = "";

  return (
    <div className={cx("login-container")}>
      {/* {contextMsg} */}
      <div className={cx("login-wrapper")}>
        <h1 className={cx("login-title")}>SIGN IN</h1>
        <form onSubmit={formik.handleSubmit} className={cx("login-form")}>
          <input className={cx("login-input")} placeholder="Username" 
            onChange={formik.handleChange}
            value={formik.values.username}
            id="username"
            name="username"
          />
          {formik.errors.username && (
            <p className={cx("error-msg")}>{formik.errors.username}</p>
          )}
          <input
            type="password"
            className={cx("login-input")}
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            name="password"
          />
          {formik.errors.password && (
            <p className={cx("error-msg")}>{formik.errors.password}</p>
          )}
          {error && (
            <p className={cx("error-msg")}>{errMsg}</p>
          )}
          <div className={cx("login-footer")}>
            <button 
              className={cx("login-button")}
              type="submit"
            >SIGN IN</button>
            
            <div className={cx("login-otherlink")}>
              <Link className={cx("login-link")} to=".">
                Forgot your password?
              </Link>
              <Link className={cx("login-link")} to="/register">
                Create a new account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
