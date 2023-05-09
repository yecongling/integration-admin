/**
 * 定义菜单字段类型
 */
export interface Menu {
  id: string;
  parent_id: string;
  name: string;
  url: string;
  component: string;
  component_name: string;
  redirect: string
  menu_type: number;
  perms: string;
  perms_type:string;
  sort_no: number;
  always_show: boolean;
  icon: string;
  is_route: boolean;
  is_leaf: boolean;
  keep_alive: boolean;
  hidden: boolean;
  hide_tab: boolean;
  description: string;
  del_flag: boolean;
  rule_flag: number;
  status: string;
  internal_or_external: boolean;
}