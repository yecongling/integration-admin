import {configureStore} from "@reduxjs/toolkit";
import globalConfig from "@/store/modules/global";
import menus from "@/store/modules/menu";
// configureStore 创建一个redux数据
const store = configureStore({
  // 合并多个slice
  reducer: {
    global: globalConfig,
    menu: menus
  }
});
export default store;