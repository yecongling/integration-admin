import React, {memo, useCallback, useEffect, useState} from "react";
import Sider from "antd/es/layout/Sider";
import "./index.less";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Image, Menu, MenuProps, Spin, Tooltip} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {RouteItem} from "@/apis/system/permission/menuModel";
import {addIcon, getOpenKeys} from "@/utils/util.tsx";
import useGlobalStore from "@/store/modules/global.ts";
import favicon from "@/assets/svg/vite.svg";
import {searchRoute} from "@/utils";
import useMenuStore from "@/store/modules/menu.ts";
import {useShallow} from "zustand/react/shallow";

const LeftMenu: React.FC = memo(() => {
  const {menus} = useMenuStore(
      useShallow((state) => ({
        menus: state.menus
      }))
  );
  // 通过useSelector直接拿到store中定义的value
  const {collapse, theme, setCollapse} = useGlobalStore(
      useShallow((state) => ({
        collapse: state.collapse,
        theme: state.theme,
        setCollapse: state.setCollapse
      }))
  );
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 定义 menu 类型
  type MenuItem = Required<MenuProps>["items"][number];
  const getItem = (
      label: React.ReactNode,
      key?: React.Key | null,
      icon?: React.ReactNode,
      children?: MenuItem[],
      type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (menuList: RouteItem[], newArr: MenuItem[] = []) => {
    menuList.forEach((item: RouteItem) => {
      // 如果不能显示的菜单不显示
      if (item?.meta?.menuType === 2) {
        return true;
      }
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length) {
        return newArr.push(getItem(item.meta.title, item.path, addIcon(item.meta.icon!)));
      }
      newArr.push(getItem(item.meta.title, item.path, addIcon(item.meta.icon!), deepLoopFloat(item.children)));
    });
    return newArr;
  };

  const clickMenu: MenuProps["onClick"] = useCallback(({key}: { key: string }) => {
    // 配置外置跳转路由
    // if (route.meta.isLink) window.open(route.meta.isLink, "_blank");
    navigate(key);
    // 可以通过这里去查询菜单路由，以此构建面包屑
    const route = searchRoute(key, menus);
    const title = route.meta?.title;
    if (title) {
      document.title = title;
    }
  }, []);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    const openKey = getOpenKeys(pathname);
    // 判断如果是二级路由，不在左边菜单那种的就不去更新
    const route = searchRoute(pathname, menus);
    if (!route || Object.keys(route).length === 0) {
      return;
    }
    !collapse && setOpenKeys(openKey);
    setSelectedKeys(openKey.concat([pathname]));
  }, [collapse, pathname]);

  // 设置当前展开的 subMenu
  const onOpenChange = useCallback((openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  }, []);


  useEffect(() => {
    if (!menus) return;
    setLoading(true)
    setMenuList(deepLoopFloat(menus, []));
    setLoading(false)
  }, []);

  const titleColor = theme === 'dark' ? '#fff' : '#1890ff';

  return (
      <Sider
          trigger={null}
          collapsedWidth={64}
          className="scroll ant-menu"
          style={{
            overflowX: 'hidden',
            zIndex: 1000,
            borderRight: '1px solid #e9edf0'
          }}
          theme={theme}
          collapsed={collapse}
          collapsible
      >
        <div className="dis-fl js-sb ai-ct toolbox">
          <Link to="/home" style={{width: '100%'}}>
            <div className="hd-64 mgr-01 dis-fl ai-ct jc-ct" style={{justifyContent: 'space-around'}}>
              <Image width={25} src={favicon} preview={false}/>
              {
                collapse ? '' : <p style={{
                  fontWeight: 'bold',
                  margin: '0 12px',
                  fontSize: '20px',
                  color: titleColor
                }}>integration</p>
              }

            </div>
          </Link>
        </div>
        <Spin wrapperClassName="side-menu" spinning={loading} tip="Loading...">
          <Menu
              mode="inline"
              theme={theme}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              items={menuList}
              onClick={clickMenu}
              onOpenChange={onOpenChange}
          />
        </Spin>
        <div className="collapse">
        <span
            style={{
              cursor: 'pointer',
              fontSize: '16px'
            }}
            onClick={() => setCollapse(!collapse)}
            className="btnbor"
        >
          <div style={{padding: '10px 20px 10px 10px', display: 'flex', justifyContent: 'end'}}>
            {collapse ? <Tooltip title="展开"><MenuUnfoldOutlined
                    style={{color: theme === 'dark' ? 'white' : 'black'}}/></Tooltip> :
                <Tooltip title="收起"><MenuFoldOutlined
                    style={{color: theme === 'dark' ? 'white' : 'black'}}/></Tooltip>}
          </div>
      </span>
        </div>
      </Sider>
  )
})
export default LeftMenu;