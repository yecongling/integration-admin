// 菜单属性
export interface MetaProps {
    keepAlive?: boolean;
    requiresAuth?: boolean;
    title: string;
    isLeaf?: string;
    key?: string;
}

// 路由对象
export interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    component?: React.ReactNode;
    index?: boolean;
    path?: string;
    meta?: MetaProps;
    isLink?: string;
    auth?: boolean;
    title?: string
}

/**
 * 封装路由对象
 */
export interface RouteMeta {
    key?: string;
    // 菜单序号
    orderNo?: number;
    // 菜单名
    title: string;
    // 动态路由等级
    dynamicLevel?: number;
    // 动态路由的真实路径
    realPath?: string;
    // 忽略授权
    ignoreAuth?: boolean;
    // 缓存
    keepAlive?: boolean
    // 图标
    icon?: string;
    frameSrc?: string;
    // 当前过渡
    transitionName?: string;
    // 携带参数
    carryParam?: boolean;
    single?: boolean;
    // 当前激活的菜单
    currentActiveMenu?: string;
    // 隐藏tab
    hideTab?: boolean;
    // 隐藏菜单
    hideMenu?: boolean;
    isLink?: boolean;
    // 忽略路由
    ignoreRoute?: boolean;
    hidePathForChildren?: boolean;
    // 是否需要访问权限
    requiresAuth?: boolean;
    menuType?: number;
  }
  
  /**
   * 菜单项
   */
  export interface RouteItem {
    // 路径
    path: string;
    // 组件
    component: string;
    // 明细
    meta?: RouteMeta;
    // 菜单名
    name?: string;
    // 别名
    alias?: string | string[];
    // 一级直达
    redirect?: string;
    // 大小写敏感
    caseSensitive?: boolean;
    // 下级菜单
    children?: RouteItem[];
    // 子路由
    childrenRoute?: RouteItem[];
    // route类型
    route?: string;
  }