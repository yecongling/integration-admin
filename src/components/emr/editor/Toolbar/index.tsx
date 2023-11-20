import React from "react";
import {Col, Row, Tabs, TabsProps} from "antd";
import "./toolbar.less";

const Toolbar: React.FC = () => {

  /* 页签 */
  const tabs: TabsProps["items"] = [
    {
      key: "file",
      label: "文件",
      children: "新建、打开、保存、另存为、关闭、打印、导出、导入、另存为、下载（word、PDF、网页）、移到回收站、语言"
    },
    {
      key: "edit",
      label: "编辑",
      children: "文本操作区域，如字体、字号、段落排版、撤销、重做、复制、粘贴、粘贴（不带格式）、全选、查找替换"
    },
    {
      key: "insert",
      label: "插入",
      children: "控件插入，如表格、图片、公式、符号、日期、时间、签名、形状、二维码、条形码、特殊字符、等式、下拉菜单"
    },
    {
      key: "design",
      label: "设计",
      children: "水印、页面颜色、页面边框"
    },
    {
      key: "layout",
      label: "布局",
      children: "文字方向、页边距、纸张方向、纸张大小"
    },
    {
      key: "view",
      label: "视图",
      children: "阅读视图、web视图、标尺、网格线"
    }
  ]
  return (
    <>
      <Row className="editor-toolbar" style={{borderBottom: '1px solid #ccc'}}>
        <Col span={24} style={{padding: '3px'}}>
          <Tabs type="card" size="small" tabBarStyle={{marginBottom: 0}} items={tabs} tabBarGutter={-1}
                className="tab-operator"/>
        </Col>
      </Row>
    </>
  )
}
export default Toolbar;