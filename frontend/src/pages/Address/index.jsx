import React from "react";

import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import classNames from "classnames/bind";
import styles from "./Address.module.scss";
const cx = classNames.bind(styles);

const AdreesItem = () => {
  return (
    <div className={cx("address-item")}>
      <div className={cx("address-item__left")}>
        <div className={cx("address-item__name")}>
          <h4>Tuân Nguyễn</h4>
          <div className={cx("address-item__default")}>
            <CheckCircleOutlineIcon
              className={cx("address-item__default__icon")}
            />
            <span>Địa chỉ mặc định</span>
          </div>
        </div>
        <div className={cx("address-item__detail")}>
          <span className={cx("address-item__detail__label")}>Địa chỉ:</span>
          <span>168 THÔN 4, Xã Minh Hưng, Huyện Bù Đăng, Bình Phước</span>
        </div>

        <div className={cx("address-item__detail")}>
          <span className={cx("address-item__detail__label")}>
            Số điện thoại:
          </span>
          <span>0325090887</span>
        </div>
      </div>
      <div className={cx("address-item__right")}>
        <a className={cx("address-item__right__edit")} href="#">
          Chỉnh sửa
        </a>
        <a className={cx("address-item__right__delete")} href="#">
          Xóa
        </a>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className={cx("address-container")}>
      <div className={cx("address-wrap")}>
        <h3>Sổ địa chỉ</h3>
        <div className={cx("address-add")}>
          <a className={cx("address-add__button")} href="#">
            <AddIcon className={cx("address-add__button__icon")} />
            Thêm địa chỉ mới
          </a>
        </div>
        <div className={cx("address-content")}>
          <AdreesItem />
          <AdreesItem />
          <AdreesItem />
          <AdreesItem />
        </div>
      </div>
    </div>
  );
};

export default Address;
