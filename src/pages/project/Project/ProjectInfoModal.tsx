import React, { useEffect, useRef } from "react";
import { Form, Input, InputRef, message, Modal, Select } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ProjectInfoProps } from "./projectState";
import { addProject, updateProject } from "@/services/project/design/designApi";

/**
 * 项目信息维护界面
 * @param props
 * @returns
 */
const ProjectInfoModal: React.FC<ProjectInfoProps> = (props) => {
  const inputRef = useRef<InputRef>(null);
  const navigate = useNavigate();
  const {
    open,
    setOpen,
    isEdit,
    projectId,
    projectType
  } = props;
  const [messageApi, contextHolder] = message.useMessage();

  // 表单数据
  const [projectData] = Form.useForm();
  // 输入框
  // 查询项目信息
  useEffect(() => {
    console.log("弹窗渲染一次")
    if (projectId) {
      // 查询项目信息

    }
  }, [projectId]);
  /**
   * 关闭弹窗
   */
  const onCancel = () => {
    setOpen(false);
  };

  /**
   * 保存数据
   */
  const handleOk = async (values: any) => {
    // 先完成数据存储操作
    if (!isEdit) {
      const result = await addProject(values);
      if (result.code === 200) {
        setOpen(false);
        messageApi.success("新增成功");
        // 如果是新增，则新增完成就跳转到设计界面
        navigate("/project/designer", { state: values });
      } else {
        messageApi.error(result.message);
      }
    } else {
      const result = await updateProject(values);
      if (result.code === 200) {
        messageApi.success(result.message);
        setOpen(false);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        centered
        maskClosable={false}
        title={
          <span className="title">
            编辑项目
          </span>

        }
        okText="确认"
        okButtonProps={{ icon: <CheckCircleOutlined /> }}
        cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
        cancelText="取消"
        styles={{ body: { padding: "10px 40px" } }}
        style={{ top: "20px" }}
        width={800}
        onOk={() => {
          projectData.validateFields().then((values) => {
            projectData.resetFields();
            handleOk(values);
          });
        }}
        onCancel={onCancel}
        afterOpenChange={(open: boolean) => {
          if (open && inputRef.current) {
            inputRef.current?.focus()
          }
        }}
      >
        <Form
          form={projectData}
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{ span: 4 }}
          initialValues={{
            projectPriority: "0",
            log: "1",
          }}
        >
          <Form.Item name="id" label="项目id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="projectType" label="项目类型" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="projectName"
            label="项目名称"
            rules={[{ required: true, message: "请输入项目名称" }]}
          >
            <Input ref={inputRef} placeholder="项目名称" autoFocus />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={4} placeholder="描述" />
          </Form.Item>
          {projectType === "integration" ? (
            <Form.Item name="log" label="消息日志记录">
              <Select
                options={[
                  { value: "1", label: "打开" },
                  { value: "2", label: "关闭" },
                  { value: "3", label: "仅在发生错误是记录" },
                ]}
              />
            </Form.Item>
          ) : (
            ""
          )}
          <Form.Item
            name="projectPriority"
            label="优先级"
            rules={[{ required: true, message: "请选择项目优先级" }]}
          >
            <Select
              placeholder="项目名称"
              options={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ProjectInfoModal;
