import React from "react";
import {AppViewProps} from "@/pages/editor/DocEditor/DocsEditor/AppView/AppViewProps.ts";

const AppView: React.FC<AppViewProps> = (props: AppViewProps) => {
  const {id} = props;
  return (
    <div className="kix-addview-editor-container">
      <div className="kix-appview-editor" id={id}>
        中间编辑器部分
      </div>
    </div>
  )
}
export default AppView;