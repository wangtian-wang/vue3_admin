import _axios from './axios';
import { BASE_URL, TIME_OUT } from './config';
import localCache from '@/utils/cache'
export const axios = new _axios({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptors: (config) => {
            const token = localCache.getCache('token')
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
            return config
          },
          requestInterceptorError: (error) => {
            return error
          },
          responseInterceptors: (res) => {
            return res
          },
          responseInterceptorError: (error) => {
            return error
          }
    }
})