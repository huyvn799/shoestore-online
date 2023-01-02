 
import classNames from "classnames/bind";
import styles from "./CheckoutSuccess.module.scss";
import axios from "axios";
import { Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetCart } from "~/redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { getLatestOrder, updateCart } from "~/redux/apiCalls";
import { useState } from "react";
import { ordersFetch } from "~/redux/orderRedux";

const cx = classNames.bind(styles);

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.login.currentUser);
  // const orders = useSelector(state => state.order?.items)
  // // ?.sort((a, b) => b.createdAt - a.createdAt);

  // const [orderId, setOrderId] = useState("");

  useEffect(() => {
    navigate("/checkout-success");
    return () => {
      dispatch(resetCart())
      updateCart(cart, dispatch, user?.accessToken, user?._id)
    }
  }, [dispatch]);

  useEffect(() => {
    // dispatch(ordersFetch(user));
    // const newOrders = Array.from(orders)?.sort((a, b) => {return -1;});

    // setOrderId(orders?.length > 0 ? newOrders[0]?._id : "");
    // window.location.href = window.location;
    // getLatestOrder(user.accessToken, user._id, dispatch)
  }, [])

  return (
    <div className={cx('checkout-container')}>
      <Result
        status="success"
        title="Payment Successfully!"
        // subTitle={`Order id: ${orderId}. Please, wait for few days to receive your order.`}
        subTitle={`Please, wait for few days to receive your order.`}
        extra={[
          <Link to="/">Back to homepage</Link>
        ]}
      />
    </div>
  );
};

export default CheckoutSuccess;
