import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import classNames from "classnames/bind";
import styles from "./History.module.scss";

const cx = classNames.bind(styles);

const HistoryItem = () => {
  return (
    <div className={cx("history-cart__item")}>
      <div className={cx("history-cart__item__des")}>
        <div className={cx("history-cart__item__wrapImg")}>
          <img
            className={cx("history-cart__item__img")}
            src="https://hoang-phuc.com/thoi-trang/wp-content/uploads/2021/12/giay-sneaker-nam-de-cao-ca-tinh.jpg"
            alt=""
          />
          <div className={cx("history-cart__item__amount")}>
            <span>x2</span>
          </div>
        </div>
        <div className={cx("history-cart__item__name")}>
          <h4>Giày thể thao</h4>
          <div className={cx("history-cart__item__iconWrap")}>
            <StoreIcon className={cx("history-cart__item__icon")} />
            <span className={cx("history-cart__item__label")}>
              King men sport
            </span>
          </div>
        </div>
      </div>
      <div className={cx("history-cart__item__cost")}>
        <span>100.000 đ</span>
      </div>
    </div>
  );
};

const HistoryCart = () => {
  return (
    <div className={cx("history-cart")}>
      <div className={cx("history-cart__top")}>
        <LocalShippingIcon className={cx("history-cart__top__icon")} />
        <span className={cx("history-cart__top__title")}>
          Giao hàng thành công
        </span>
      </div>

      <div className={cx("history-cart__center")}>
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
      </div>
      <div className={cx("history-cart__bottom")}>
        <div></div>
        <div className={cx("history-cart__bottom__checkout")}>
          <div className={cx("history-cart__bottom__cost")}>
            <span className={cx("history-cart__bottom__cost__label")}>
              Tổng tiền:
            </span>
            <span className={cx("history-cart__bottom__cost__value")}>
              100.000 đ
            </span>
          </div>
          <div className={cx("history-cart__bottom__button")}>
            <button className={cx("history-cart__bottom__button__sell")}>
              Mua lại
            </button>
            <button className={cx("history-cart__bottom__button__search")}>
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const History = () => {
  return (
    <div className={cx("history-container")}>
      <div className={cx("history-wrap")}>
        <h2>Đơn hàng của tôi</h2>
        <div className={cx("history-content")}>
          <div className={cx("history-nav")}>
            <div className={cx("history-nav__wrap")}>
              <div
                className={cx("history-nav__item", "history-nav__item--active")}
              >
                Tất cả đơn
              </div>
              <div className={cx("history-nav__item")}>Chờ thanh toán</div>
              <div className={cx("history-nav__item")}>Đang xử lý</div>
              <div className={cx("history-nav__item")}>Đang vận chuyển</div>
              <div className={cx("history-nav__item")}>Đã giao</div>
              <div className={cx("history-nav__item")}>Đã hủy</div>
            </div>
          </div>

          <div className={cx("history-search")}>
            <SearchIcon className={cx("history-search__icon")} />
            <input
              className={cx("history-search__input")}
              placeholder="Tìm kiếm đơn hàng"
              type="text"
            ></input>
            <button className={cx("history-search__button")}>
              Tìm đơn hàng
            </button>
          </div>

          <div className={cx("history-detail")}>
            <HistoryCart />
            <HistoryCart />
            <HistoryCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
