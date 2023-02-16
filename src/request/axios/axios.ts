import axios from "axios";
import { nextTick, ref, toRaw } from "vue";
import type { AxiosInstance } from "axios";
import { ElLoading } from "element-plus";
import { IRequesetInterceptors, IRequestConfig } from "./types";
let cancelController: AbortController;
/**
 * 接口延迟取消请求的逻辑 适用于tab 切换 展示表格之类的逻辑
 *   在接口请求时候 生成一个AbortController 。
 *  将signal 传递给请求 然后全局判断时候有没有该对象 假设有的话 调用abort（）方法
 */
let signal: any = ref();
const abortRequestList = new Map();
class Request {
  instance: AxiosInstance;
  interceptors?: IRequesetInterceptors;
  showLoading: boolean;
  loading?: any;
  constructor(config: IRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? true;
    /**
     this.instance.interceptors.use 调用axios 实例上面的方法，执行传入的自定义拦截器
     按照代码的执行顺序，是传入的自定义的拦截器先执行
     */
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorError
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorError
    );

    this.instance.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (error: any) => {
        console.warn("request error");
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (response: any) => {
        if (response.returnCode === "-10000") {
          return console.warn(`请求失败 ： ${response.messages}`);
        }
        return response.data;
      },
      (error: any) => {
        if (!error) return;
        const statusCode = error.status;
        const message = error.message;
        switch (statusCode) {
          case 401:
            console.warn("未授权");
            break;
          default:
            break;
        }
        return error;
      }
    );
  }
  /*
    使用axios内部的 request方法 重新封装了request方法
    request方法特性：
      可以自己定义拦截器

  */
  request<T>(config: IRequestConfig<T>, signal: any): Promise<T> {
    let loadingInstance: any;

    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.showLoading = config.showLoading ?? true;
      if (this.showLoading) {
        loadingInstance = ElLoading.service({ fullscreen: true });
      }

      if (!signal) {
        signal = undefined;
      }
      if (config.showLoading) delete config.showLoading;
      this.instance.request({ ...config, signal }).then(
        (res: any) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          this.showLoading = false;
          nextTick(() => {
            loadingInstance.close();
          });
          resolve(res);
        },
        (rej: any) => {
          this.showLoading = false;
          reject(rej);
          return rej;
        }
      );
    });
  }
  get<T>(config: IRequestConfig<T>, controller?: any): Promise<T> {
    return this.request(
      { ...config, method: "GET" },
      controller ? controller : undefined
    );
  }
  // post<T>(config: IRequestConfig<T>,controller?:any): Promise<T> {
  //   return this.request({ ...config, method: 'POST' }, controller? controller: {})
  // }
  post<T>(config: IRequestConfig<T>, controller?: any): Promise<T> {
    if (signal.value) {
      signal.value.abort();
    }
    if (controller && controller.abort) {
      signal.value = new AbortController();
      //   abortRequestList.set(config.url, signal);
    }
    return this.request(
      { ...config, method: "POST" },
      signal.value ? signal.value.signal : undefined
    );
  }
  delete<T>(config: IRequestConfig<T>, controller?: any): Promise<T> {
    return this.request(
      { ...config, method: "DELETE" },
      controller ? controller : undefined
    );
  }
  patch<T>(config: IRequestConfig<T>, controller?: any): Promise<T> {
    return this.request<T>(
      { ...config, method: "PATCH" },
      controller ? controller : undefined
    );
  }
  // 点击取消按钮 取消已经发出去的请求
  cancle(url: any) {
    // cancelController.abort();
  }
}

export default Request;
