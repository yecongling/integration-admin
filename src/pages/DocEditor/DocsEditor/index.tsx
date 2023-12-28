import React from "react";
import HorizontalRuler from "@/pages/DocEditor/DocsEditor/ruler/HorizontalRuler";
import VerticalRuler from "@/pages/DocEditor/DocsEditor/ruler/VerticalRuler";
import AppView from "@/pages/DocEditor/DocsEditor/AppView";

const DocsEditor: React.FC = () => {
  return (
    <>
      <div id="docs-editor-container" style={{height: 'calc(100% - 90px)'}}>
        <div id="docs-editor">
          <div id="kix-appview" className="kix-addview">
            {/* 标尺 */}
            <HorizontalRuler/>
            {/* 中间编辑器部分 */}
            <AppView id="editor"/>
            <VerticalRuler/>
          </div>
        </div>
        中间编辑器区域（封装组件）
      </div>
    </>
  )
}
export default DocsEditor;