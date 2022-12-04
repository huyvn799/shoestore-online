import { Modal } from "antd";
import {InfoCircleOutlined} from '@ant-design/icons';

export const modalInfo = (title = "add to cart", navigate) => {
    Modal.confirm({
        icon: <InfoCircleOutlined />,
        title: `You must login to ${title}`,
        // content: (
        //   <div>
        //     <p>some messages...some messages...</p>
        //     <p>some messages...some messages...</p>
        //   </div>
        // ),
        onOk() {
            navigate("/login");
        },
        onCancel() {},
      });
}