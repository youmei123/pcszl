/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-10 16:18:20
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 16:21:00
 * @FilePath: \pcszl\src\utiles\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/userStore";
import { useModalStore } from "@/store/loginStore";
import { debounce } from "@/utiles/public";
// 创建 Axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '', // 从环境变量中获取基础 URL
    timeout: 5000, // 请求超时时间
});


let isRedirectingToLogin = false;
let message=''
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

        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const userStore = useUserStore();
        // 对响应数据做点什么
        if (response.data.message) {
            console.log(response.data.message.indexOf('过期'))
            if (response.data.message.indexOf('过期') != -1 || response.data.message
                .indexOf('登录') != -1 || response.data.message
                    .indexOf('禁用') != -1) {
                userStore.resetState();
                if (response.data.message.indexOf('禁用') == -1) {
                    console.log('进入isRedirectingToLogin')
                    //禁止重复触发登录页面跳转
                    if (!isRedirectingToLogin) {
                        console.log('触发redirectToLogin')
                        message=response.data.message
                        redirectToLogin();
                    }
                }
            }else{
                message=''
                ElMessage.warning(response.data.message);
            }
        }
        return response.data;
    },
    (error) => {
        // 处理响应错误
        // 处理请求错误
        if (!error) return;
        if (!error.response) return;
        if (!error.response.status) return;
        switch (error.response.status) {
            case 400:
                ElMessage.error(error.response.status + '错误请求');
                break;
            case 401:
                ElMessage.error(error.response.status + '未授权，请重新登录');
                break;
            case 403:
                ElMessage.error(error.response.status + '拒绝访问');
                break;
            case 404:
                ElMessage.error(error.response.status + '请求错误,未找到该资源');
                break;
            case 405:
                ElMessage.error(error.response.status + '请求方法类型错误');
                break;
            case 408:
                ElMessage.error(error.response.status + '请求超时');
                break;
            case 500:
                ElMessage.error(error.response.status + '服务器端出错');
                break;
            case 501:
                ElMessage.error(error.response.status + '网络未实现');
                break;
            case 502:
                ElMessage.error(error.response.status + '网络错误');
                break;
            case 503:
                ElMessage.error(error.response.status + '服务不可用');
                break;
            case 504:
                ElMessage.error(error.response.status + '网络超时');
                break;
            case 505:
                ElMessage.error(error.response.status + 'http版本不支持该请求');
                break;
            default:
                ElMessage.error(error.response.status + '连接错误');
        }
        return Promise.reject(error);
    }
);

const objectToQueryString = (obj: Record<string, any>): string => {
    return Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

const redirectToLogin = debounce(() => {
    isRedirectingToLogin = true;
    console.log('触发openLoginPopup')
    ElMessage.warning(message);
    const modalStore = useModalStore();
    // 调用显示弹窗的方法
    modalStore.showLoginModal();
}, 1000);

// 封装请求方法
const request = {
    get<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
        if (data) {
            const userStore = useUserStore();
            if (!data.token && userStore.token) {
                data.token = userStore.token;
            }
            const queryString = objectToQueryString(data);
            url = `${url}?${queryString}`;
        }
        return service.get(url, config);
    },
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const userStore = useUserStore();
        if (!data.token && userStore.token) {
            data.token = userStore.token;
        }
        return service.post(url, data, config);
    },
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const userStore = useUserStore();
        if (!data.token && userStore.token) {
            data.token = userStore.token;
        }
        return service.put(url, data, config);
    },
    delete<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
        if (data) {
            const userStore = useUserStore();
            if (!data.token && userStore.token) {
                data.token = userStore.token;
            }
            const queryString = objectToQueryString(data);
            url = `${url}?${queryString}`;
        }
        return service.delete(url, config);
    },
};

export default request;    