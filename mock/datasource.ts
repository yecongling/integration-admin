export default {
  "POST /api/sys/datasource/queryDatasource": {
    code: 200,
    success: true,
    message: '',
    result: [
      {
        id: '4323423423',
        name: 'mysql',
        datasourceType: '1',
        testQuery: 'select 1',
        url: 'jdbc:mysql://127.0.0.1:3306/integration?characterEncoding=UTF-8&useUnicode=true&useSSL=false&tinyInt1isBit=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Shanghai',
        username: 'ycl',
        password: '123123',
        connectionTimeout: 30,
        idleTimeout: 600,
        maxLifetime: 1800,
        maxPoolSize: 30,
        minIdle: 3
      }
    ]
  }
}