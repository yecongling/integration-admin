import React, {useRef, useState} from "react";
import type {TabsProps} from 'antd';
import {Button, Col, Input, InputRef, Row, Tabs} from "antd";
import "./designer.less";
import Designer from "@/components/emr/editor/Designer";
import {FormOutlined} from "@ant-design/icons";
import MetaData from "@/components/emr/dataset/MetaData";
import EmrDefTree from "@/components/emr/tree/EmrDefTree";
import MetaDataTree from "@/components/emr/tree/MetaDataTree";

const DesignCenter: React.FC = () => {
  const searchMetaRef = useRef<InputRef>(null);
  const [openMetaData, setOpenMetaData] = useState(false);
  /**
   * tab点击的时候
   * @param activeKey
   */
  const onTabChange = (activeKey: string) => {
    if (activeKey === "meta" && searchMetaRef != null && searchMetaRef.current != null) {
      searchMetaRef.current.focus();
    }
  }

  /**
   * 编辑数据元
   */
  const editMetaData = () => {
    setOpenMetaData(true);
  }

  /**
   * 关闭弹窗
   */
  const onCancel = () => {
    setOpenMetaData(false);
  }

  /**
   * 检索数据元
   * @param value
   */
  const onSearchData = (value: string) => {
    console.log(value)
  }

  const metaDataItems: TabsProps["items"] = [
    {
      key: "props",
      label: "属性",
      children: <>属性</>
    },
    {
      key: "meta",
      label: "数据元",
      children: <>
        <Input.Search ref={searchMetaRef} placeholder="输入编码、名称检索" enterButton onSearch={onSearchData}
                      style={{width: 'calc(100% - 40px)', marginRight: '6px'}}/>
        <Button type="primary" icon={<FormOutlined/>} onClick={editMetaData} title="编辑数据元"/>
        <MetaDataTree/>
      </>
    },
    {
      key: "event",
      label: "事件",
      children: <>事件</>
    },
    {
      key: "dictionary",
      label: "字典",
      children: <>字典数据</>
    }
  ]
  return (
    <>
      {/* 划分几个区域 */}
      {/*大区域（包含编辑器的编辑区域）*/}
      <Row className="editor-panel" style={{width: '100%', height: 'calc(100%)'}} gutter={6}>
        {/* 左边的栏分类带检索 */}
        <Col span={4} className="editor-category" style={{height: '100%'}}>
          <section style={{padding: '10px', height: '100%'}}>
            <EmrDefTree/>
          </section>
        </Col>
        {/* 中间编辑区 */}
        <Designer span={16}/>
        {/* 最右边的数据元区域 */}
        <Col span={4} className="editor-data" style={{height: '100%'}}>
          <section style={{padding: '10px', height: '100%'}}>
            <Row style={{height: '100%'}}>
              <Col span={24}>
                <Tabs
                  tabPosition="bottom"
                  items={metaDataItems}
                  type="card"
                  defaultActiveKey="meta"
                  tabBarGutter={-1}
                  className="tab-metadata"
                  onChange={onTabChange}
                />
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
      <MetaData width={800} open={openMetaData} onCancel={onCancel}/>
    </>
  )
}
export default DesignCenter;