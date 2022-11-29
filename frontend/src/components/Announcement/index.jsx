 
import classNames from "classnames/bind";
import styles from "./Announcement.module.scss";

const cx = classNames.bind(styles);

const Announcement = () => {
  return (
    <div className={cx("announ-container")}>
      Happy BlackFriday! Biggest sale of the year. Sale off to 80%
    </div>
  );
};

export default Announcement;
