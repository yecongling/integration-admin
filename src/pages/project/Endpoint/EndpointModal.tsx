import { Button, Modal, ModalProps } from "antd";
import React from "react";

/**
 * 编辑端点的弹窗
 * @returns 组件内容
 */
const EndpointModal: React.FC<EndpointModalProps> = (props) => {
  const { onOk, editType, onCancel, ...restProps } = props;

  /**
   * 打开和关闭modal动画的回调
   * @param open 窗口打开关闭状态
   */
  const afterOpenChange = (open: boolean) => {
    if (open) {
      // 如果查看状态，禁用所有可编辑选项
      if (editType === 3) {
        console.log("查看状态");
      }
    }
  };
  /**
   * 弹窗点击确定的时候这个页面保存数据
   */
  const onSubmit = (e: any) => {
    console.log("先保存数据");
    // 保存成功调用传过来的onOk方法
    onOk?.(e);
  };

  return (
    <Modal
      {...restProps}
      afterOpenChange={afterOpenChange}
      footer={
        editType === 3 ? (
          <Button type="primary" onClick={onCancel}>
            关闭
          </Button>
        ) : (
          <>
            <Button type="default" onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" onClick={(e) => onSubmit(e)}>
              确定
            </Button>
          </>
        )
      }
    >
      这是弹窗内容
    </Modal>
  );
};
export default EndpointModal;

/**
 * 参数
 */
export interface EndpointModalProps extends ModalProps {
  // 编辑类型
  editType: number;
}
