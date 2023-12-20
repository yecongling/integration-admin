import React from "react";

const DocEditor: React.FC = () => {
  return (
    <>
      <div id="docs-chrome" tabIndex={0} role="banner" aria-label="菜单栏" className="docs-material companion-enabled">
        <div>
          <div id="docs-header-container">
            图标、名字、标题栏（封装成单个组件） 仿Google文档
          </div>
        </div>
        <div id="docs-bars">
          <div id="docs-menubars">
            <div id="doc-menubar">
              菜单栏（封装成单个组件）
            </div>
          </div>
          <div id="docs-toolbar-wrapper" className="docs-main-toolbars">
            工具栏（封装成单个组件）
          </div>
        </div>
      </div>
      <div className="docs-editor-container" style={{height: 'calc(100% - 90px)'}}>
        中间编辑器区域（封装组件）
        <iframe src="https://docs.google.com/document/d/1y2vYbHtb-BPYB_W-Slc8sT1yOu58Vs9MEeBTxZ4ysV4/edit#"
                frameBorder={0} width="100%" height="100%"></iframe>
      </div>
    </>
  )
}
export default DocEditor;