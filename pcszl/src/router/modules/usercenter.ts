
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
    }
];