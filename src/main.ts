import { createApp } from "vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.css";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { registerGlobal } from "./common/index";
import { setRouter } from "@/router/index";
import useMenuStore from "@/store/menu/index";
import { useThemeStore } from "@/store/theme/theme";
import { useTheme } from "@/hooks/useTheme";
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
app.use(pinia);
const { changePrimary, changeGreyOrWeak, initTheme } = useTheme();
const userMenu = useMenuStore(); // 刷新时候 重新设置菜单和路由 userMenu.syncMenuStore();
// const themeMenu = useThemeStore();
// changePrimary(themeMenu.themeConfig.primary);
// if (themeMenu.themeConfig.isWeak) {
//     changeGreyOrWeak(themeMenu.themeConfig.isWeak)
// }
initTheme(); // 同步设置的主题颜色

app.use(registerGlobal);
app.use(setRouter);
app.mount("#app");
