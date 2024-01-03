import {MockMethod} from "vite-plugin-mock";
import {Project} from "../src/pages/engine/project/Design/Project";

const projectData: Project[] = [
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
];

const project: Array<MockMethod> = [
  {
    url: '/api/engine/project/queryProjects',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '',
        success: true,
        result: projectData
      }
    }
  },
  {
    url: '/api/engine/project/addProject',
    method: 'post',
    response: ({body}) => {
      console.log("body>>>>>", body);
      return {
        code: 200,
        message: '',
        success: true,
        result: []
      }
    }
  }
]

export default project;