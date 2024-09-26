import React from "react";
import "./design.scss";
import { Card, Col, Flex, Input, Row, Segmented, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";

/**
 *
 * @returns 项目设计
 */
const Design: React.FC = () => {
  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }} styles={{ body: { height: '100%' } }}>
      <h3 style={{ margin: '0' }}>项目列表</h3>
      <Row style={{ marginTop: '8px' }}>
        <Col span={20}>
          <Segmented options={['全部', '接口项目', '集成项目', '三方项目']} />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Input autoFocus placeholder="搜索" variant="filled" suffix={<SearchOutlined />} />
        </Col>
      </Row>
      <Row style={{ flex: 1, marginTop: '16px' }} gutter={16}>
        <Flex wrap gap={16} style={{alignContent: 'flex-start'}}>
          <Card title="Default size card" size="small" extra={<Switch defaultChecked/>} style={{ width: 300, height: 180, cursor: 'pointer' }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Default size card" size="small" extra={<a href="#">More</a>} style={{ width: 300, height: 180 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Default size card" size="small" extra={<a href="#">More</a>} style={{ width: 300, height: 180 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Default size card" size="small" extra={<a href="#">More</a>} style={{ width: 300, height: 180 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Default size card" size="small" extra={<a href="#">More</a>} style={{ width: 300, height: 180 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Default size card" size="small" extra={<a href="#">More</a>} style={{ width: 300, height: 180 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Flex>
      </Row>
    </Card>
  );
};
export default Design;
