import { Modal } from "antd";
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {Form, Input, Space} from "antd";
import { useState } from "react";

export const ModalAddSize = (title = "", product, dispatch) => {

    const [size, setSize] = useState("");
    const [stock, setStock] = useState(0);


    Modal.confirm({
        icon: <PlusOutlined />,
        title: `Add new size`,
        content: (() => {
            const onFinish = (changeValues, values) => {
    
                console.log('Received values of form:', values);
              };
            return (
                <Input onChange={(e) => setSize(e.target.value)} value={size}/>
            )
        })(),
        onOk() {
            console.log(size);
        },
        onCancel() {},
      });
}