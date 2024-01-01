import {MockMethod} from "vite-plugin-mock";

const project: Array<MockMethod> = [
  {
    url: '/api/sys/datasource/queryDatasource',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '',
        success: true,
        result: [
          {
            id: "sdgerwrefgert",
            name: "HIS数据源",
            datasourceType: "2",
            url: "localhost:3306/integration",
            username: "root",
            password: "123",
            testQuery: "select 1"
          }
        ]
      }
    }
  }
]

export default project;