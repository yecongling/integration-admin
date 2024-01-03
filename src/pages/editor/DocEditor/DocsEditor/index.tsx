import React from "react";
import HorizontalRuler from "@/pages/editor/DocEditor/DocsEditor/ruler/HorizontalRuler.tsx";
import VerticalRuler from "@/pages/editor/DocEditor/DocsEditor/ruler/VerticalRuler.tsx";
import AppView from "@/pages/editor/DocEditor/DocsEditor/AppView";

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