 
import Navbar from "~/components/Navbar";
import Announcement from "~/components/Announcement";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import CartProduct from "./CartProduct";
import Footer from "~/components/Footer";
import CartSummary from "./CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmptyData from "~/components/EmptyData";
import { resetCart } from "~/redux/cartRedux";
import { updateCart } from "~/redux/apiCalls";

const cx = classNames.bind(styles);

const Cart = () => {

  const user = useSelector(state=> state.auth.login.currentUser);
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My cart"
  }, [])

  useEffect(() => {
    // if (!user) {
    //   // console.log(user);
    //   navigate("/");
    // }
  }, [user])

  useEffect(() => {
    if (user) {
      // console.log(user);
      updateCart( cart, dispatch, user.accessToken, user._id)
      // setTimeout(() => {
      // }, 1000)
    }
    // return () => {
    //   console.log("delete");
    // }
  }, [cart])

  const handleClearCart = () => {
    dispatch(resetCart());
    // updateCart( cart, dispatch, user.accessToken, user._id)
  }

  return (
    <div className={cx("cart-container")}>
      {/* <Navbar /> */}
      <Announcement />
      <div className={cx("cart-wrapper")}>
        <h1 className={cx("cart-title")}>YOUR SHOES</h1>
        <div className={cx("cart-top")}>
          <Link to="/" className={cx("cart-top__button", "cart-top__button-continue")}>Continue shopping</Link>
          {/* <div className={cx("cart-top__texts")}>
            <span className={cx("cart-top__texts__text")}>
              Shopping shoes ({cart.quantity})
            </span>
            <span className={cx("cart-top__texts__text")}>
              Your Wishlist (0)
            </span>
          </div> */}
          <button
            className={cx("cart-top__button",  "cart-top__button-clear")}
            onClick={() => handleClearCart()}
          >
            Clear cart
          </button>
        </div>

        <div className={cx("cart-bottom")}>
          <div className={cx("cart-info")}>
            {
              cart.cartItems?.length === 0 ? (
                <div style={{ display: "flex", margin: "auto" }}>
                  <EmptyData desc="No products in your cart" />
                </div>
              ) : (
                cart.cartItems.map((product) => (
                  <div key={product.id}>
                    <CartProduct cartProduct={product} user={user} cart={cart}/>
                  </div>
                ))
              )
            }
          </div>
          <div className={cx("cart-summary__container")}>
            <CartSummary cart={cart}/>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;
