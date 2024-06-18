import {Card, Col, Row, Input, Table} from "antd";
import React from "react";
import {ColumnsType} from "antd/es/table";
import {EndpointTypeModel} from "./endpointType";

const {Search} = Input;
import "./index.less";


const EndpointType: React.FC = () => {
  /**
   * 类型表格列
   */
  const typeTableColumn: ColumnsType<EndpointTypeModel> = [
    {
      title: "id",
      dataIndex: "id",
      hidden: true,
    },
    {
      title: "名称",
      dataIndex: "name",
      width: "20%",
      align: "left",
    },
  ];

  /**
   * 检索功能
   * @param params 检索参数
   */
  const onSearch = (params: any) => {
    console.log(params);
  };
  return (
      <Row gutter={8} style={{height: "100%"}}>
        {/* 左边表格布局 */}
        <Col span={6}>
          <Card style={{height: "100%"}} styles={{body: {height: "100%", padding: '24px 24px 0 24px'}}}>
            <section style={{marginBottom: "16px"}}>
              <Search
                  autoFocus
                  placeholder="请输入端点类型名或支持模式进行检索"
                  onSearch={onSearch}
                  enterButton
              />
            </section>
            <section style={{height: "calc(100% - 48px)", display: "flex", flexDirection: "column"}}>
              <Table
                  bordered
                  className="endpointTypeTable"
                  scroll={{x: "100", y: "calc(100vh - 240px)"}}
                  style={{marginTop: "6px", height: '100%'}}
                  size="middle"
                  pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    defaultPageSize: 25,
                    total: 1,
                    showTotal: (total) => `共 ${total} 条`,
                  }}
                  columns={typeTableColumn}
              />
            </section>
          </Card>
        </Col>
        {/* 右边表单布局 */}
        <Col span={18}>
          <Card style={{height: "150px"}} styles={{body: {height: "100%"}}}>
            基础配置，名称-类型
          </Card>
          <Card
              style={{height: "calc(100% - 156px)", marginTop: "6px"}}
              styles={{body: {height: "100%"}}}
          >
            编辑表格部分（配置项）
          </Card>
        </Col>
      </Row>
  );
};
export default EndpointType;
