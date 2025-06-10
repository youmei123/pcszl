/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-03 10:26:08
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-06-04 15:10:04
 * @FilePath: \pcszl\src\router\modules\encyclopedia.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
    {
        path: '/encyclopedia',
        name: 'encyclopedia',
        component: () => import('@/views/encyclopedia/index.vue'),
        meta: {
            title: '百科'
        }
    },
    {
        path: '/consilia',
        name: 'consilia',
        component: () => import('@/views/encyclopedia/consilia/index.vue'),
        meta: {
            title: '名家医案'
        }
    },
];