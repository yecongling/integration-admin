import {
  addPermission,
  getDirectoryMenu,
  updatePermission,
  validateFields,
} from "@/apis/system/permission/menu";
import {
  Directory,
  MenuModel,
  permissionResult,
} from "@/apis/system/permission/menuModel";
import IconPicker from "@/components/menu/icon/IconPicker";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Popover,
  Radio,
  RadioChangeEvent,
  Switch,
  TreeSelect,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
const MenuModal: React.FC<ModalProps & MenuModalProps> = (
  props: ModalProps & MenuModalProps
) => {
  const { open, menuData, afterOpenChange, setOpen } = props;
  const [showParent, setShow] = useState(true);
  // 目录数据
  const [treeData, setTreeData] = useState<Directory[]>([]);
  // 上级菜单
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (open) {
      getDirectory();
      // 判定显示隐藏
      if (menuData && menuData.getFieldValue("menuType") === 0) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  }, [menuData, open]);

  /**
   * 获取目录
   */
  const getDirectory = async () => {
    const result = await getDirectoryMenu({ roleId: "admin" });
    if (result) {
      const treeData: Directory[] = [...result];
      setTreeData(treeData);
    }
  };

  /**
   * 菜单类型变换
   * @param e
   */
  const changeMenuType = (e: RadioChangeEvent) => {
    if (e.target.value === 0) {
      setShow(false);
      return;
    }
    setShow(true);
  };

  /**
   * 字段校验
   *
   * @param values
   */
  const validate = async (values: MenuModel) => {
    try {
      const res = validateFields();
      if (res.success) {
        // 提交表单
        let result: permissionResult;
        if (values["id"]) {
          result = await updatePermission(values);
        } else {
          result = await addPermission(values);
        }
        if (result.code == 200) {
          message.success("保存成功");
          // 刷新
          setOpen(false);
        }
      } else {
        menuData.setFields([
          {
            name: res.fieldName,
            errors: [res.msg],
          },
        ]);
      }
    } catch (err) {
      return;
    }
  };

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Modal
        open={open}
        centered
        maskClosable={false}
        title="编辑菜单数据"
        okText="确认"
        okButtonProps={{ icon: <CheckCircleOutlined /> }}
        cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
        cancelText="取消"
        width={800}
        onOk={() => {
          menuData.validateFields().then((values) => {
            menuData.resetFields();
            validate(values);
          });
        }}
        onCancel={() => {
          setOpen(false);
        }}
        afterOpenChange={afterOpenChange}
        styles={{ body: { padding: "10px 40px" } }}
      >
        <Form
          form={menuData}
          layout="horizontal"
          name="basic"
          size="middle"
          labelCol={{ span: 5 }}
          initialValues={{
            menuType: 1,
            route: true,
            internalOrExternal: true,
            sortNo: 1,
          }}
        >
          <Form.Item name="id" label="菜单ID" hidden>
            <Input placeholder="菜单ID" />
          </Form.Item>
          <Form.Item name="menuType" label="菜单类型">
            <Radio.Group onChange={changeMenuType}>
              <Radio value={0}>一级菜单</Radio>
              <Radio value={1}>子菜单</Radio>
              <Radio value={2}>子路由</Radio>
              <Radio value={3} disabled>
                按钮
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="name"
            label="菜单名称"
            rules={[{ required: true, message: "请输入菜单名称！" }]}
          >
            <Input autoFocus allowClear placeholder="菜单名称" />
          </Form.Item>
          {showParent && (
            <Form.Item
              name="parentId"
              label="上级菜单"
              rules={[{ required: true, message: "请选择上级菜单！" }]}
            >
              <TreeSelect
                style={{ width: "100%" }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                treeData={treeData}
                placeholder="请选择"
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>
          )}
          <Form.Item
            name="url"
            label="菜单路径"
            rules={[{ required: true, message: "请输入菜单路径！" }]}
          >
            <Input allowClear placeholder="菜单路径" />
          </Form.Item>
          <Form.Item name="component" label="前端组件">
            <Input allowClear placeholder="请输入前端组件" />
          </Form.Item>
          <Form.Item name="icon" label="菜单图标">
            <Input
              allowClear
              addonAfter={
                <Popover
                  placement="bottomRight"
                  trigger="click"
                  arrow={false}
                  content={<IconPicker />}
                >
                  <SettingOutlined />
                </Popover>
              }
            />
          </Form.Item>
          <Form.Item name="sortNo" label="序号">
            <InputNumber />
          </Form.Item>
          <Form.Item name="route" valuePropName="checked" label="是否路由菜单">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
          <Form.Item name="hidden" valuePropName="checked" label="隐藏路由">
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
          <Form.Item
            name="internalOrExternal"
            valuePropName="checked"
            label="打开方式"
          >
            <Switch checkedChildren="内部" unCheckedChildren="外部" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MenuModal;

// 菜单弹窗属性
export interface MenuModalProps {
  menuData: FormInstance;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
