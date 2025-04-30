/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 15:13:18
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-30 14:30:48
 * @FilePath: \pcszl\src\router\modules\usercenter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export default [
    {
        path: '/usercenter',
        name: 'usercenter',
        component: () => import('@/views/usercenter/index.vue'),
        meta: {
            title: '用户中心'
        },
        children: [
            {
                path: 'myorder',
                name: 'myorder',
                component: () => import('@/views/usercenter/menuitem/myorder/index.vue'),
                meta: {
                    title: '我的订单'
                }
            },
            {
                path: 'mycourse',
                name: 'mycourse',
                component: () => import('@/views/usercenter/menuitem/mycourse/index.vue'),
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: 'redemptioncode',
                name: 'redemptioncode',
                component: () => import('@/views/usercenter/menuitem/redemptioncode/index.vue'),
                meta: {
                    title: '兑换码兑换'
                }
            },
            {
                path: 'accountsettings',
                name: 'accountsettings',
                component: () => import('@/views/usercenter/menuitem/accountsettings/index.vue'),
                meta: {
                    title: '账号设置'
                }
            },
            {
                path: 'addressmanagement',
                name: 'addressmanagement',
                component: () => import('@/views/usercenter/menuitem/addressmanagement/index.vue'),
                meta: {
                    title: '地址管理'
                }
            },
            {
                path: 'serviceagreement',
                name: 'serviceagreement',
                component: () => import('@/views/usercenter/menuitem/serviceagreement/index.vue'),
                meta: {
                    title: '服务协议'
                }
            },
            {
                path: 'privacyagreement',
                name: 'privacyagreement',
                component: () => import('@/views/usercenter/menuitem/privacyagreement/index.vue'),
                meta: {
                    title: '隐私协议'
                }
            }
        ]
    },
    {
        path: '/submitorder',
        name: 'submitorder',
        component: () => import('@/views/usercenter/submitorder/index.vue'),
        meta: {
            title: '提交订单'
        },
    },
    {
        path: '/orderdetail',
        name: 'orderdetail',
        component: () => import('@/views/usercenter/menuitem/myorder/orderdetail/index.vue'),
        meta: {
            title: '订单详情'
        },
    }
];