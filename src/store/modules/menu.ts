import {create} from "zustand";

/**
 * 定义菜单
 */
export interface Menu {
  menus: any[];
  setMenus: (params: any[]) => void;
}

// /**
//  * 初始状态（从后台获取到的路由信息）
//  */
// const initialState: Menu = {
//   menus: []
// }

const useMenuStore = create<Menu>((set) => ({
  menus: [],
  setMenus: (menus: any[]) => set({menus}),
}));

export default useMenuStore;