import React from "react";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
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
  return (
    <div className={cx("review-itemDone")}>
      <h4>Đã mua ngày: 22/12/2022</h4>
      <div className={cx("review-itemDone__content")}>
        <div className={cx("review-itemDone__left")}>
          <img
            className={cx("review-itemDone__img")}
            src="https://hoang-phuc.com/thoi-trang/wp-content/uploads/2021/12/giay-sneaker-nam-de-cao-ca-tinh.jpg"
            alt=""
          />
          <div className={cx("review-itemDone__desc")}>
            <h3>Giày thể thao cao cấp</h3>
            <h4>Màu: đen</h4>
            <h4>Size: 42</h4>
          </div>
        </div>
        <div className={cx("review-itemDone__right")}>
          <h4>Nhận xét đánh giá sản phẩm :</h4>
          <div className={cx("review-itemDone__vote")}>
            <StarIcon
              // style={{ color: "gray", fontSize: 16 }}
              className={cx("review-itemDone__star")}
            />
            <StarIcon className={cx("review-itemDone__star")} />
            <StarIcon className={cx("review-itemDone__star")} />
            <StarIcon className={cx("review-itemDone__star")} />
            <StarIcon className={cx("review-itemDone__star")} />
          </div>
          <div className={cx("review-itemDone__cmtContainer")}>
            <div className={cx("review-itemDone__cmtWrap")}>
              <textarea
                className={cx("review-itemDone__cmt")}
                id="txtCmtCustomer"
                name="txtCmtCustomer"
                rows="3"
                cols="50"
                readOnly
              >
                Sản phẩm rất tốt
              </textarea>
              {/* <ThumbUpAltIcon
              className={cx("review-itemDone__like__customer")}
              /> */}
              <div className={cx("review-itemDone__like")}>
                <ThumbUpAltIcon />
                <span>1</span>
              </div>
            </div>
            <h4>Phản hồi từ nhà bán hàng:</h4>
            <div className={cx("review-itemDone__cmtWrap")}>
              <textarea
                className={cx("review-itemDone__cmt")}
                id="txtCmtAdmin"
                name="txtCmtAdmin"
                rows="3"
                cols="50"
                readOnly
              >
                Cảm ơn quý khách đã ủng hộ shop chúng tôi
              </textarea>
              <div className={cx("review-itemDone__like")}>
                <ThumbUpAltIcon />
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
            {/* <ItemWaiting />
            <ItemWaiting />
            <ItemWaiting /> */}

            <ItemDone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
