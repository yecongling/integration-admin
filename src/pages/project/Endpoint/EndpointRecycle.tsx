import { Modal, ModalProps } from "antd";
import React from "react";

/**
 * 端点回收站
 * @returns 端点弹窗页面
 */
const EndpointRecycle: React.FC<ModalProps> = (props) => {
  return (
    <Modal {...props}>
        <div>
          回收站
        </div>
    </Modal>
  );
};
export default EndpointRecycle;
