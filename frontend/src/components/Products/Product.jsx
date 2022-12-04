import { memo, useEffect, useState } from "react";
import styles from "./Product.module.scss";
import classNames from "classnames/bind";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { publicRequest } from "~/requestMethod";
import {modalInfo} from "~/modalNotify";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Product = ({ item }) => {
  
  const [wishlist, setWishlist] = useState(false);

  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  const handleWishlist = () => {
    if (user) {
      setWishlist(!wishlist);
    } else {
      modalInfo("add to your wishlist", navigate)
    }
  }

  return (
    <div className={cx("product-container")}>
      <div className={cx("product-circle")}></div>
      <img className={cx("product-image")} src={item.img} alt="logo" />
      <div className={cx("product-info")}>
        {/* <div className={cx("product-icon")}>
          <ShoppingCartOutlined />
        </div> */}
        <Link to={`/product/${item._id}`}>
          <div className={cx("product-icon")}>
            <SearchOutlined />
          </div>
        </Link>
        <div className={cx("product-icon", wishlist ? "product-icon-wishlist" : "")}
          onClick={handleWishlist}
        >
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default memo(Product);
