import Vue from "vue";
import VueRouter from "vue-router";

// 防止重複點擊相同router噴error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/", //開頭大寫
    name: "Home", //開頭大寫
    component: () => import("../views/Mission/index.vue"),
    meta: {
      title: "今日任務",
      requireAuth: true,
      NoNeedHome: false,
    },
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登入頁",
      requireAuth: false,
      NoNeedHome: true,
    },
  },
  {
    path: "/Err404",
    name: "Err404",
    component: () => import("../views/Err404.vue"),
    meta: {
      title: "404頁面",
      requireAuth: false,
      NoNeedHome: false,
    },
  },
  {
    path: "/Mission",
    name: "Mission",
    component: () => import("../views/Mission/index.vue"),
    meta: {
      title: "今日任務",
      requireAuth: true,
      NoNeedHome: false,
    },
  },
  {
    path: "/Mission/Action/:id",
    name: "Action",
    component: () => import("../views/Mission/action.vue"),
    meta: {
      title: "今日任務-執行中",
      requireAuth: true,
      NoNeedHome: false,
    },
  },
  {
    path: "/Income",
    name: "Income",
    component: () => import("../views/Income/index.vue"),
    meta: {
      title: "收入列表",
      requireAuth: true,
      NoNeedHome: false,
    },
  },
  {
    path: "/History",
    name: "History",
    component: () => import("../views/History/index.vue"),
    meta: {
      title: "任務歷程",
      requireAuth: true,
      NoNeedHome: false,
    },
  },
  {
    path: "/History/Detail/:id",
    name: "Detail",
    component: () => import("../views/History/detail.vue"),
    meta: {
      title: "今日任務-執行中",
      requireAuth: true,
      NoNeedHome: false,
    },
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () => import("../views/Contact/index.vue"),
    meta: {
      title: "聯絡客服",
      requireAuth: true,
      NoNeedHome: false,
    },
  },

  // 不存在的路由跳轉
  {
    path: "*",
    redirect: "/Err404",
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
