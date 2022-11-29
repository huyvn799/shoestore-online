import React from "react";
import classNames from "classnames/bind";
import styles from "./Review.module.scss";
const cx = classNames.bind(styles);
const ItemWaiting = () => {
  return (
    <div className={cx("review-itemWaiting")}>
      <h4>Đã mua ngày: 22/12/2022</h4>
      <div className={cx("review-itemWaiting__content")}>
        <div className={cx("review-itemWaiting__left")}>
          <img
            className={cx("review-itemWaiting__img")}
            src="https://hoang-phuc.com/thoi-trang/wp-content/uploads/2021/12/giay-sneaker-nam-de-cao-ca-tinh.jpg"
            alt=""
          />
          <div className={cx("review-itemWaiting__desc")}>
            <span>Giày thể thao cao cấp</span>
            <span>Màu: đen</span>
            <span>Size: 42</span>
          </div>
        </div>
        <div className={cx("review-itemWaiting__right")}>
          <span className={cx("review-itemWaiting__right__label")}>
            Viết nhận xét
          </span>
          <button className={cx("review-itemWaiting__button")}>Nhận xét</button>
        </div>
      </div>
    </div>
  );
};

const ItemDone = () => {
  return <div>Done</div>;
};

const Review = () => {
  return (
    <div className={cx("review-container")}>
      <div className={cx("review-wrap")}>
        <h2>Nhận xét của tôi</h2>
        <div className={cx("review-content")}>
          <div className={cx("review-nav")}>
            <div className={cx("review-nav__tab", "review-nav__tab--active")}>
              <span>Chưa viết đánh giá (4)</span>
            </div>
            <div className={cx("review-nav__tab")}>
              <span>Lịch sử đánh giá (2)</span>
            </div>
          </div>

          <div className={cx("review-list")}>
            <ItemWaiting />
            <ItemWaiting />
            <ItemWaiting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
