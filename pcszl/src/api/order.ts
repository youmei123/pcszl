import request from "@/utiles/request";
// 订单列表
export const listOrder = (url: string, data: any) => {
    return request.get<any>(url, data);
};
// 是否有售后权限
export const isRefund = (data: any) => {
    return request.get<any>('/api/szl/getIsOpen', data);
};
// 取消订单
export const ordersCancel = (data: any) => {
    return request.get<any>('/api/szl/orders/cancel', data);
};
// 撤销售后申请
export const aftersaleCancel = (data: any) => {
    return request.get<any>('/api/szl/orders/aftersale/cancel', data);
};
// 确认收货
export const updateDeliveryOrder = (data: any) => {
    return request.get<any>('/api/szl/order/updateDeliveryOrder', data);
};
// 订单详情
export const singleOrdersById = (data: any) => {
    return request.get<any>('/api/szl/singleOrdersById', data);
};
// 订单运费 
export const postage = (data: any) => {
    return request.get<any>('/api/express/postage', data);
};
