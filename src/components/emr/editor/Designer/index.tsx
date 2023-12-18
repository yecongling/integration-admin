import React from "react";
import {Col} from "antd";
import Toolbar from "@/components/emr/editor/Toolbar";
import Editor from "@/components/emr/editor/Editor";
import Footer from "@/components/emr/editor/Footer";

/**
 * 病历设计器
 * @constructor
 */
const Designer: React.FC<DesignerProps> = (props) => {
  const {span} = props;
  return (
    <>
      <Col span={span} className="editor-container" style={{height: '100%'}}>
        <section
          style={{height: '100%', padding: '0', border: '1px solid #f5f5f5', borderTop: 'none', borderBottom: 'none'}}>
          {/* 分三部分  上面的文本的操作，中间（左边的文件操作和插件，和编辑区） 下面的foot */}
          <Toolbar/>
          {/* 中间 */}
          <Editor width={794} height={1123}/>
          <Footer/>
        </section>
      </Col>
    </>
  )
}

Designer.defaultProps = {
  span: 16
}
export default Designer;