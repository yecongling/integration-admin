import {createSlice} from "@reduxjs/toolkit";
import {RouteObject} from "@/interface";

/**
 * 定义菜单
 */
export interface Menu {
  menus: RouteObject[];
}

/**
 * 初始状态（从后台获取到的路由信息）
 */
const initialState: Menu = {
  menus: []
}

export const menu = createSlice({
  // 命名空间
  name: 'menu',

  // 初始状态
  initialState,

  // 定义reducer并生成关联的操作
  reducers: {
    setMenu(state, {payload}) {
      state.menus = payload.menus
    }
  }
})

// 导出reducer方法
export const {setMenu} = menu.actions;

export default menu.reducer;