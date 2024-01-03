import React from "react";
import DocsMenuBars from "@/pages/editor/DocEditor/DocsBars/DocsMenuBars";
import DocsToolBar from "@/pages/editor/DocEditor/DocsBars/DocsToolBar";

const DocsBars: React.FC = () => {
  return (
    <>
      <div id="docs-bars">
        <DocsMenuBars/>
        <DocsToolBar/>
      </div>
    </>
  )
}
export default DocsBars;