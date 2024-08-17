import { createContext, useContext } from "react";

// 定义状态的类型
interface EndpointState {
  endpoints: any[];
  selectedKeys: string[];
  selectRow: any[];
  treeLoading: boolean;
  openModal: boolean;
  openRecycle: boolean;
  editType: number;
}

// 定义上下文值的类型
interface EndpointContextType {
  state: EndpointState;
  dispatch: React.Dispatch<any>;
}

// 共享状态
export const defaultState: EndpointState = {
  // 定义端点类型数据、端点数据
  endpoints: [],
  // 树选中的节点
  selectedKeys: [],
  // 表格中选中的行
  selectRow: [],
  // 树是否加载完成
  treeLoading: false,
  // 编辑弹窗
  openModal: false,
  // 回收站 弹窗
  openRecycle: false,
  // 编辑类型
  editType: 1,
};

export function reducer(state: EndpointState, action: any): EndpointState {
  switch (action.type) {
    case "SET_ENDPOINTS":
      return { ...state, endpoints: action.payload };
    case "SET_SELECTED_KEYS":
      return { ...state, selectedKeys: action.payload };
    case "SET_TREE_LOADING":
      return { ...state, treeLoading: action.payload };
    case "SET_OPEN_MODAL":
      return { ...state, openModal: action.payload };
    case "SET_OPEN_RECYCLE":
      return { ...state, openRecycle: action.payload };
    case "SET_EDIT_TYPE":
      return { ...state, editType: action.payload };
    case "SET_SELECTED_ROW":
      return { ...state, selectRow: action.payload };
    default:
      return state;
  }
}

// 创建一个上下文
export const EndpointContext = createContext<EndpointContextType>({
  state: defaultState,
  dispatch: () => null,
});

// 导出 useContext 钩子，方便使用
export const useEndpointContext = () => useContext(EndpointContext);
