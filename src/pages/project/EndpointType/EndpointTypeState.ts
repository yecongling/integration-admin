import { EndpointType } from "@/services/project/endpointType/endpointTypeModel";
import { createContext, useContext } from "react";

// 定义状态的类型
interface EndpointTypeState {
  // 表格选中的行
  selectedRow: EndpointType | null;
  // 是否点击的保存（编辑了属性过后）
  editType: string;
  disabled: boolean;
}

// 定义上下文值的类型
interface EndpointContextType {
  state: EndpointTypeState;
  dispatch: React.Dispatch<any>;
}

// 共享状态
export const defaultState: EndpointTypeState = {
  // 树中选中的行
  selectedRow: null,
  // 是否点击的保存（编辑了属性过后）
  editType: "view",
  disabled: true
};

export function reducer(
  state: EndpointTypeState,
  action: any
): EndpointTypeState {
  switch (action.type) {
    case "SET_SELECTED_ROW":
      return { ...state, selectedRow: action.payload };
    case "SET_EDIT_TYPE":
      return { ...state, editType: action.payload };
    case "SET_DISABLED":
      return { ...state, disabled: action.payload };
    default:
      return state;
  }
}

// 创建一个上下文
export const EndpointTypeContext = createContext<EndpointContextType>({
  state: defaultState,
  dispatch: () => null,
});

// 导出 useContext 钩子，方便使用
export const useEndpointTypeContext = () => useContext(EndpointTypeContext);
