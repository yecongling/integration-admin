import React, {useEffect, useState} from "react";
import Sider from "antd/es/layout/Sider";
import "./index.less";
import * as Icons from "@ant-design/icons";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {Menu, MenuProps, Spin, Tooltip} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SvgIcon from "@/components/SvgIcon";
import {RouteItem} from "@/services/system/permission/menuModel";
import {getOpenKeys, handleRouter} from "@/utils/util.ts";
import {getMenuList} from "@/services/system/permission/permission.ts";
import {setCollapse} from "@/store/modules/global.ts";

const LeftMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 通过useSelector直接拿到store中定义的value
  const {collapse, theme} = useSelector((store: any) => store.global);
  const [isCollapse, changeCollapse] = useState(collapse);
  useEffect(() => {
    changeCollapse(collapse);
  }, [collapse]);
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
    const openKey = getOpenKeys(pathname);
    !isCollapse && setOpenKeys(openKey);
    setSelectedKeys(openKey.concat([pathname]));
  }, [pathname, isCollapse]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  /**
   * 获取菜单数据
   */
  const getMenuData = async () => {
    return (await getMenuList()) as RouteItem[];
  };

  useEffect(() => {
    setLoading(true);
    try {
      getMenuData().then(data => {
        if (!data) return;
        setMenuList(deepLoopFloat(data, []));
        // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
        handleRouter(data);
      });
    } finally {
      setLoading(false);
    }
  }, []);

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
      collapsed={isCollapse}
      collapsible
    >
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
          onClick={() => dispatch(setCollapse({collapse: !collapse}))}
          className="btnbor"
        >
          <div style={{padding: '10px 20px 10px 10px', display: 'flex', justifyContent: 'end'}}>
            {collapse ? <Tooltip title="展开"><MenuUnfoldOutlined/></Tooltip> :
              <Tooltip title="收起"><MenuFoldOutlined/></Tooltip>}
          </div>
      </span>
      </div>
    </Sider>
  )
}
export default LeftMenu;