/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-10 16:18:20
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-10 16:47:43
 * @FilePath: \pcszl\src\utiles\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '', // 从环境变量中获取基础 URL
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config: any) => {
        // 在发送请求之前做些什么，例如添加请求头
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers = {
        //         ...config.headers,
        //         Authorization: `Bearer ${token}`,
        //     };
        // }
        return config;
    },
    (error) => {
        // 处理请求错误
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response.data;
    },
    (error) => {
        // 处理响应错误
        console.error('响应错误:', error);
        return Promise.reject(error);
    }
);

const objectToQueryString = (obj: Record<string, any>): string => {
    return Object.entries(obj)
       .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
       .join('&');
};

// 封装请求方法
const request = {
    get<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
        if (data) {
            const queryString = objectToQueryString(data);
            url = `${url}?${queryString}`;
        }
        return service.get(url, config);
    },
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, data, config);
    },
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return service.put(url, data, config);
    },
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.delete(url, config);
    },
};

export default request;    