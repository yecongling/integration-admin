import React from "react";
import { useEndpointContext } from "./endpointState";
import { Button, Col, Row, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  RestOutlined,
} from "@ant-design/icons";

/**
 * 端点页面的操作部分
 */
const EndpointAction: React.FC = () => {
  // 获取全局的状态
  const { state, dispatch } = useEndpointContext();
  return (
    <>
      <section style={{ marginBottom: "16px" }}>
        <Row>
          <Col span={22}>
            <Space wrap>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  dispatch({
                    type: "SET_OPEN_MODAL",
                    payload: true,
                  });
                  dispatch({
                    type: "SET_EDIT_TYPE",
                    payload: 1,
                  });
                }}
              >
                新增
              </Button>
              <Button
                type="default"
                onClick={() => {
                  alert("批量操作");
                }}
                icon={
                  <DeleteOutlined
                    style={{
                      color: state.selectRow.length === 0 ? "#ccc" : "red",
                    }}
                  />
                }
                disabled={state.selectRow.length === 0}
              >
                批量操作
              </Button>
              <Button
                type="default"
                onClick={() => alert("导入")}
                icon={<ImportOutlined style={{ color: "orange" }} />}
              >
                导入
              </Button>
              <Button
                type="default"
                onClick={() => alert("导出")}
                icon={
                  <ExportOutlined
                    style={{
                      color: state.selectRow.length === 0 ? "#ccc" : "red",
                    }}
                  />
                }
                disabled={state.selectRow.length === 0}
              >
                导出
              </Button>
            </Space>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Tooltip title="回收站">
              <Button
                type="primary"
                icon={<RestOutlined />}
                onClick={() => {
                  dispatch({
                    type: "SET_OPEN_RECYCLE",
                    payload: true,
                  });
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </section>
    </>
  );
};
export default EndpointAction;
