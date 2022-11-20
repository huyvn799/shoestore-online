import React from "react";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

const Slide = (props) => {
  const { bg, img, title, desc, id } = props;
  return (
    <div style={{ backgroundColor: bg }} className={cx("slider-slide")}>
      {
        id % 2 === 1 ? (
          <>
            <div className={cx("slider-imgContainer")}>
              <img className={cx("slider-image")} src={img} alt="logo" />
            </div>
            <div className={cx("slider-infoContainer")}>
              <h1 className={cx("slider-title")}>{title}</h1>
              <p className={cx("slider-desc")}>{desc}</p>
              <button className={cx("slider-button")}>Show now</button>
            </div>
          </>
        ) : (
          <>
            <div className={cx("slider-infoContainer")}>
              <h1 className={cx("slider-title")}>{title}</h1>
              <p className={cx("slider-desc")}>{desc}</p>
              <button className={cx("slider-button")}>Show now</button>
            </div>
            <div className={cx("slider-imgContainer")}>
              <img className={cx("slider-image")} src={img} alt="logo" />
            </div>
          </>
        )
      }
    </div>
  );
};

export default Slide;
