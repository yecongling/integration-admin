import {configureStore} from "@reduxjs/toolkit";
import globalConfig from "@/store/modules/global";
// configureStore 创建一个redux数据
const store = configureStore({
  // 合并多个slice
  reducer: {
    global: globalConfig
  }
});
export default store;