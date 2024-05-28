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
            key: '12',
            username: '叶丛林',
            role: 'admin'
          }
        ]
      }
    }
  }
]

export default user;