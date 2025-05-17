export default [
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
            title: '关于我们'
        }
    },
    {
        path: '/aboutIndex',
        name: 'aboutIndex',
        component: () => import('@/views/about/aboutIndex.vue'),
        meta: {
            title: '联系我们'
        }
    },
];