import { message } from "antd";

export default message.useMessage;

export const messageCall = (messageApi, type="success", content="Successfully") => {
    messageApi.open({
        type: type,
        content: content,
        });
}
