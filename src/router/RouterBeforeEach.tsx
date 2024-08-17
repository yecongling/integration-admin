import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import {checkRouterAuth} from './index'
import React, { useEffect } from "react";
import { checkRouterAuth } from "./checkRouterAuth";

const RouterBeforeEach: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // 需要添加从后台获取路由的方法，因为在刷新的时候，可能路由就会没了
    const obj = checkRouterAuth(location.pathname);
    const blLogin = sessionStorage.getItem("isLogin");
    if (blLogin == "false" || !blLogin || location.pathname === "/") {
      navigate("/login", { replace: true });
    } else {
      if (!obj && location.pathname !== "/404") {
        // 需要判定菜单列表里面是否有这个路径（二级路由不能刷新直接进）会导致二次刷新
        // navigate(obj.path);
        navigate("/404");
      }
    }
  }, []);
  return <Outlet />;
};
export default RouterBeforeEach;
