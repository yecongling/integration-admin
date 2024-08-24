import { ProCard } from "@ant-design/pro-components";
import { Col, Row, Switch } from "antd";
import React from "react";
import "./design.scss";

/**
 *
 * @returns 项目设计
 */
const Design: React.FC = () => {
  return (
    <>
      <Row gutter={[8, 16]}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Col
            xxl={4}
            xl={4}
            md={6}
            lg={8}
            sm={8}
            xs={24}
            key={index}
            className="project-card"
          >
            <ProCard
              style={{ height: 350 }}
              boxShadow
              title="项目维护模块"
              extra={<Switch defaultChecked={index % 2 === 0} />}
            >
              项目设计(计划做成卡片形式)
            </ProCard>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Design;
