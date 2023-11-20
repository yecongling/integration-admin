import React, {useRef} from "react";
import {Card, Col, Form, Input, InputRef, Modal, ModalProps, Row, Select} from "antd";
import MetaDataTree from "@/components/emr/tree/MetaDataTree.tsx";

/**
 * 数据元
 */
const MetaData: React.FC<ModalProps> = (props) => {
  const {open} = props;
  const searchRef = useRef<InputRef>(null)
  const [menuData] = Form.useForm();
  return (
    <>
      <Modal {...props} afterOpenChange={() => {
        if (open && searchRef && searchRef.current) {
          searchRef.current.focus();
        }
      }}>
        <Row style={{height: "100%"}}>
          <Col span={8}>
            <Card style={{height: "100%"}} bodyStyle={{height: "100%", padding: "10px"}}>
              <Input.Search ref={searchRef} autoFocus placeholder="通过名称检索" enterButton/>
              <MetaDataTree/>
            </Card>
          </Col>
          <Col span={16}>
            <Card style={{marginLeft: "6px", height: "100%"}} bodyStyle={{height: "100%", padding: "10px"}}>
              <Form
                form={menuData}
                layout="horizontal"
                name="basic"
                size="middle"
                labelCol={{span: 5}}
                initialValues={{
                  type: 1
                }}
              >
                <Form.Item name="name" label="名称" rules={[{required: true, message: '请输入数据元名称！'}]}>
                  <Input placeholder="名称"/>
                </Form.Item>
                <Form.Item name="description" label="说明" rules={[{required: true, message: '请输入数据元说明！'}]}>
                  <Input placeholder="说明"/>
                </Form.Item>
                <Form.Item name="metaCode" label="数据元编码"
                           rules={[{required: true, message: '请输入数据元编码！'}]}>
                  <Input placeholder="数据元编码"/>
                </Form.Item>
                <Form.Item name="type" label="录入方式">
                  <Select
                    options={[
                      {
                        label: "输入框", value: 1
                      }
                    ]}
                  >
                  </Select>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

MetaData.defaultProps = {
  title: "数据元维护",
  styles: {
    body: {
      height: '500px'
    }
  },
  maskClosable: false
}
export default MetaData;