import React from "react";
import classNames from "classnames/bind";
import styles from "./EditAddress.module.scss";
const cx = classNames.bind(styles);

const EditAddress = () => {
  return (
    <div className={cx("editAddress-container")}>
      <div className={cx("editAddress-wrap")}>
        <h2>Chỉnh sửa địa chỉ</h2>

        <div className={cx("editAddress-content")}>
          <form action="#">
            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Họ và tên</span>
              <input className={cx("editAddress-input")} type="text" />
            </div>
            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Công ty</span>
              <input className={cx("editAddress-input")} type="text" />
            </div>
            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Số điện thoại</span>
              <input className={cx("editAddress-input")} type="text" />
            </div>

            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Tỉnh / Thành phố</span>
              <select
                className={cx("editAddress-input")}
                name="selectQH"
                id="selectQH"
              >
                <option value="HCM">Hồ Chí Minh</option>
                <option value="HN">Hà Nội</option>
                <option value="BD">Bình Dương</option>
                <option value="HP">Hải Phòng</option>
                <option value="DL">Đà Lạt</option>
              </select>
            </div>

            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Quận huyện</span>
              <select
                className={cx("editAddress-input")}
                name="selectQH"
                id="selectQH"
              >
                <option value="HCM">Quận 1</option>
                <option value="HN">Quận 2</option>
                <option value="BD">Quận 3</option>
                <option value="HP">Quận 4</option>
                <option value="DL">Quận 5</option>
              </select>
            </div>
            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Phường xã</span>
              <select
                className={cx("editAddress-input")}
                name="selectQH"
                id="selectQH"
              >
                <option value="HCM">Tân Bình</option>
                <option value="HN">Bến Nghé</option>
                <option value="BD">Cầu Kho</option>
                <option value="HP">Phạm Ngũ Lão</option>
                <option value="DL">Tân Định</option>
              </select>
            </div>

            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Địa chỉ</span>
              <textarea
                className={cx("editAddress-input")}
                id="textareaAddress"
                name="textareaAddress"
                rows="4"
                cols="50"
              />
            </div>
            <div className={cx("editAddress-row")}>
              <span className={cx("editAddress-label")}>Loại địa chỉ:</span>
              <div className={cx("editAddress-checkbox")}>
                <input type="radio" name="rdHome" id="rdAddress" />
                <span>Nhà riêng / Chung cư</span>
              </div>
              <div className={cx("editAddress-checkbox")}>
                <input type="radio" name="rdHome" id="rdAddress" />
                <span>Cơ quan / Công ty</span>
              </div>
            </div>
            <button className={cx("editAddress-submit")}>Cập nhật</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
