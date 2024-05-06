export enum Api {
  // 根据token获取菜单（多用于框架上根据角色获取菜单那种）
  getMenuList = '/api/menu/getMenusByRole',
  // 获取所有菜单
  getAllMenus = '/api/menu/getAllMenus',
  // 获取所有上级菜单
  getDirectoryMenu = '/api/menu/getDirectoryMenu',
  // 添加菜单
  addPermission = '/api/menu/addPermission',
  // 编辑菜单
  updatePermission = '/api/menu/updatePermission',
  // 删除菜单
  deletePermission = '/api/menu/deletePermission'
}
