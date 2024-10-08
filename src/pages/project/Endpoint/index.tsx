import React, { useEffect, useReducer } from "react";
import "./endpoint.scss";
import { Card, Col, Row, Form } from "antd";
import {
  getEndpoints,
} from "@/services/project/endpoint/endpointApi";
import { EndpointModel } from "@/services/project/endpoint/endpointModel";
import { addKeyToData } from "@/utils/utils";
import EndpointModal from "./EndpointModal";
import EndpointRecyle from "./EndpointRecycle";
import { defaultState, EndpointContext, reducer } from "./endpointState";
import EndpointTypeTree from "./EndpointTypeTree";
import EndpointSearch from "./EndpointSearch";
import EndpointTable from "./EndpointTable";
import EndpointAction from "./EndpointAction";
/**
 * 端点维护
 * @returns 端点
 */
const Endpoint: React.FC = () => {
  // 定义共享状态
  const [state, dispatch] = useReducer(reducer, defaultState);
  // 查询表单数据
  const [searchForm] = Form.useForm();
  // 选中的节点发生变化时重新查询右边的表格数据
  useEffect(() => {
    if (state.treeLoading && state.selectedKeys.length > 0) {
      queryEndpoints();
    }
  }, [state.selectedKeys]);

  /**
   * 查询端点信息
   * @param endpoint 端点查询条件
   * @returns 所有的端点
   */
  const queryEndpoints = async (endpoint?: EndpointModel) => {
    // 构建查询条件
    endpoint = {
      ...endpoint,
      ...searchForm.getFieldsValue(),
      type: state.selectedKeys[0],
    };
    const endpoints = await getEndpoints(endpoint);
    // 数据添加key
    const transformData = addKeyToData(endpoints, "id");
    dispatch({
      type: "SET_ENDPOINTS",
      payload: transformData,
    });
  };

  return (
    <EndpointContext.Provider value={{ state, dispatch }}>
      <Row gutter={8} style={{ height: "100%" }}>
        <Col span={5} xl={10} xxl={5}>
          <EndpointTypeTree />
        </Col>
        <Col
          span={19}
          xl={14}
          xxl={19}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {/* 检索条件 */}
          <EndpointSearch form={searchForm} queryEndpoints={queryEndpoints} />
          <section style={{ flex: "1" }}>
            <Card
              style={{ height: "100%" }}
              styles={{
                body: {
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              {/* 操作 */}
              <EndpointAction />
              {/* 表格 */}
              <EndpointTable />
            </Card>
          </section>
        </Col>
      </Row>
      {/* 编辑窗口弹窗 */}
      <EndpointModal
        title={
          (state.editType === 1
            ? "新增"
            : state.editType === 2
            ? "编辑"
            : "查看") + "端点"
        }
        editType={state.editType}
        open={state.openModal}
        onCancel={() => {
          dispatch({
            type: "SET_OPEN_MODAL",
            payload: false,
          });
        }}
        onOk={() => {
          dispatch({
            type: "SET_OPEN_MODAL",
            payload: false,
          });
          queryEndpoints();
        }}
      />
      {/* 回收站弹窗 */}
      <EndpointRecyle
        title="回收站"
        open={state.openRecycle}
        onCancel={() => {
          dispatch({
            type: "SET_OPEN_RECYCLE",
            payload: false,
          });
        }}
        okText="关闭"
        onOk={() => {
          dispatch({
            type: "SET_OPEN_RECYCLE",
            payload: false,
          });
          queryEndpoints();
        }}
      />
    </EndpointContext.Provider>
  );
};
export default Endpoint;
