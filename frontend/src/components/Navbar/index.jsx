import { Badge } from "@material-ui/core";
// import MailIcon from "@material-ui/icons/Mail";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

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
          <Link to="/register">
            <div className={cx("nav-menu__item")}>REGISTER</div>
          </Link>
          <Link to="/login">
            <div className={cx("nav-menu__item")}>SIGN IN</div>
          </Link>
          <Link to="/cart">
            <div className={cx("nav-menu__item")}>
              <Badge badgeContent={quantity} color="primary">
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
