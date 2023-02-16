import { reactive } from "vue";
import { getDarkColor, getLightColor } from "@/utils/handle-color";
import { useThemeStore } from "@/store/theme/theme";
const themeObj = {
  "--el-color-primary": "#85DA25",
  "--el-color-primary-dark-2": "#639f20",
  "--el-color-primary-light-1": "#91de3b",
  "--el-color-primary-light-2": "#9de151",
  "--el-color-primary-light-3": "#aae566",
  "--el-color-primary-light-4": "#b6e97c",
  "--el-color-primary-light-5": "#c2ed92",
  "--el-color-primary-light-6": "#cef0a8",
  "--el-color-primary-light-7": "#daf4be",
  "--el-color-primary-light-8": "#e7f8d3",
  "--el-color-primary-light-9": " #f3fbe9",
};
export const useTheme = () => {
  const themeConfig = {
    "--el-color-primary": "",
    "--el-color-primary-dark-2": "",
  };
  const lightPrefix = "--el-color-primary-light-";
  const themeStore = useThemeStore();
  const isDark = themeStore.themeConfig.isDark;
  const changePrimary = (color: string | null) => {
    if (!color) return;
    themeStore.setPrimary(color);
    themeConfig["--el-color-primary"] = color;
    themeConfig["--el-color-primary-dark-2"] = isDark
      ? `${getLightColor(color, 0.2)}`
      : `${getDarkColor(color, 0.3)}`;

    for (let i = 1; i <= 9; i++) {
      themeConfig[`${lightPrefix}${i}`] = isDark
        ? `${getDarkColor(color, i / 10)}`
        : `${getLightColor(color, i / 10)}`;
    }
    Object.keys(themeConfig).map((item) => {
      document.documentElement.style.setProperty(item, themeConfig[item]);
    });
  };
  const changeGreyOrWeak = (value: any) => {
    console.log(value, "--- value-----");
    let body = document.body as HTMLElement;
    if (!value) {
      return body.setAttribute("style", "");
    }
    themeStore.setIsWeak(value);
    body.setAttribute("style", "filter : grayscale(.5)");
  };
  const initTheme = () => {
    changePrimary(themeStore.themeConfig.primary);
    changeGreyOrWeak(themeStore.themeConfig.isWeak);
  };
  return {
    changePrimary,
    changeGreyOrWeak,
    initTheme,
  };
};
