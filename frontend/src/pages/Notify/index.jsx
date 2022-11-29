import React from "react";
import classNames from "classnames/bind";
import styles from "./Notify.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const cx = classNames.bind(styles);

const ButtonNavbar = () => {
  return (
    <div className={cx("notify-buttonNav")}>
      <HomeIcon className={cx("notify-iconNav")} />
      <div className={cx("notify-redDot")}></div>
    </div>
  );
};

const NavbarContent = () => {
  return (
    <div className={cx("notify-navbar")}>
      <div className={cx("notify-navbar__button")}>
        <ButtonNavbar />
        <ButtonNavbar />
        <ButtonNavbar />
        <ButtonNavbar />
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

const ItemContent = () => {
  return (
    <div className={cx("notify-content__item")}>
      <div className={cx("notify-content__item__time")}>12/12/2022</div>
      <div className={cx("notify-content__item__desc")}>
        <span className={cx("notify-content__item__desc__icon")}>icon</span>
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
        <h3>Thông báo của tôi (2)</h3>
        <div className={cx("notify-content")}>
          <NavbarContent />
          <div className={cx("notify-content__detail")}>
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
            <ItemContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notify;
