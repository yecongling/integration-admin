import React from "react";
import DocsMenuBars from "@/pages/DocEditor/DocsBars/DocsMenuBars";
import DocsToolBar from "@/pages/DocEditor/DocsBars/DocsToolBar";

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