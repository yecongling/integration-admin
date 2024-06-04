export enum Api {
  // 根据token获取菜单（多用于框架上根据角色获取菜单那种）
  getMenuList = '/api/system/menu/getMenusByRole',
  // 获取所有菜单
  getAllMenus = '/api/system/menu/getAllMenus',
  // 获取所有上级菜单
  getDirectoryMenu = '/api/system/menu/getDirectoryMenu',
  // 添加菜单
  addPermission = '/api/system/menu/addPermission',
  // 编辑菜单
  updatePermission = '/api/system/menu/updatePermission',
  // 删除菜单
  deletePermission = '/api/system/menu/deletePermission'
}
