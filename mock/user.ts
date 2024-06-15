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
            realName: '叶丛林',
            username: 'admin',
            role: 'admin'
          }
        ]
      }
    }
  }
]

export default user;