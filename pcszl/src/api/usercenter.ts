/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-12 14:15:31
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-12 17:11:40
 * @FilePath: \pcszl\src\api\usercenter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utiles/request";

// 支付接口
export const submitSingle = (data: any) => {
    return request.post<any>('/api/orders/submitSingle', data);
};
//我的课程集合
export const listBuyCourse = (data: any) => {
    return request.get<any>('/api/szl/listBuyCourse', data);
};
// 我的看课记录
export const getWatchTime = (data: any) => {
    return request.get<any>('/api/szl/getWatchTime', data);
};