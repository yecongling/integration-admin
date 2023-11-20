import React from "react";
import {Button, Col, Row} from "antd";
import Page from "@/components/emr/editor/Footer/Page";
import WordCount from "@/components/emr/editor/Footer/WordCount.tsx";
import PageSize from "@/components/emr/editor/Footer/PageSize.tsx";

const Footer: React.FC = () => {
  return (
    <>
      <Row className="editor-footer" style={{height: '30px'}}>
        <Col span={4} style={{height: '30px', display: 'flex', alignItems: 'center'}}>
          <Page/>
          <WordCount selected={2} total={10}/>
        </Col>
        <Col span={4} offset={6} style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
          <Button type="text" size="small" onClick={() => alert("切换模式")}>编辑模式</Button>
        </Col>
        <Col span={4} offset={6} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <PageSize size={100}/>
        </Col>
      </Row>
    </>
  )
}
export default Footer;