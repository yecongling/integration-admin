import React from "react";
import { FormInstance, InputRef } from "antd";

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
  changeModal: (type: string) => void;
  projectName: React.RefObject<InputRef>;
  editInfo: { title: string; opr: string; projectType: number };
  projectData: FormInstance;
  onSearch: (value: any) => void;
  searchForm: FormInstance;
}
