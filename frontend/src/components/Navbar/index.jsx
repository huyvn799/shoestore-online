import { Badge } from "@material-ui/core";
// import MailIcon from "@material-ui/icons/Mail";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined,LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { logoutUser } from "~/redux/apiCalls";

const cx = classNames.bind(styles);

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  const user = useSelector((state) => state.auth.login.currentUser);
  // const user = true;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  
  const handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    // console.log('click', e);
  };

  const handleLogout = () => {
    logoutUser(user?.accessToken, user?._id, dispatch, navigate);
  }
  
  const items = [
    {
      label: (<Link to="/profile">Profile</Link>),
      key: '1',
      icon: <UserOutlined />,
    },
    { 
      type: "divider",
    },
    {
      label: (<div onClick={handleLogout}>Logout</div>),
      key: '2',
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
            <Search style={{ color: "gray", fontSize: 16 }} />
          </div>
        </div>
        <div className={cx("nav-center")}>
          <Link to="/">
            <h1 className={cx("nav-logo")}>SPORTY SHOE.</h1>
          </Link>
        </div>
        <div className={cx("nav-right")}>
          {
            user ? (
              <div className={cx("nav-menu__item")}>
                <Dropdown.Button  menu={menuProps} placement="bottom" icon={<DownOutlined />}>
                  Hi, {user.username}
                </Dropdown.Button>
              </div>
            ) : (
              <>
                <Link to="/register">
                  <div className={cx("nav-menu__item")}>REGISTER</div>
                </Link>
                <Link to="/login">
                  <div className={cx("nav-menu__item")}>SIGN IN</div>
                </Link>
              </>
            )
          }
          <Link to="/cart">
            <div className={cx("nav-menu__item")}>
              <Badge badgeContent={quantity} color="primary" style={{ color: "teal" }}>
                <ShoppingCartOutlined />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
