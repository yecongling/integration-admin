import {MockMethod} from "vite-plugin-mock";

const project: Array<MockMethod> = [
  {
    url: '/api/system/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '',
        success: true,
        result: {
          'code': 200,
          'isLogin': true,
          'data': {
            'tokenValue': 'wefewfwe'
          }
        }
      }
    }
  }
]

export default project;