/**
 * 封装请求模块
 * 并实现拦截器
 */
import {AxiosTransform, CreateAxiosOptions} from "@/utils/http/axiosTransform";
import {RAxios} from "@/utils/http/Axios";
import {deepMerge, setObjToUrlParams} from "@/utils";
import {AxiosResponse} from "axios";
import {RequestOptions, Result} from "@/types/axios";
import {ContentTypeEnum, RequestEnum, ResultEnum} from "@/enums/httpEnum";
// import {setToken} from "@/stores/modules/global/action";
import {isString} from "@/utils/is";
import {joinTimestamp} from "@/utils/http/helper";
import {Recordable} from "@/types/global";
import {antdUtils} from "@/utils/antd.ts";

/**
 * 数据处理，拦截器。hooks实现
 */
const transform: AxiosTransform = {
  /**
   * 处理响应数据
   * @param res
   * @param options
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const {isTransformResponse, isReturnNativeResponse} = options;
    // 是否返回原生响应头
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回
    const {data} = res;
    if (!data) {
      throw new Error("api接口请求失败，没有返回数据");
    }
    const {code, result, message, success} = data;
    // 系统默认200状态码为正常成功请求，可在枚举中配置自己的
    const hasSuccess = data && Reflect.has(data, "code") && (code === ResultEnum.SUCCESS || code === 200);
    if (hasSuccess) {
      if (success && message && options.successMessageMode === 'success') {
        // 信息成功提示
        antdUtils.message?.success(message);
      }
      return result;
    }
    let timeoutMsg = "";
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = "接口请求超时";
        // setToken("");
        window.location.href = "/login";
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }
    if (options.errorMessageMode === 'modal') {
      antdUtils.modal?.error({title: "错误提示", content: timeoutMsg});
    } else if (options.errorMessageMode === 'message') {
      if (code === 403) {
        antdUtils.modal?.confirm({
          title: "登录失败",
          content: '当前会话失效',
          onOk() {
            window.location.href = '/login';
          }
        })
      } else {
        antdUtils.message?.error(timeoutMsg);
      }
    }
    throw new Error(timeoutMsg || "接口请求失败");
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const {apiUrl, joinPrefix, joinParamsToUrl, joinTime = true, urlPrefix} = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toLowerCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给get请求加上事件戳参数，避免从缓存中拿数据
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非get请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * 请求拦截器处理（主要用于处理如token的传入，授权信息等，或请求头里的一些特殊参数）
   * @param config
   */
  requestInterceptors: (config: Recordable) => {
    return config;
  },

  /**
   * 响应拦截器处理
   * @param res
   */
  responseInterceptors: (res: AxiosResponse) => {
    return res;
  },

  /**
   * 响应错误处理
   * @param error
   */
  responseInterceptorsCatch: (error: any) => {
    const err: string = error?.toString?.() ?? '';
    const {code, message} = error || {};
    let errMessage = '接口请求错误';
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = '接口请求超时';
    }
    if (err?.includes('Network Error')) {
      errMessage = "网络异常"
    }
    if (errMessage) {
      antdUtils.message?.error(errMessage);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
}

function createAxios(opts?: Partial<CreateAxiosOptions>) {
  return new RAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: 10 * 1000,
        /* 这里需要添加登录的token */
        headers: {'Content-Type': ContentTypeEnum.JSON, 'satoken': sessionStorage.getItem('satoken')},
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 异常消息提示类型
          errorMessageMode: 'message',
          // 成功消息提示类型
          successMessageMode: 'success',
          // 接口地址（默认）
          apiUrl: "/integration",
          // 接口拼接地址前缀
          urlPrefix: '',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opts || {}
    )
  );
}

export const defHttp = createAxios();