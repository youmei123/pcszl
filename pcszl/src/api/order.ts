import request from "@/utiles/request";
// 订单列表
export const listOrder = (url: string, data: any) => {
    return request.get<any>(url, data);
};
// 是否有售后权限
export const isRefund = (data: any) => {
    return request.get<any>('/api/szl/getIsOpen', data);
};
