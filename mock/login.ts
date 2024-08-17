import { MockMethod } from "vite-plugin-mock";

const project: Array<MockMethod> = [
  {
    url: "/api/login",
    method: "post",
    response: () => {
      return {
        code: 200,
        msg: "",
        data: {
          token: "wefewfwe",
          roleId: "admin",
          homePath: "/home",
        },
      };
    },
  },
];

export default project;
