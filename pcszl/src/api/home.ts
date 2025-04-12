/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-10 16:31:00
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-10 16:32:53
 * @FilePath: \pcszl\src\api\home.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utiles/request";
// 直播列表
export const listSzlLiveStreaming = (data: any) => {
    return request.get<any>('/api/szl/listSzlLiveStreaming', data);
};
// 获取课程列表
export const listCourse = (data: any) => {
    return request.get<any>('/api/szl/listCourse', data);
};