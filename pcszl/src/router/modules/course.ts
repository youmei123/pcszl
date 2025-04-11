export default [
    {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index.vue'),
        meta: {
            title: '全部课程'
        }
    },
    {
        path: '/coursevideo',
        name: 'coursevideo',
        component: () => import('@/views/course/coursevideo/index.vue'),
        meta: {
            title: '看课页面'
        }
    }
];