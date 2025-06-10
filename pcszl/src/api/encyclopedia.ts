/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-05 15:13:44
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-06-07 09:07:32
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