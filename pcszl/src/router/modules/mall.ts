/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:56:46
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-24 09:15:15
 * @FilePath: \pcszl\src\router\modules\mall.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
    {
        path: '/mall',
        name: 'mall',
        component: () => import('@/views/mall/index.vue'),
        meta: {
            title: '商城'
        }
    },
    {
        path: '/productdetail',
        name: 'productdetail',
        component: () => import('@/views/mall/productdetail/index.vue'),
        meta: {
            title: '商城详情'
        }
    }
];