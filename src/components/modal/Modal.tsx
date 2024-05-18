import { ModalProps } from "./ModalProps";
import React from "react";

/**
 * 封装弹窗组件
 */
const Modal: React.FC = (props: ModalProps) => {
    const {title} = props;

  return (
    <>
      <div>{title}</div>
    </>
  );
};
export default Modal;
