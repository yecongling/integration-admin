import React from "react";
import {Col, Modal, Row} from "antd";
import {CompressOutlined, FullscreenOutlined} from "@ant-design/icons";
import {ProjectTypeProps} from "@/pages/engine/project/Design/components/ProjectState.ts";

/**
 * 项目类型
 *
 * @constructor
 */
const ProjectTypeModal: React.FC<ProjectTypeProps> = (props) => {
  const {projectType, setProjectType, changeModal, projectName} = props;
  /**
   * 窗口打开关闭
   * @param open
   */
  const handleAfterOpen = (open: boolean) => {
    if (open) {
      return;
    }
    if (projectName.current) {
      projectName.current.focus();
    }
  }

  return (
    <>
      <Modal open={projectType}
             centered
             maskClosable={false}
             title="选择项目类型"
             width={600}
             styles={{body: {padding: '10px'}}}
             footer={null}
             onCancel={() => setProjectType(false)}
             afterOpenChange={handleAfterOpen}

      >
        <Row align="middle">
          <Col span={12} style={{textAlign: 'center', padding: '16px 6px'}} className="projectType"
               onClick={() => changeModal("2")}>
            <CompressOutlined style={{fontSize: '64px', color: '#5b5858'}}/>
            <h3>集成项目</h3>
            <span style={{color: '#989292', fontSize: '12px'}}>系统间消息集成，保证传输</span>
            <ul className="description">
              <li>记录消息内容以及处理流程</li>
              <li>保证消息传输以及消息顺序</li>
              <li>支持消息重新处理</li>
              <li>终端和路由可单独开关</li>
              <li>终端可以在不同项目中复用</li>
            </ul>
          </Col>
          <Col span={12} style={{textAlign: 'center', padding: '16px 6px'}} className="projectType"
               onClick={() => changeModal("1")}>
            <FullscreenOutlined style={{fontSize: '64px', color: '#5b5858'}}/>
            <h3>接口项目</h3>
            <span style={{color: '#989292', fontSize: '12px'}}>高性能请求应答（request-response）模式</span>
            <ul className="description">
              <li>高性能路由处理</li>
              <li>消息内容以及处理流程记录可选择性开关</li>
              <li>同步消息处理、支持事务</li>
              <li>终端及路由以项目味单位统一开关</li>
              <li>终端不可和其他项目共享</li>
            </ul>
          </Col>
        </Row>

      </Modal>
    </>
  )
}
export default ProjectTypeModal;