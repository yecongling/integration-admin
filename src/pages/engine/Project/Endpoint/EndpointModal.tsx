import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Form, FormInstance, Input, InputRef, Modal, ModalProps, Select } from "antd";
import { RuleObject } from "antd/es/form";
import React, { useEffect, useRef, useState } from "react";
/**
 * 端点弹窗组件
 * @returns 端点弹窗
 */
const EndpointModal: React.FC<ModalProps & EndpointModalProps> = (
  props: ModalProps & EndpointModalProps
) => {
  const { endpointData, open, setOpen } = props;
  const [validateStatus, setStatus] = useState<
    "" | "success" | "error" | "warning" | "validating" | undefined
  >("success");
  const endpointRef = useRef<InputRef>(null);

    useEffect(() => {
        if (endpointRef?.current) {
            endpointRef.current.focus();
        }
    }, [open])

    /**
     * 查询支持的端点类型数据
     */
    const queryEndpointTypes = () => {

    }

  /**
   * 保存的值
   * @param value 数据
   */
  const onSave = (value: any) => {
    console.log(value);
    setOpen(false);
  };

  /**
   * 校验不能输入中文
   * @param rule 校验规则
   * @param value 值
   * @returns 结果
   */
  const noChineseCharacters = (rule: RuleObject, value: string) => {
    const chineseCharPattern = /[\u4e00-\u9fa5]/; // 匹配中文字符的正则表达式
    if (chineseCharPattern.test(value)) {
      return Promise.reject("输入内容不能包含中文字符");
    }
    setStatus("success");
    return Promise.resolve();
  };

  /**
   * 输入框失去焦点验证
   * @param field 验证字段
   */
  const handleBlur = async (field: string) => {
    try {
      await endpointData.validateFields([field]);
      // 验证通过
      setStatus("success")
    } catch (errorInfo) {
      // 这里可以处理校验错误的信息
      setStatus("error");
    }
  };

  return (
    <>
      <Modal
        centered
        maskClosable={false}
        title="编辑端点数据"
        okText="确认"
        okButtonProps={{ icon: <CheckCircleOutlined /> }}
        cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
        cancelText="取消"
        width={800}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          endpointData.validateFields().then((values) => {
            endpointData.resetFields();
            onSave(values);
          });
        }}
        styles={{ body: { padding: "10px 40px" } }}
      >
        <Form
          form={endpointData}
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{ span: 5 }}
        >
          <h3 style={{ borderBottom: "1px solid #ccc" }}>
            <SnippetsOutlined /> 基本信息
          </h3>
          <Form.Item
            name="name"
            label="名称"
            validateStatus={validateStatus}
            rules={[
              { required: true, message: "端点名称必填" },
              { validator: noChineseCharacters, message: "端点名称不能为中文" },
            ]}
          >
            <Input ref={endpointRef} autoFocus allowClear onBlur={() => handleBlur("name")} />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{required: true, message: '端点类型不能为空'}]}>
            <Select/>
          </Form.Item>
          <Form.Item name="mode" label="模式" rules={[{required: true, message: '端点模式不能为空'}]}>
            <Select/>
          </Form.Item>
          <Form.Item name="type" label="描述">
            <Input.TextArea allowClear showCount/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EndpointModal;

/**
 * 端点弹窗属性配置
 */
interface EndpointModalProps {
  endpointData: FormInstance;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
