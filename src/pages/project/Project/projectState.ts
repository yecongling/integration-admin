import React from "react";
import { InputRef } from "antd";

/**
 * 定义项目类型属性
 */
export interface ProjectTypeProps {
  projectType: boolean;
  setProjectType: React.Dispatch<React.SetStateAction<boolean>>;
  changeModal: (type: string) => void;
  projectName: React.RefObject<InputRef>;
}

/**
 * 定义项目弹窗所需属性
 */
export interface ProjectInfoProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  // 项目ID
  projectId: string;
  // 项目类型
  projectType: string;
}
