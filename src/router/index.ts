import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";
import { firstMenu } from "@/utils/map-menus";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/login.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/pages/layout/layout.vue"),
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "error",
        component: () => import("@/pages/error/error.vue"),
      },
    ],
  },
  //   {
  //     path: "/:pathMatch(.*)*",
  //     name: "error",
  //     component: () => import("@/pages/error/error.vue"),
  //   },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const map = {};
function setTitle(to: any): any {
  const title = to.meta.title;
  const originTitle = document.title;
  if (!title) {
    const titleArr = originTitle.split(" | ");
    if (titleArr[1] in map) {
      document.title = titleArr[0];
      delete map[titleArr[1]];
    }
    return;
  }

  if (title in map) {
    return;
  }
  document.title = to.meta.title
    ? originTitle + " | " + to.meta.title
    : originTitle;
  map[title] = title;
}

function routerGuide() {
  router.beforeEach(async (to) => {
    setTitle(to);

    if (to.path !== "/login") {
      const token = localStorage.getItem("token");
      if (!token) {
        return "/login";
      }
    }
    if (to.path === "/layout" || to.path == "/layout/")
      return firstMenu ? firstMenu.url : to.path;
  });
}
export function setRouter(app: App) {
  app.use(router);
  routerGuide();
}

export default router;
