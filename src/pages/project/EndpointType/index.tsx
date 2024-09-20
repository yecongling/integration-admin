import React, { useReducer } from "react";
import {
  defaultState,
  EndpointTypeContext,
  reducer,
} from "./EndpointTypeState";
import { Card, Col, Row } from "antd";
import EndpointTypeTree from "./EndpointTypeTree";
import EndpointTypeProperties from "./EndpointTypeProperties";
import EndpointTypeEditTable from "./EndpointTypeEditTable";
import EndpointTypeOperation from "./EndpointTypeOperation";

/**
 * 端点类型配置，配置出来的东西用于端点维护界面新增端点的时候的端点配置项
 * 添加注释
 */
const EndpointType: React.FC = () => {
  // 共享状态
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <EndpointTypeContext.Provider value={{ state, dispatch }}>
      <Row gutter={8} style={{ height: "100%" }}>
        <Col span={6} xl={10} xxl={6}>
          {/* 左边分类表格 */}
          <EndpointTypeTree />
        </Col>
        {/* 右边配置项 */}
        <Col span={18} xl={14} xxl={18} style={{ display: "flex", flexDirection: "column" }}>
          <Card
            style={{ marginBottom: "6px" }}
            styles={{
              body: {
                height: "100%",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {/* 基础信息 */}
            <EndpointTypeProperties />
          </Card>
          <Card style={{flex: '1'}}>
            {/* 操作项 */}
            <EndpointTypeOperation />
            {/* 规则集 */}
            <EndpointTypeEditTable />
          </Card>
        </Col>
      </Row>
    </EndpointTypeContext.Provider>
  );
};
export default EndpointType;
