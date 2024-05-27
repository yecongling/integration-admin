import {MockMethod} from "vite-plugin-mock";

const user: Array<MockMethod> = [
  {
    url: '/api/sys/user/getAllUser',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '',
        data: [
          {
            username: '叶丛林',
            role: 'admin'
          }
        ]
      }
    }
  }
]

export default user;