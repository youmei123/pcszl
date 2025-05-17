export default [
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
            title: '关于我们'
        }
    },
];