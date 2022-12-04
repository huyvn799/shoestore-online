import React from "react";
import classNames from "classnames/bind";
import styles from "./Notify.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DiscountIcon from "@mui/icons-material/Discount";
import HistoryIcon from "@mui/icons-material/History";
const cx = classNames.bind(styles);

const ButtonNavbar = (props) => {
  return (
    <div className={cx("notify-buttonNav", props.type)}>
      <props.icon className={cx("notify-iconNav")} />
      <div className={cx("notify-redDot")}></div>
    </div>
  );
};

const NavbarContent = () => {
  return (
    <div className={cx("notify-navbar")}>
      <div className={cx("notify-navbar__button")}>
        <ButtonNavbar icon={HomeIcon} type="notify-buttonNav--active" />
        <ButtonNavbar icon={DiscountIcon} />
        <ButtonNavbar icon={MonetizationOnIcon} />
        <ButtonNavbar icon={HistoryIcon} />
      </div>
      <div className={cx("notify-navbar__option")}>
        <FormatListBulletedIcon className={cx("notify-navbar__option__icon")} />
        <div className={cx("notify-navbar__menu")}>
          <ul className={cx("notify-navbar__menu__ul")}>
            <li className={cx("notify-navbar__menu__li")}>
              Đánh dấu đọc tất cả
            </li>
            <li className={cx("notify-navbar__menu__li")}>
              Xóa tất cả thông báo
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ItemContent = (props) => {
  return (
    <div className={cx("notify-content__item")}>
      <div className={cx("notify-content__item__time")}>12/12/2022</div>
      <div className={cx("notify-content__item__desc")}>
        <props.icon className={cx("notify-content__item__desc__icon")} />

        <span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          repellat ullam ad, facilis accusamus praesentium modi similique ipsa
          quidem officia?
        </span>
      </div>
      <div className={cx("notify-content__item__check")}>
        <span className={cx("notify-content__item__check__read")}>
          Đánh dấu đọc
        </span>
        <span className={cx("notify-content__item__check__delete")}>Xóa</span>
      </div>
    </div>
  );
};

const Notify = () => {
  return (
    <div className={cx("notify-container")}>
      <div className={cx("notify-wrap")}>
        <h2>Thông báo của tôi (2)</h2>
        <div className={cx("notify-content")}>
          <NavbarContent />
          <div className={cx("notify-content__detail")}>
            <ItemContent icon={DiscountIcon} />
            <ItemContent icon={DiscountIcon} />
            <ItemContent icon={MonetizationOnIcon} />
            <ItemContent icon={DiscountIcon} />
            <ItemContent icon={DiscountIcon} />
            <ItemContent icon={MonetizationOnIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notify;
