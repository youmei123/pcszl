/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-11 10:01:07
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-17 15:26:51
 * @FilePath: \pcszl\src\api\course.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utiles/request";

//课程集合
export const listCourseType = (data?: any) => {
    return request.get<any>('/api/szl/listCourseType',data);
};
//课程详情
export const singleCourse = (data?: any) => {
    return request.get<any>('/api/szl/singleCourse',data);
};
//无标签课程视频集合
export const szlCourseVideo = (data?: any) => {
    return request.get<any>('/api/szl/list/szlCourseVideo',data);
};
//有标签课程视频集合
export const videolist = (data?: any) => {
    return request.get<any>('/api/szl/course/video/list',data);
};
//保存观看记录
export const saveWatchTimeNewHuawei = (data?: any) => {
    return request.post<any>('/api/szl/saveWatchTimeNewHuawei',data);
};
//获取客服手机号
export const customerServiceMobile = (data?: any) => {
    return request.get<any>('/api/szl/customerServiceMobile',data);
};