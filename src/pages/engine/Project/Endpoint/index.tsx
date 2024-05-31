import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputRef,
  Row,
} from "antd";
import React, { useRef } from "react";
const Endpoint: React.FC = ()=> {
  const [searchForm] = Form.useForm();
  const endpointName = useRef<InputRef>(null);


  /**
   * 检索
   * @param values 检索条件
   */
  const finishSearch = (values: any) => {
    console.log(values);
  }

  return (
    <>
      {/* 查询区域 */}
      <Card styles={{body: {height: '100%'}}} style={{marginBottom: '16px'}}>
        <Form form={searchForm} onFinish={finishSearch} initialValues={{projectType: '-1'}}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="端点名称" name="name" style={{marginBottom: 0}}>
                <Input ref={endpointName} autoFocus allowClear autoComplete="false"/>
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Button type="primary" htmlType="submit"><SearchOutlined/>查询</Button>
              <Button htmlType="reset" style={{margin: '0 8px'}}><SyncOutlined/>重置</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
export default Endpoint;