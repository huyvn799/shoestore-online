import React from "react";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames/bind";
import styles from "./WishList.module.scss";
const cx = classNames.bind(styles);

const WishListItem = () => {
  return (
    <div className={cx("wishlist-item")}>
      <div className={cx("wishlist-item__left")}>
        <img
          className={cx("wishlist-item__img")}
          src="https://hoang-phuc.com/thoi-trang/wp-content/uploads/2021/12/giay-sneaker-nam-de-cao-ca-tinh.jpg"
          alt=""
        />
        <div className={cx("wishlist-item__des")}>
          <a className={cx("wishlist-item__name")} href="#">
            Giày thể thao nam
          </a>
          <div className={cx("wishlist-item__vote")}>
            <div className={cx("wishlist-item__vote__iconWrap")}>
              <StarIcon className={cx("wishlist-item__vote__start")} />
              <StarIcon className={cx("wishlist-item__vote__start")} />
              <StarIcon className={cx("wishlist-item__vote__start")} />
              <StarIcon className={cx("wishlist-item__vote__start")} />
              <StarIcon className={cx("wishlist-item__vote__start")} />
            </div>
            <span>(91 nhận xét)</span>
          </div>
        </div>
      </div>

      <div className={cx("wishlist-item__right")}>
        <div className={cx("wishlist-item__cost")}>100.000 đ</div>
        <div className={cx("wishlist-item__close")}>
          <CloseIcon className={cx("wishlist-item__close__icon")} />
        </div>
      </div>
    </div>
  );
};

const WishList = () => {
  return (
    <div className={cx("wishlist-container")}>
      <div className={cx("wishlist-wrap")}>
        <h2>Danh sách yêu thích (3)</h2>
        <div className={cx("wishlist-content")}>
          <WishListItem />
          <WishListItem />
          <WishListItem />
          <WishListItem />
        </div>
      </div>
    </div>
  );
};

export default WishList;
