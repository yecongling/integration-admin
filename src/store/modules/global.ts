import {create} from "zustand";

export interface globalState {
  theme: 'dark' | 'light';
  colorPrimary: string;
  collapse: boolean;
  setTheme: (params: 'dark' | 'light') => void;
  setCollapse: (params: boolean) => void;
  setColorPrimary: (params: string) => void;
}

// const initialState: globalState = {
//   theme: "light",
//   colorPrimary: "#1890ff",
//   collapse: false
// }

// 创建状态存储
const useGlobalStore = create<globalState>((set) => ({
  theme: "light",
  colorPrimary: "#1890ff",
  collapse: false,
  setCollapse: (collapse: boolean) => set({collapse}),
  setTheme: (theme) => set({theme}),
  setColorPrimary: (colorPrimary) => set({colorPrimary}),
}))
export default useGlobalStore