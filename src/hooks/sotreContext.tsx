import { StoreContext } from "@/context/storeContext";
import { useContext } from "react";

// 创建一个 useStore Hook，用于在组件中获取全局状态
export const useStore = () => {
  return useContext(StoreContext);
};
