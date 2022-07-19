import Layout from '@/views/layout/index.vue'
const routes = [
    {
        path: "/",
        meta: {
            title: "layout"
        },
        redirect: { name: "home" },
        component: Layout,
        children: [
            {
                path: "/home",
                name: "home",
                meta: {
                    title: "home",
                    desc: "主页"
                },
                component: () => import("@/views/home/home.vue"),
            },
            {
                path: "/live",
                name: "live",
                meta: {
                    title: "live",
                    desc: "直播"
                },
                component: () => import("@/views/live/live.vue"),
            },
            {
                path: "/aipic",
                name: "aipic",
                meta: {
                    title: "aipic",
                    desc: "生成艺术"
                },
                component: () => import("@/views/aipic/aipic.vue"),
            },
        ]
    },
    {
        path: "/404",
        name: "404",
        meta: {
            title: "404"
        },
        component: () => import("@/views/notFound/notFound.vue"),
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: "/404", }
]; 


export default routes;