import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import useMenuStore from "@/store/modules/menu";
import { patchBreadcrumb } from "@/utils/util";

/**
 * 面包屑
 * @return JSX
 */
const BreadcrumbNav: React.FC = () => {
  // 获取路由的地址，地址变化的时候去获取对应的菜单项，以此来拼接面包屑
  const location = useLocation();
  // 从后台获取的路由菜单
  const { menus } = useMenuStore();
  const [items, setItems] = useState<Record<string, any>[]>([
    {
      title: '导航条',
    },
    {
      key: 'home',
      title: <Link to="/home">首页</Link>,
    }
  ]);
  useEffect(() => {
    // 将menu里面的内容和path进行对照获取
    const breadItems = patchBreadcrumb(menus, location.pathname);
    if (breadItems.length > 0) {
      setItems(breadItems);
    }
    // 设置面包屑内容
  }, [location.pathname, menus]);

  // 组件的DOM内容
  return (
    <>
      <Breadcrumb items={items} style={{
        marginLeft: '24px'
      }}>
      </Breadcrumb>
    </>
  )
}
export default BreadcrumbNav;