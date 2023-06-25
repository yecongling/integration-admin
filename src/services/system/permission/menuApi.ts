export enum Api {
    // 根据token获取菜单（多用于框架上根据角色获取菜单那种）
    getMenuList = '/api/sys/permission/getUserPermissionByToken',
    // 获取所有菜单
    getAllPermission = '/api/sys/permission/getAllPermission',
    // 添加菜单
    addPermission = '/api/sys/permission/addPermission',
    // 编辑菜单
    editPermission = '/api/sys/permission/editPermission',
    // 删除菜单
    deletePermission = '/api/sys/permission/deletePermission'
}
