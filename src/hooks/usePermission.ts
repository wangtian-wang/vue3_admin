import { useRoute } from "vue-router";
/**
 *
 * @param 根据用户路由 meta 的 role 判断用户当前有无权限
 * @returns
 */
export const usePermission = (pers: any) => {
  const route = useRoute();
  const roleList = route.meta.roles;
  if (Array.isArray(roleList) && roleList.includes(pers)) {
    return true;
  } else {
    return false;
  }
};
