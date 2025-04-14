import request from "@/utiles/request";
// 登录接口
export const loginUser = (data: any) => {
    return request.post<any>('/api/szl/loginUser', data);
};