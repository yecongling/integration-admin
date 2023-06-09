import React, {useEffect, useState} from "react";
import {Image, Layout, Menu, MenuProps, Spin} from "antd";
import {Link, useLocation, useModel, useNavigate} from "umi";
import * as Icons from "@ant-design/icons";
import favicon from "@/assets/images/favicon.png";
import SvgIcon from "@/component/SvgIcon";
import {RouteItem} from "@/services/system/model/menuModel";
import {getOpenKeys, handleRouter} from "@/utils/util";
import {getMenuList} from "@/services/system/permission/permission";
import './index.less';

const {Sider} = Layout;

const LeftMenu: React.FC = () => {
  const {initialState} = useModel("@@initialState");
  // 定义 menu 类型
  type MenuItem = Required<MenuProps>["items"][number];
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const {pathname} = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 点击当前菜单跳转页面
  const navigate = useNavigate();

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

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    if (name.startsWith('icon')) {
      return <SvgIcon type={name}/>;
    }
    return React.createElement(customIcons[name]);
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (menuList: RouteItem[], newArr: MenuItem[] = []) => {
    menuList.forEach((item: RouteItem) => {
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length) {
        return newArr.push(getItem(item.meta.title, item.path, addIcon(item.meta.icon!)));
      }
      newArr.push(getItem(item.meta.title, item.path, addIcon(item.meta.icon!), deepLoopFloat(item.children)));
    });
    return newArr;
  };

  const clickMenu: MenuProps["onClick"] = ({key}: { key: string }) => {
    // const route = searchRoute(key, props.menuList);
    // 配置外置跳转路由
    // if (route.meta.isLink) window.open(route.meta.isLink, "_blank");
    navigate(key);
  };

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
    let openKey = getOpenKeys(pathname);
    !initialState?.setting.isCollapse && setOpenKeys(openKey);
  }, [pathname, initialState?.setting.isCollapse]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  const getMenuData = async () => {
    setLoading(true);
    try {
      const data = (await getMenuList()) as RouteItem[];
      if (!data) return;
      setMenuList(deepLoopFloat(data, []));
      // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
      handleRouter(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenuData();
  }, []);

  return (
    <Sider
      trigger={null}
      collapsedWidth={50}
      className="scroll ant-menu"
      style={{
        overflowX: 'hidden',
        zIndex: 1000,
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.1)'
      }}
      theme={initialState?.setting.navTheme}
      collapsed={initialState?.setting.isCollapse}
      collapsible
    >
      <Link to="/home">
        <div className="hd-64 mgr-01 dis-fl ai-ct jc-ct">
          <Image width={25} src={favicon} preview={false}/>
          {initialState?.setting.isCollapse ? '' : <p style={{
            fontWeight: 'bold',
            margin: '0 12px',
            fontSize: '20px',
            color: initialState?.setting.colorPrimary
          }}>
            {initialState?.setting.title}
          </p>
          }
        </div>
      </Link>
      <Spin wrapperClassName="side-menu" spinning={loading} tip="Loading...">
        <Menu
          theme={initialState?.setting.navTheme}
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          items={menuList}
          onClick={clickMenu}
          onOpenChange={onOpenChange}
        ></Menu>
      </Spin>
    </Sider>
  );
}
export default LeftMenu;