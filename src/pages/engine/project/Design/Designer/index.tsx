import React, {useEffect, useState} from "react";
import {Button, Col, Input, List, notification, Row, Space, Tabs, TabsProps, Tag} from "antd";
import './index.less';
import {useLocation, useNavigate} from "react-router-dom";
import {
  CompressOutlined,
  DeleteOutlined,
  ExportOutlined,
  FlagOutlined,
  FullscreenOutlined,
  ImportOutlined,
  MenuOutlined,
  PlusOutlined,
  RedoOutlined,
  RollbackOutlined,
  SaveOutlined,
  SettingOutlined,
  TableOutlined,
  UndoOutlined
} from "@ant-design/icons";
import Setting from "@/pages/engine/project/Design/Designer/Setting";
import Endpoint from "@/pages/engine/project/Design/Designer/components/server/Endpoint";

const Designer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifyPanel, contextHolder] = notification.useNotification();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEndpointModal, setOpenEndpointModal] = useState(false);
  const items: TabsProps['items'] = [
    {
      key: "service",
      label: "服务",
      children: <>
        <List
          header={<div>web服务<Button size="small" icon={<PlusOutlined/>} onClick={() => {
            setOpenEndpointModal(true)
          }}/></div>}
          footer={null}
          dataSource={['web服务']}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </>,
    },
    {
      key: "route",
      label: "路由",
      children: <>路由</>
    },
    {
      key: "trigger",
      label: "触发器",
      children: <>触发器</>
    },
    {
      key: "timer",
      label: "定时器",
      children: <>定时器</>
    }
  ]

  /**
   * 点击面板
   */
  const clickPanel = () => {
    notifyPanel.success({
      message: "运行成功",
      description: <>这是一个运行成功的面板</>
    })
  }

  /**
   * 关闭弹窗
   */
  const cancelEndpointModal = () => {
    setOpenEndpointModal(false);
  }

  /**
   * 绘制标尺
   */
  const drawRuler = () => {
    console.log("绘制标尺");
  }

  useEffect(() => {
    drawRuler();
  }, []);

  return (
    <>
      {contextHolder}
      <Endpoint open={openEndpointModal} onCancel={cancelEndpointModal}/>
      <Row style={{height: '100%'}} gutter={6}>
        <Col span={4}>
          <section style={{height: '100%', padding: '10px'}}>
            <Input.Search autoFocus placeholder="通过名称检索" enterButton onSearch={() => alert("检索")}/>
            <Tabs tabBarStyle={{marginTop: '6px'}} items={items}/>
          </section>
        </Col>
        <Col span={20} style={{borderLeft: '1px solid #f5f5f5'}}>
          <Row className="designer-toolbar">
            <section style={{
              height: '50px',
              width: '100%',
              paddingRight: '20px',
              display: 'flex',
              alignItems: 'center',
              padding: '10px'
            }}>
              <Col span={10}>
                <Space.Compact>
                  <Button type="default" icon={<UndoOutlined/>} disabled>撤销</Button>
                  <Button type="default" icon={<RedoOutlined/>} disabled>恢复</Button>
                  <Button type="default" icon={<DeleteOutlined/>}>清空</Button>
                  <Button type="default" icon={<FlagOutlined/>}>标尺</Button>
                  <Button type="default" icon={<TableOutlined/>}>网格</Button>
                </Space.Compact>
              </Col>
              <Col span={4} style={{textAlign: 'center'}}>
                <Tag color="magenta" style={{
                  fontSize: '14px',
                  padding: '5px 7px'
                }}>{location.state.projectName} - {location.state.projectType === 1 ?
                  <CompressOutlined style={{fontSize: '16px'}}/> :
                  <FullscreenOutlined style={{fontSize: '16px'}}/>}</Tag>
              </Col>
              <Col span={10} style={{textAlign: 'right'}}>
                <Space>
                  <Button type="primary" title="界面设计" icon={<SettingOutlined/>}
                          onClick={() => setOpenEditModal(true)}/>
                  <Button type="primary" title="保存" icon={<SaveOutlined/>} onClick={() => alert("保存")}>保存</Button>
                  <Button type="primary" title="导入流程" icon={<ImportOutlined/>}
                          onClick={() => alert("导入")}>导入</Button>
                  <Button type="primary" title="导出流程" icon={<ExportOutlined/>}
                          onClick={() => alert("导出")}>导出</Button>
                  <Button type="primary" icon={<RollbackOutlined/>} onClick={() => {
                    navigate('/project/design')
                  }}>返回</Button>
                  <Button type="default" icon={<MenuOutlined/>} title="面板" onClick={clickPanel}/>
                </Space>
              </Col>
            </section>
          </Row>
          <Row className="designer-content" style={{height: 'calc(100% - 52px)', borderTop: '1px solid #f5f5f5'}}>
            <Col span={24} className="designer-area" style={{height: '100%'}}>
              <section style={{height: '100%', position: 'relative'}}>
                <div className="landscape-canvas-ruler" style={{width: 'calc(100% - 20px)', height: '20px'}}>
                  <canvas id="landscape-canvas"></canvas>
                </div>
                <div className="vertical-canvas-ruler" style={{width: '20px', height: 'calc(100% - 40px)'}}>
                  <canvas id="vertical-canvas"></canvas>
                </div>
                <div className="editor-content">编辑器内容区</div>
              </section>
            </Col>
          </Row>
        </Col>
      </Row>
      <Setting open={openEditModal} onOk={() => setOpenEditModal(false)} onCancel={() => setOpenEditModal(false)}/>
    </>
  );
}
export default Designer;