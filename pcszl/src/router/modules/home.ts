/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 10:05:17
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-07 10:23:15
 * @FilePath: \pcszl\src\router\modules\home.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页'
        }
    }
];