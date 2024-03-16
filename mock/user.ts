import {MockMethod} from "vite-plugin-mock";

const user: Array<MockMethod> = [
  {
    url: '/api/sys/user/getAllUser',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '',
        success: true,
        result: [
          {
            key: "12312",
            id: "werwe",
            status: "1",
            warning: true,
            projectType: 1,
            projectName: "测试使用的项目",
            chart: 2,
            projectPriority: 5
          }
        ]
      }
    }
  }
]

export default user;