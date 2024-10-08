import { MockMethod } from "vite-plugin-mock";

const project: Array<MockMethod> = [
  {
    url: "/api/project/getProjects",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "",
        data: [
          {
            projectName: "web服务",
            id: "0-0",
          },
        ],
      };
    },
  },
];

export default project;
