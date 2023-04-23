/* 数据处理 */
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {RequestOptions, Result} from "@/types/axios";

export interface CreateAxiosOptions extends AxiosRequestConfig {
    authenticationScheme?: string
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}

/**
 * 封装一些需要进行数据转换或处理的配置
 */
export abstract class AxiosTransform {
    /**
     * @description: Process configuration before request
     */
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

    /**
     * 响应数据转换
     */
    transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

    /**
     * @description: 请求失败处理
     */
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig;

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void;

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (error: Error) => void;
}