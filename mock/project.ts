import {MockMethod} from "vite-plugin-mock";
import {Project} from "../src/pages/engine/Project/Project";
import {Result} from "../src/types/axios";

const projectData: Project[] = [
  {
    key: "12312",
    id: "werwe",
    status: "1",
    warning: '出现错误警告',
    projectType: 1,
    projectName: "测试使用的项目",
    description: '这是一个用来测试的项目',
    chart: 2,
    projectPriority: 5
  }
];

const project: Array<MockMethod> = [
  {
    url: '/api/engine/project/queryProjects',
    method: 'post',
    response: (): Result => {
      return {
        code: 200,
        msg: '',
        data: projectData
      }
    }
  },
  {
    url: '/api/engine/project/addProject',
    method: 'post',
    response: ({body}) => {
      console.log("body>>>>>", body);
      projectData.push(body as Project);
      return {
        code: 200,
        msg: '',
        data: []
      }
    }
  }
]

export default project;