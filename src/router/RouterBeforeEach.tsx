import {Outlet, useNavigate} from "react-router-dom";
// import {checkRouterAuth} from './index'
import React, {useEffect} from 'react'

const RouterBeforeEach: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    // 需要添加从后台获取路由的方法，因为在刷新的时候，可能路由就会没了
    // const obj = checkRouterAuth(location.pathname)
    const blLogin = sessionStorage.getItem('login')
    if (blLogin == 'false' || !blLogin) {
      navigate('/login', {replace: true})
    } else {
      navigate("/editor/docEditor");
    }
  }, [])
  return <Outlet/>
}
export default RouterBeforeEach