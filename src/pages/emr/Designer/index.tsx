import React from "react";
import {Button, Card, Col, Row, Select} from "antd";
import Search from "antd/lib/input/Search";
import ITree from "@/component/emr/ITree";
import {SaveOutlined} from "@ant-design/icons";

const Designer: React.FC = () => {

  const onSearchEmr = (value: string) => {
    console.log(value);
  }

  /**
   * 检索数据元
   * @param value
   */
  const onSearchData = (value: string) => {
    console.log(value)
  }

  return (
    <>
      {/* 划分几个区域 */}
      {/*大区域（包含编辑器的编辑区域）*/}
      <Row className="editor-panel" style={{width: '100%', height: 'calc(100%)'}} gutter={6}>
        {/* 左边的栏分类带检索 */}
        <Col span={3} className="editor-category" style={{height: '100%'}}>
          <Card style={{height: '100%'}} bodyStyle={{padding: '10px', height: '100%'}}>
            <Search autoFocus placeholder="通过名称检索" enterButton onSearch={onSearchEmr}/>
            <ITree></ITree>
          </Card>
        </Col>
        {/* 中间编辑区 */}
        <Col span={18} className="editor-container" style={{height: '100%'}}>
          <Card style={{height: '100%'}} bodyStyle={{padding: '0', height: '100%'}}>
            {/* 分三部分  上面的文本的操作，中间（左边的文件操作和插件，和编辑区） 下面的foot */}
            <Row className="editor-toolbar" style={{height: '40px', borderBottom: '1px solid #ccc'}}>
              <Col span={24} style={{padding: '3px'}}>
                <Select style={{width: 120}}
                        defaultValue="1"
                        options={[
                          {value: '1', label: '正文'},
                          {value: '2', label: '标题'},
                          {value: '3', label: '副标题'},
                          {value: '4', label: '一级标题'},
                          {value: '5', label: '二级标题'},
                        ]}/>
                <Select style={{width: 120}}
                        defaultValue="1"
                        options={[
                          {value: '1', label: '微软雅黑'},
                          {value: '2', label: '宋体'},
                          {value: '3', label: 'ABC'},
                          {value: '4', label: '手写体'},
                          {value: '5', label: '你管的多'},
                        ]}/>
                <Select style={{width: 80}}
                        defaultValue="5"
                        options={[
                          {value: '1', label: '8'},
                          {value: '2', label: '10'},
                          {value: '3', label: '12'},
                          {value: '4', label: '14'},
                          {value: '5', label: '16'},
                        ]}/>
              </Col>
            </Row>
            <Row className="editor-container" style={{height: 'calc(100% - 80px)'}}>
              <Col span={24} style={{height: '100%'}}>
                <Row className="editor-content" style={{height: '100%'}}>
                  <Col style={{height: '100%', width: '52px', textAlign: 'center', paddingTop: '10px'}}
                       className="editor-left-tool">
                    <Button style={{padding: '4px 6px'}} onClick={() => alert("保存")}>
                      <SaveOutlined style={{fontSize: '20px', color: '#938e8e'}}/>
                    </Button>
                  </Col>
                  <Col style={{
                    backgroundColor: 'rgb(227 227 227 / 82%)',
                    height: '100%',
                    width: 'calc(100% - 52px)',
                    overflowY: 'auto'
                  }}
                       className="editor-right-content">
                    {/* 中间 */}
                    <div className="kix-page-paginated canvas-first-page" style={{
                      position: 'relative',
                      top: '5px',
                      left: '5px',
                      zIndex: 0,
                      width: '794px',
                      margin: '0 auto',
                      height: '1123px',
                      outline: '1px solid #c7c7c7'
                    }}>
                      <canvas className="kix-canvas-tile-content" width="794" height="1123"
                              style={{
                                zIndex: 0,
                                width: '794px',
                                height: '1123px',
                                backgroundColor: 'rgb(249, 251, 253)',
                                cursor: 'text'
                              }} dir="ltr"></canvas>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="editor-footer" style={{height: '40px'}}>
              <Col span={24} style={{height: '40px'}}>页数、字数、模式等展示</Col>
            </Row>
          </Card>
        </Col>
        {/* 最右边的数据元区域 */}
        <Col span={3} className="editor-data" style={{height: '100%'}}>
          <Card style={{height: '100%'}} bodyStyle={{padding: '10px', height: '100%'}}>
            <Search placeholder="输入名称检索" enterButton onSearch={onSearchData}></Search>
            <ITree/>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default Designer;