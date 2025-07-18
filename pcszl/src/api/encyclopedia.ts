/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-05 15:13:44
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-18 16:20:32
 * @FilePath: \pcszl\src\api\encyclopedia.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utiles/request";

export const listMjyaFirst = (data?: any) => {
    return request.get<any>('/api/szlZyzy/listMjyaFirst', data);
};

export const listMjyaSecond = (data?: any) => {
    return request.get<any>('/api/szlZyzy/listMjyaSecond', data);
};

export const singleMjyaSecond = (data?: any) => {
    return request.get<any>('/api/szlZyzy/singleMjyaSecond', data);
};

export const firstlist = (data?: any) => {
    return request.get<any>('/api/szlZyzy/jdfj/first/list', data);
};
export const secondlist = (data?: any) => {
    return request.get<any>('/api/szlZyzy/jdfj/second/list', data);
};
export const thirdsingle = (data?: any) => {
    return request.get<any>('/api/szlZyzy/jdfj/third/single', data);
};

export const listCyzyFirst = (data?: any) => {
    return request.get<any>('/api/szlZyzy/listCyzyFirst', data);
};

export const listCyzySecond = (data?: any) => {
    return request.get<any>('/api/szlZyzy/listCyzySecond', data);
};

export const listCyzyThird = (data?: any) => {
    return request.get<any>('/api/szlZyzy/listCyzyThird', data);
};

export const singleCyzyFirst = (data?: any) => {
    return request.get<any>('/api/szlZyzy/singleCyzyFirst', data);
};

export const singleCyzyThird = (data?: any) => {
    return request.get<any>('/api/szlZyzy/singleCyzyThird', data);
};

export const listZcy = (data?: any) => {
    return request.get<any>('/api/szlZyzy/listZcy', data);
};

export const singleZcy = (data?: any) => {
    return request.get<any>('/api/szlZyzy/singleZcy', data);
};

export const zyyslist = (data?: any) => {
    return request.get<any>('/api/szlZyzy/zyys/list', data);
};

export const zyyssingle = (data?: any) => {
    return request.get<any>('/api/szlZyzy/zyys/single', data);
};