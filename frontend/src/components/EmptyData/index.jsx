 
import classNames from "classnames/bind";
import styles from "./EmptyData.module.scss";
import { Send } from "@material-ui/icons";
import { Empty } from "antd";
const cx = classNames.bind(styles);

const EmptyData = ({desc = "No data"}) => {
  return (
    <div className={cx("empty-container")}>
      <Empty description={desc} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    </div>
  );
};

export default EmptyData;
