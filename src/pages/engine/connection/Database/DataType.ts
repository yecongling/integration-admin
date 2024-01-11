/**
 * 定义数据类型
 */
export interface DataType {
  /* 数据源的唯一ID */
  id: string;
  /* 数据源名称，唯一 */
  name: string;
  /* 数据源类型 目前考虑支持三大数据库，后续加其他的 */
  datasourceType: string;
  /* 连接的URL */
  url: string;
  /* 用户名 */
  username: string;
  /* 密码 */
  password: string;
  /* 测试语句 */
  testQuery: string;
  /* 连接超时时间 */
  connectionTimeout: number;
  /* 闲置超时时间 */
  idleTimeout: number;
  /* 连接最长存活时间 */
  maxLifetime: number;
  /* 最大连接池数量 */
  maxPoolSize: number;
  /* 最小闲置连接池数量 */
  minIdle: number;
}