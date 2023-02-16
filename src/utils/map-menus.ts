import { RouteRecordRaw } from "vue-router";
import { ref } from "vue";
import rawRoutes from "@/router/layout/index";
import localCache from "@/utils/cache";
interface IBreadcrumb {
  name: string;
  path?: string;
}
export let firstMenu: any;
export const getBreadCrumbs = () => {
  let crumbs = ref<IBreadcrumb[]>([]);
  let arr = localCache.getCache("clickedMenuList");
  crumbs.value = arr;
  return crumbs;
};
export const generateMunuMapping = () => {
  const menuList = localCache.getCache("userMenu");
  let mapping = {};
  menuList.forEach((item: any) => {
    if (item.type === 1 && item.children) {
      item.children.forEach((child: any) => {
        mapping[child.name] = child.url;
      });
    }
  });
  return mapping;
};
const hanldeIcon = (icon: string) => {
  let index = icon.lastIndexOf("-");
  icon = icon.slice(index + 1);
  let iconArr = icon.split("");
  let iconFirstLetter = icon.substring(0, 1).toUpperCase();
  iconArr[0] = iconFirstLetter;
  icon = iconArr.join("");
  return icon;
};
export const menuToRoutes = (menus: any[]) => {
  const routes: RouteRecordRaw[] = [];
  const matchMenuToRoute = (menus: any[]) => {
    for (const k of menus) {
      if (k.type !== 1) {
        let route: any;
        rawRoutes.find((item) => {
          if (item.children) {
            route = item.children.find((c) => c.path === k.url);
            if (k.roles && route) {
              route.meta && (route.meta.roles = k.roles);
            }
            if (route && k.name) {
              route.meta && (route.meta.title = k.name);
            }
            if (route && k.icon && k.icon.startsWith("el")) {
              console.log(hanldeIcon(k.icon));
              route.meta && (route.meta.icon = hanldeIcon(k.icon));
            }
            route && routes.push(route);
          }
        });

        if (!firstMenu) {
          firstMenu = k;
        }
      } else {
        matchMenuToRoute(k.children);
      }
    }
  };
  matchMenuToRoute(menus);
  return routes;
};
export function getActiveMenu(menuList: any, currentRoute: string) {
  let activeMenu = ref("");
  let prefixRoute: string;
  let menu: any;
  if (currentRoute !== "/layout/") {
    prefixRoute = currentRoute;
    let index = prefixRoute.lastIndexOf("/");
    prefixRoute = prefixRoute.substr(0, index);
  }
  menuList.forEach((item: any) => {
    if (item.url == prefixRoute) {
      if (item.children) {
        menu = item.children.find((c: any) => c.url == currentRoute);
      }
    }
  });
  menu && (activeMenu.value = menu.url!);
  return [activeMenu];
}
export const mapMenuToSearchOptions = () => {};
