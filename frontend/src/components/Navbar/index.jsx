import { Badge } from "@material-ui/core";
// import MailIcon from "@material-ui/icons/Mail";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { AccountCircleOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCartOutlined as ShoppingCart,
  DownOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  CommentOutlined, 
  HeartOutlined,
   } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import { logoutUser } from "~/redux/apiCalls";
import { useEffect } from "react";
import { useState } from "react";
import {modalInfo} from "~/modalNotify";

const cx = classNames.bind(styles);

const Navbar = () => {
  const quantity = useSelector((state) => state.cart?.cartQuantity);

  const user = useSelector((state) => state.auth.login.currentUser);
  // const user = true;

  // useEffect(() => {

  // }, [user])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    // console.log('click', e);
  };

  const handleLogout = () => {

    // console.log(user);
    logoutUser(user?.accessToken, user?._id, dispatch, navigate);
  };

  const items = [
    {
      label: <Link to="/customer/profile">My Profile</Link>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/customer/order">My Order</Link>,
      key: "2",
      icon: <ShoppingCart />,
    },
    {
      label: <Link to="/customer/wishlist">Wishlist</Link>,
      key: "3",
      icon: <HeartOutlined />,
    },
    {
      label: <Link to="/customer/review">My reviews</Link>,
      key: "4",
      icon: <CommentOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={handleLogout}>Logout</div>,
      key: "5",
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps = {
    items,
    // onClick: handleMenuClick,
  };

  return (
    <div className={cx("nav-container")}>
      <div className={cx("nav-wrapper")}>
        <div className={cx("nav-left")}>
          <span className={cx("nav-language")}>EN</span>
          <div className={cx("nav-search_container")}>
            <input
              placeholder="Search"
              className={cx("nav-search_input")}
              type="text"
            />
            <Link to="/products">
              <Search style={{ color: "gray", fontSize: 16 }} />
            </Link>
          </div>
        </div>
        <div className={cx("nav-center")}>
          <Link to="/">
            <h1 className={cx("nav-logo")}>SPORTY SHOE.</h1>
          </Link>
        </div>
        <div className={cx("nav-right")}>
          {/* <div className={cx("nav-menu__item")}>
            <div className={cx("nav-menu__dropdown-menu")}>
              <ul className={cx("nav-menu__dropdown-menu__Ul")}>
                <li className={cx("nav-menu__dropdown-menu__Ul__Li")}>
                  Đơn hàng của tôi
                </li>
                <li className={cx("nav-menu__dropdown-menu__Ul__Li")}>
                  Thông báo của tôi
                </li>
                <li className={cx("nav-menu__dropdown-menu__Ul__Li")}>
                  Tài khoản của tôi
                </li>
                <li className={cx("nav-menu__dropdown-menu__Ul__Li")}>
                  Đánh giá sản phẩm
                </li>
                <li className={cx("nav-menu__dropdown-menu__Ul__Li")}>
                  Thoát tài khoản
                </li>
              </ul>
            </div>
          </div> */}

          {user ? (
            <>
              <div className={cx("nav-menu__item")}>
              <Dropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<DownOutlined />}
              >
                Hi, {user.username}
              </Dropdown.Button>
            </div>
            <Link to="/cart">
              <div className={cx("nav-menu__item")}>
                <Badge
                  badgeContent={quantity}
                  color="primary"
                  style={{ color: "teal" }}
                >
                  <ShoppingCartOutlined />
                </Badge>
              </div>
            </Link>
            
            </>
          ) : (
            <>
              <Link to="/register">
                <div className={cx("nav-menu__item")}>REGISTER</div>
              </Link>
              <Link to="/login">
                <div className={cx("nav-menu__item")}>SIGN IN</div>
              </Link>
              <div className={cx("nav-menu__item")}
                onClick={() => modalInfo("view your cart", navigate)}
              >
                <Badge
                  badgeContent={quantity}
                  color="primary"
                  style={{ color: "teal" }}
                >
                  <ShoppingCartOutlined />
                </Badge>
              </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
