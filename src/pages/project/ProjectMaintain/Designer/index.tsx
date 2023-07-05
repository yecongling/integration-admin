import React from "react";
import {Button, Card, Col, Row} from "antd";
import {useNavigate} from "@@/exports";
import './index.less';
import {useLocation} from "umi";

const Designer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // state传参
  console.log(location.state);
  return (
    <Card className="designer" bodyStyle={{height: '100%', padding: '6px'}}>
      <Row style={{height: '100%'}}>
        <Col span={4} className="designer-left">
          左边模块
        </Col>
        <Col span={20} className="designer-right">
          <Row className="designer-content">
            <Col span={24} className="title">
              {location.state.projectName}<Button type="primary" onClick={() => {
              navigate('/project/projectMaintain')
            }}>返回项目维护</Button>
            </Col>
            <Col span={24} className="designer-area">
              设计区
            </Col>
          </Row>

        </Col>
      </Row>
    </Card>
  )
}
export default Designer;