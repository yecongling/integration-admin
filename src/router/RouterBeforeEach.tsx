import {Outlet, useLocation, useNavigate} from "react-router-dom";
// import {checkRouterAuth} from './index'
import React, {useEffect} from 'react'
import {checkRouterAuth} from "@/router/index.tsx";

const RouterBeforeEach: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // 需要添加从后台获取路由的方法，因为在刷新的时候，可能路由就会没了
        const obj = checkRouterAuth(location.pathname)
        const blLogin = localStorage.getItem('isLogin')
        if (blLogin == 'false' || !blLogin || location.pathname === '/') {
            navigate('/login', {replace: true})
        } else {
            if (obj != null) {
                // 需要判定菜单列表里面是否有这个路径（二级路由不能刷新直接进）会导致二次刷新
                // 这段代码需要优化掉，不然会进行二次渲染，没得必要
                // navigate(obj.path);
            } else {
                navigate("/home");
            }
        }
    }, [])
    return <Outlet/>
}
export default RouterBeforeEach