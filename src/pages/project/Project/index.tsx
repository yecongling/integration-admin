import React, { useRef, useState } from "react";
import "./design.scss";
import { Card, Col, Empty, Flex, Input, InputRef, Row, Segmented, SegmentedProps, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ProjectModel } from "@/services/project/design/projectModel";

/**
 *
 * @returns 项目设计
 */
const Design: React.FC = () => {

  // 项目信息
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  // 分段器选中的值
  const [projectType, setProjectType] = useState<string>("all");
  // 检索框
  const inputRef = useRef<InputRef>(null);
  // 分段器上的选项
  const items: SegmentedProps['options'] = [
    {
      label: '全部',
      value: 'all'
    },
    {
      label: '接口项目',
      value: 'interface'
    },
    {
      label: '集成项目',
      value: 'integration'
    },
    {
      label: '三方项目',
      value: 'other'
    }
  ];

  /**
   * 分段器切换
   * @param value 
   */
  const onSegmentedChange = (value: string | number) => {
    // 设置选中的类型
    setProjectType(value.toString());
    // 重新检索数据

  }

  /**
   * 检索项目数据
   */
  const queryProjects = (params: Record<string, any>) => {

  }

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }} styles={{ body: { height: '100%' } }}>
      <h3 style={{ margin: '0' }}>项目列表</h3>
      <Row style={{ marginTop: '8px' }}>
        <Col span={20}>
          <Segmented options={items} value={projectType} onChange={onSegmentedChange} />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Input autoFocus placeholder="搜索" variant="filled" suffix={<SearchOutlined />} ref={inputRef} />
        </Col>
      </Row>
      <Row style={{ flex: 1, marginTop: '16px', justifyContent: print.length === 0 ? 'center' : '' }} gutter={16}>
        <Flex wrap gap={16} style={{ alignContent: 'flex-start' }}>
          {
            projects.length > 0 ?
              projects.map((project: ProjectModel) => (
                <Card key={project.id} title={project.projectName} size="small" extra={<Switch checked={project.status === '1'} />} style={{ width: 300, height: 180, cursor: 'pointer' }}>
                  <p>这里面是项目内容</p>
                </Card>
              )) :
              <Empty description="暂无项目数据" />
          }
        </Flex>
      </Row>
    </Card>
  );
};
export default Design;
