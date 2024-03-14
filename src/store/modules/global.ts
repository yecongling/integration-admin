import {createSlice} from "@reduxjs/toolkit";

export interface globalState {
  theme: string;
  colorPrimary: string;
  collapse: boolean;
}

const initialState: globalState = {
  theme: "dark",
  colorPrimary: "#1890ff",
  collapse: false
}

// 创建一个Slice
export const global = createSlice({
  // 命名空间
  name: "global",

  // 初始状态值
  initialState,

  // 定义reducer并生成关联的操作
  reducers: {
    setCollapse(state, {payload}) {
      state.collapse = payload.collapse
    },

    setTheme(state, {payload}) {
      state.theme = payload.theme
    },

    setColorPrimary(state, {payload}) {
      state.colorPrimary = payload.colorPrimary
    }
  }
});

// 到处reducer方法
export const {setCollapse, setTheme, setColorPrimary} = global.actions;

// 默认导出
export default global.reducer