import React, { useEffect, useState } from "react";
import { StoreProvider } from "./context/storeContext";
import { App as AntdApp, ConfigProvider, Spin } from "antd";
import { useStore } from "./hooks/sotreContext";
import zhCN from "antd/locale/zh_CN";

import "dayjs/locale/zh-cn";
import { Router } from "./router/router";
import { useLocation, useNavigate } from "react-router-dom";
import { getMenuListByRoleId } from "./services/system/menu/menuApi";

/**
 * 根组件
 * @returns 组件内容
 */
const App: React.FC = () => {
  // 全局状态
  const { globalStore } = useStore();
  const { colorPrimary } = globalStore;

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getMenuData = async () => {
    const roleId = sessionStorage.getItem("roleId");
    return await getMenuListByRoleId({ roleId });
  };

  useEffect(() => {
    // 去后台查询菜单，也需要判定当前是否登录，未登录的话就跳转登录页面
    const isLogin = sessionStorage.getItem("isLogin");
    if (isLogin === "false" || !isLogin || location.pathname === '/login') {
      navigate("/login");
    } else {
      setLoading(true);
      try {
        // 模拟从后台获取数据
        getMenuData().then((menu) => {
          if (!menu) return;
          globalStore.setMenus(menu);
        });
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <StoreProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colorPrimary,
          },
        }}
        locale={zhCN}
      >
        <AntdApp style={{ height: "100%" }}>
          {loading ? <Spin /> : <Router />}
        </AntdApp>
      </ConfigProvider>
    </StoreProvider>
  );
};

export default App;
