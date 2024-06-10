import { MockMethod } from "vite-plugin-mock";
import { Result } from "../src/types/axios";

const project: Array<MockMethod> = [
  {
    url: '/api/engine/endpoint/getEndpoints',
    method: 'post',
    response: (): Result => {
      return {
        code: 200,
        msg: '',
        data: [
          {
            key: "12312",
            id: "werwe",
            type: "1",
            status: 1,
            warning: '1',
            mode: 1,
            name: "测试使用的项目",
            description: '这是一个用来测试的项目',
            chart: 2,
          }
        ]
      }
    }
  }
]

export default project;