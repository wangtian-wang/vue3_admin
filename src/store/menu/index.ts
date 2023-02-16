import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import router from "@/router/index";

import { handleLogin, getUser, getMenu } from "@/request/login/index";
import localCache from "@/utils/cache";
import { menuToRoutes } from "@/utils/map-menus";
export default defineStore("menuList", () => {
  let menuList = ref([]);
  let userToken = ref("");
  let userInfo = ref("");
  function setMenuList(value: any) {
    menuList.value = value;
    return new Promise((resolve) => {
      const routes = menuToRoutes(value);
      routes.forEach((item) => {
        router.addRoute("layout", item);
      });
      resolve("");
    });
  }
  function setUserInfo(user: any) {
    userInfo.value = user;
  }
  function setUserToken(token: string) {
    userToken.value = token;
  }
  async function getLogin(payload: any) {
    try {
      const res: any = await handleLogin(payload);
      let id, token;
      if (res.code == 0) {
        id = res.data.id;
        token = res.data.token;
        setUserToken(token);
        localCache.setCache("token", token);
        const resUser: any = await getUser(id);
        if (resUser.code == 0) {
          setUserInfo(resUser.data);
          localCache.setCache("userInfo", resUser.data);
          const resMenu: any = await getMenu(resUser.data.id);
          if (resMenu.code == 0) {
            localCache.setCache("userMenu", resMenu.data);
            await setMenuList(resMenu.data);
          }
          console.log("-----");
          router.push("/layout");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function syncMenuStore() {
    const token = localCache.getCache("token");
    const userInfo = localCache.getCache("userInfo");
    const userMenu = localCache.getCache("userMenu");
    if (token) {
      setUserToken(token);
    }
    if (userInfo) {
      setUserInfo(userInfo);
    }
    if (userMenu) {
      await setMenuList(userMenu);
    }
  }
  syncMenuStore();
  return {
    menuList,
    userToken,
    userInfo,
    setUserInfo,
    setUserToken,
    setMenuList,
    getLogin,
    syncMenuStore,
  };
});
