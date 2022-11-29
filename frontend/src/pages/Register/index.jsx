import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "~/redux/apiCalls";
import { useEffect } from "react";
import { registerStart } from "~/redux/authRedux";
import useMessageApi from "~/messageApi";

const cx = classNames.bind(styles);


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  useEffect(() => {
    dispatch(registerStart());
  }, [])
  
  const {error, errMsg} = useSelector(state => state.auth.register);
  
  const [messageApi, contextMsg] = useMessageApi();
  
  // console.log("[error]", error);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmedPassword: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Please enter a valid email"),
      username: Yup.string().required("Required").matches(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,14}[a-zA-Z0-9]$/, "Username must be 4-14 characters which include letter or number"),
      password: Yup.string().required("Required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters, one letter and one number"),
      confirmedPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Password must match")
    }),
    onSubmit: (newUser) => {
      // console.log(newUser);
      registerUser(newUser, dispatch, navigate, messageApi);
  
      // formik.resetForm();
    },
  });
  return (
    <div className={cx("register-container")}>
      {contextMsg}
      <div className={cx("register-wrapper")}>
        <h1 className={cx("register-title")}>CREATE AN ACCOUNT</h1>
        <form onSubmit={formik.handleSubmit} className={cx("register-form")}>
          <input
            className={cx("register-input")}
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && (
            <p className={cx("error-msg")}>{formik.errors.username}</p>
          )}
          <input
            className={cx("register-input")}
            placeholder="Email"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className={cx("error-msg")}>{formik.errors.email}</p>
          )}
          <input
            className={cx("register-input")}
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className={cx("error-msg")}>{formik.errors.password}</p>
          )}
          <input
            className={cx("register-input")}
            placeholder="Confirm password"
            type="password"
            id="confirmedPassword"
            name="confirmedPassword"
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmedPassword && (
            <p className={cx("error-msg")}>{formik.errors.confirmedPassword}</p>
          )}
          {error && (
            <p className={cx("error-msg")}>{errMsg}</p>
          )}
          <span className={cx("register-agreement")}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>

          <div className={cx("register-footer")}>
            <button type="submit" className={cx("register-button")}
            >CREATE</button>

            <Link to="/login">You have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
