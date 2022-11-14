import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";

const cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx("text-red")}>Navbar</div>
  )
}

export default Navbar