import { createContext, ReactNode } from "react";
import globalStore from "@/stores/globalStore";

export const StoreContext = createContext({globalStore});

interface StoreProviderProps {
  children: ReactNode;
}

// 创建一个 StoreProvider 组件，用于在应用程序中提供全局状态
export const StoreProvider = ({ children }: StoreProviderProps) => (
  <StoreContext.Provider value={{globalStore}}>{children}</StoreContext.Provider>
);