import React from "react";
import {Modal, ModalProps} from "antd";

/**
 * 项目设置界面
 * @param {ModalProps} props
 * @constructor
 */
const Setting: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <>
      <Modal {...props} title="界面设置" width={650} styles={{body: {minHeight: '400px'}}}>
        这里面的设置是啥，待定
      </Modal>
    </>
  )
}
export default Setting;