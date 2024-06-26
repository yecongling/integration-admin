import './App.css'
import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {App as AntdApp, ConfigProvider, Spin} from "antd"
import ZhCN from "antd/locale/zh_CN";
import dayjs from 'dayjs';
import {RouteItem} from "@/apis/system/permission/menuModel";
import {getMenuList} from "@/apis/system/permission/menu.ts";

import 'dayjs/locale/zh-cn';
import {Router} from "@/router";
import useGlobalStore from "@/store/modules/global.ts";
import useMenuStore from "@/store/modules/menu.ts";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  dayjs.locale('zh-cn');
  const {colorPrimary} = useGlobalStore();
  const {setMenus} = useMenuStore();

  /**
   * 获取菜单数据
   */
  const getMenuData = async () => {
    // 这里角色暂时写死，后续修改
    return (await getMenuList({roleId: 'admin'})) as RouteItem[];
  };

  useEffect(() => {

    const blLogin = localStorage.getItem('isLogin');
    console.log("useEffect ~ obj:", location)
    if (blLogin == 'false' || !blLogin || location.pathname.startsWith("/login")) {
      navigate('/login', {replace: true})
    } else {
      setLoading(true);
      try {
        // 页面加载完成获取route菜单信息
        // TODO 需要做登录判断，未登录时重定到登录页，已登录拿到roId调用接口获取菜单数据并重定向到首页
        getMenuData().then(data => {
          if (!data) return;
          // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
          setMenus(data)
        });
      } finally {
        setLoading(false);
      }
    }
  }, []);
  return (
      <ConfigProvider theme={{
        token: {
          colorPrimary: colorPrimary,
        },
        components: {
          Modal: {
            borderRadius: 4,
            borderRadiusLG: 4
          }
        }
      }} locale={ZhCN}>
        <AntdApp style={{height: '100%'}}>
          {loading ? <Spin/> : <Router/>}
        </AntdApp>
      </ConfigProvider>
  )
}

export default App
