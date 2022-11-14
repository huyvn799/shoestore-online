import React from "react";
import classNames from "classnames/bind";
import styles from "./Announcement.module.scss";

const cx = classNames.bind(styles);

const Announcement = () => {
  return (
    <div className={cx("announ-container")}>
      Sieu uuw dai free ship voi hoa don tren 500k
    </div>
  );
};

export default Announcement;
