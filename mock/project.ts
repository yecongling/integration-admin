import {MockMethod} from "vite-plugin-mock";

const project: Array<MockMethod> = [
  {
    url: '/api/engine/project/queryProjects',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '',
        success: true,
        result: [

        ]
      }
    }
  }
]

export default project;