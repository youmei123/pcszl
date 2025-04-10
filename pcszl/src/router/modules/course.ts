export default [
    {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index.vue'),
        meta: {
            title: '全部课程'
        }
    }
];