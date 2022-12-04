import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import classNames from "classnames/bind";
import LockIcon from "@mui/icons-material/Lock";
import GppGoodIcon from "@mui/icons-material/GppGood";
import styles from "./Account.module.scss";
const cx = classNames.bind(styles);
function Account() {
  return (
    <div className={cx("account-container")}>
      <div className={cx("account-wrap")}>
        <h2 className={cx("account-title")}>Thông tin tài khoản</h2>
        <div className={cx("account-info")}>
          <form className={cx("account-info__personal")}>
            <h3>Thông tin cá nhân</h3>
            <div className={cx("account-info__avatar")}>
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className={cx("account-info__img")}
              />

              <span className={cx("account-info__name")}>Tuân Nguyễn</span>
            </div>
            <div className={cx("account-info__row")}>
              <div className={cx("account-info__row__left")}>
                <span className={cx("account-info__label")}>Nhập họ tên</span>
              </div>
              <div className={cx("account-info__row__right")}>
                <input
                  className={cx("account-info__input")}
                  placeholder="Nhập họ tên"
                  type="text"
                />
              </div>
            </div>
            <div className={cx("account-info__row")}>
              <div className={cx("account-info__row__left")}>
                <span className={cx("account-info__label")}>Nickname</span>
              </div>
              <div className={cx("account-info__row__right")}>
                <input
                  className={cx("account-info__input")}
                  placeholder="Nhập Nickname"
                  type="text"
                />
              </div>
            </div>

            <div className={cx("account-info__row")}>
              <div className={cx("account-info__row__left")}>
                <span className={cx("account-info__label")}>Ngày sinh</span>
              </div>
              <div className={cx("account-info__row__right")}>
                <div className={cx("account-info__row__item")}>
                  <select>
                    <option value="">Ngày</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                  </select>
                </div>

                <div className={cx("account-info__row__item")}>
                  <select>
                    <option value="">Tháng</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                  </select>
                </div>

                <div className={cx("account-info__row__item")}>
                  <select>
                    <option value="">Năm</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={cx("account-info__row")}>
              <div className={cx("account-info__row__left")}>
                <span className={cx("account-info__label")}>Giới tính</span>
              </div>
              <div className={cx("account-info__row__right")}>
                <div className={cx("account-info__row__item")}>
                  <input
                    className={cx("account-info__row__radio")}
                    type="radio"
                    id="nam"
                    name="check_sex"
                    value="name"
                  />
                  <label for="name">Nam</label>
                </div>

                <div className={cx("account-info__row__item")}>
                  <input
                    className={cx("account-info__row__radio")}
                    type="radio"
                    id="nam"
                    name="check_sex"
                    value="nu"
                  />
                  <label for="Nu">Nữ</label>
                </div>

                <div className={cx("account-info__row__item")}>
                  <input
                    className={cx("account-info__row__radio")}
                    type="radio"
                    id="Khac"
                    name="check_sex"
                    value="khac"
                  />
                  <label for="Khac">Khác</label>
                </div>
              </div>
            </div>

            <div className={cx("account-info__row")}>
              <div className={cx("account-info__row__left")}>
                <span className={cx("account-info__label")}>Quốc tịch</span>
              </div>
              <div className={cx("account-info__row__right")}>
                <div className={cx("account-info__row__item")}>
                  <select>
                    <option value="">Chọn quốc tịch</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                  </select>
                </div>
              </div>
            </div>

            <button className={cx("account-info__btnSubmit")}>
              Lưu những thay đổi
            </button>
          </form>

          <div className={cx("account-info__contact")}>
            <h3>Số điện thoại và Email</h3>
            <div className={cx("account-info__contact__row")}>
              <div className={cx("account-info__contact__left")}>
                <LocalPhoneIcon className={cx("account-info__icon")} />
                <div className={cx("account-info__contact__wrapLable")}>
                  <span>Số điện thoại</span>
                  <span>Thêm số điện thoại</span>
                </div>
              </div>
              <button className={cx("account-info__contact__btnUpdate")}>
                Cập nhật
              </button>
            </div>

            <div className={cx("account-info__contact__row")}>
              <div className={cx("account-info__contact__left")}>
                <EmailIcon className={cx("account-info__icon")} />
                <div className={cx("account-info__contact__wrapLable")}>
                  <span>Địa chỉ email</span>
                  <span>tuannguyen@gmail.com</span>
                </div>
              </div>
              <button className={cx("account-info__contact__btnUpdate")}>
                Cập nhật
              </button>
            </div>

            <h3>Bảo mật</h3>

            <div className={cx("account-info__contact__row")}>
              <div className={cx("account-info__contact__left")}>
                <LockIcon className={cx("account-info__icon")} />
                <div className={cx("account-info__contact__wrapLable")}>
                  <span>Đổi mật khẩu</span>
                </div>
              </div>
              <button className={cx("account-info__contact__btnUpdate")}>
                Cập nhật
              </button>
            </div>

            <div className={cx("account-info__contact__row")}>
              <div className={cx("account-info__contact__left")}>
                <GppGoodIcon className={cx("account-info__icon")} />
                <div className={cx("account-info__contact__wrapLable")}>
                  <span>Thiết lập mã pin</span>
                </div>
              </div>
              <button className={cx("account-info__contact__btnUpdate")}>
                Thiết lập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
