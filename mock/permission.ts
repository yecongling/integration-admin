export default {
  'GET /api/sys/permission/getUserPermissionByToken': {
    code: 200,
    success: true,
    message: '',
    result: [
      {
        "path": "/home",
        "component": "Home",
        "route": "1",
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "icon": "HomeOutlined",
          "componentName": "Menu",
          "title": "首页"
        },
        "name": "system-menu",
        "id": "1170592628746878978"
      },
      {
        "redirect": null,
        "path": "/sys",
        "component": "",
        "route": "1",
        "children": [{
          "path": "/sys/menu",
          "component": "system/Menu",
          "route": "1",
          "meta": {
            "keepAlive": false,
            "internalOrExternal": false,
            "icon": "MenuOutlined",
            "componentName": "Menu",
            "title": "菜单管理"
          },
          "name": "system-menu",
          "id": "1170592628746878978"
        }, {
          "path": "/sys/role",
          "component": "system/Role",
          "route": "1",
          "meta": {
            "keepAlive": false,
            "internalOrExternal": false,
            "icon": "UsergroupDeleteOutlined",
            "componentName": "Role",
            "title": "角色管理"
          },
          "name": "system-role",
          "id": "190c2b43bec6a5f7a4194a85db67d96a"
        }, {
          "path": "/sys/user",
          "component": "system/User",
          "route": "1",
          "meta": {
            "keepAlive": true,
            "internalOrExternal": false,
            "icon": "UserOutlined",
            "componentName": "User",
            "title": "用户管理"
          },
          "name": "system-user",
          "id": "3f915b2769fc80648e92d04e84ca059d"
        }],
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "icon": "SettingOutlined",
          "title": "系统管理"
        },
        "name": "system",
        "id": "d7d6e2e4e2934f2c9385a623fd98c6f3"
      }, {
        "redirect": null,
        "path": "/resource",
        "component": "",
        "route": "1",
        "children": [
          {
            "path": "/resource/database",
            "component": "resource/Database",
            "route": "1",
            "meta": {
              "keepAlive": false,
              "internalOrExternal": false,
              "icon": "DatabaseOutlined",
              "componentName": "Database",
              "title": "数据源管理"
            },
            "name": "system-database",
            "id": "1170592628746872978"
          }
        ],
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "icon": "DribbbleOutlined",
          "title": "资源管理"
        },
        "name": "system",
        "id": "d7d6e2e4e2934f2c9385a623fd98c6f3"
      },
      {
        "redirect": null,
        "path": "/emr",
        "component": "",
        "route": "1",
        "children": [
          {
            "path": "/emr/editor",
            "component": "emr/Editor",
            "route": "1",
            "meta": {
              "keepAlive": false,
              "internalOrExternal": false,
              "icon": "EditOutlined",
              "componentName": "Database",
              "title": "病历设计器"
            },
            "name": "system-emr-editor",
            "id": "1170592628746872934"
          }
        ],
        "meta": {
          "keepAlive": false,
          "internalOrExternal": false,
          "icon": "FileDoneOutlined",
          "title": "病历管理"
        },
        "name": "emr",
        "id": "d7d6e2e4e2934f2c9385a623fer98c6f3"
      }
    ]
  }
}