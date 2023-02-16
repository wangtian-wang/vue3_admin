import { defineStore } from "pinia";
import { reactive } from "vue";
import localCache from "@/utils/cache";
import { DEFAULT_PRIMARY } from "@/common/theme/config";
export const useThemeStore = defineStore("themeStore", () => {
  const themeConfig = reactive({
    maximize: false,
    layout: "columns",
    primary: DEFAULT_PRIMARY,
    isDark: false,
    isGrey: false,
    isWeak: false, // 护眼模式
    isCollapse: false,
    breadcrumb: true,
    breadcrumbIcon: true,
    tabs: true,
    tabsIcon: true,
    footer: true,
  });
  const setPrimary = (value: string) => {
    themeConfig.primary = value;
    localCache.setCache("themeConfig", themeConfig);
  };
  const setIsDark = (value: boolean) => {
    themeConfig.isDark = value;
    localCache.setCache("themeConfig", themeConfig);
  };
  const setIsWeak = (value: boolean) => {
    themeConfig.isWeak = value;
    localCache.setCache("themeConfig", themeConfig);
  };
  const setMaxmum = (value: boolean) => {
    themeConfig.maximize = value;
    localCache.setCache("themeConfig", themeConfig);
  };
  const setThemeConfig = (config: any) => {
    if (config) {
      for (const key in themeConfig) {
        themeConfig[key] = config[key];
      }
    } else {
      localCache.setCache("themeConfig", themeConfig);
    }
  };
  const refreshThemeConfig = () => {
    let config = localCache.getCache("themeConfig");
    setThemeConfig(config);
  };
  refreshThemeConfig();
  return {
    themeConfig,
    setPrimary,
    setIsDark,
    setIsWeak,
    setMaxmum,
    refreshThemeConfig,
  };
});
