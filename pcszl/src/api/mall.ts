/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-12 14:23:08
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-12 15:38:21
 * @FilePath: \pcszl\src\api\mall.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utiles/request";

// 商城集合
export const listproduct = (data?: any) => {
    return request.get<any>('/api/szl/list/product',data);
};

// 单个商品
export const singleproduct = (data?: any) => {
    return request.get<any>('/api/szl/single/product',data);
};
// 商品分类
export const listClassification = (data?: any) => {
    return request.get<any>('/api/szl/listClassification',data);
};
// 商品规格
export const listSpecification = (data?: any) => {
    return request.get<any>('/api/szl/listSpecification',data);
};