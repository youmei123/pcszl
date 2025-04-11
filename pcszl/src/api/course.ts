import request from "@/utiles/request";

export const listCourseType = (data?: any) => {
    return request.get<any>('/api/szl/listCourseType',data);
};