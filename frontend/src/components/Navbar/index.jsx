import { Badge } from "@material-ui/core";
// import MailIcon from "@material-ui/icons/Mail";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";

const cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx("nav-container")}>
      <div className={cx("nav-wrapper")}>
        <div className={cx("nav-left")}>
          <span className={cx("nav-language")}>EN</span>
          <div className={cx("nav-search_container")}>
            <input className={cx("nav-search_input")} type="text" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </div>
        </div>
        <div className={cx("nav-center")}>
          <h1 className={cx("nav-logo")}>TuanStore</h1>
        </div>
        <div className={cx("nav-right")}>
          <div className={cx("nav-menu_item")}>REGISTER</div>
          <div className={cx("nav-menu_item")}>SIGN IN</div>
          <div className={cx("nav-menu_item")}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
