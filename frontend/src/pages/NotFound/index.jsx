import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found"
  }, [])

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
