export default [
    {
        path: '/mall',
        name: 'mall',
        component: () => import('@/views/mall/index.vue'),
        meta: {
            title: '商城'
        }
    }
];