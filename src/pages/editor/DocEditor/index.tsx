import React from "react";
import DocsBars from "@/pages/editor/DocEditor/DocsBars";
import DocsHeader from "@/pages/editor/DocEditor/DocsHeader";
import DocsEditor from "@/pages/editor/DocEditor/DocsEditor";

const DocEditor: React.FC = () => {
  return (
    <>
      <div id="docs-chrome" tabIndex={0} role="banner" aria-label="菜单栏" className="docs-material companion-enabled">
        <div>
          <DocsHeader/>
        </div>
        <DocsBars/>
      </div>
      <DocsEditor/>
    </>
  )
}
export default DocEditor;