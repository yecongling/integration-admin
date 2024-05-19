import {MockMethod} from "vite-plugin-mock";

const user: Array<MockMethod> = [
  {
    url: '/api/sys/user/getAllUser',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: [
          {
            username: '叶丛林'
          }
        ]
      }
    }
  }
]

export default user;