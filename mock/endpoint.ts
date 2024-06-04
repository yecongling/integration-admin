import {MockMethod} from "vite-plugin-mock";
import {Result} from "../src/types/axios";

const project: Array<MockMethod> = [
  {
    url: '/api/engine/endpoint/getEndpoints',
    method: 'post',
    response: (): Result => {
      return {
        code: 200,
        msg: '',
        data: []
      }
    }
  }
]

export default project;