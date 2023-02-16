import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vitePluginRequire from "vite-plugin-require";
import path from "path";
const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver(),
        // IconsResolver({
        //   prefix: "icon",
        // }),
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        // IconsResolver({
        //   prefix: "icon",
        //   //   enabledCollections: ["ep"],
        // }),
        ElementPlusResolver(),
      ],
    }),
    ElementPlus({
      useSource: true,
      defaultLocale: "zh-tw",
    }),
    // Icons({
    //   autoInstall: true,
    // }),
    vitePluginRequire.default({}),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/vars.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@c": path.resolve(__dirname, "src/components"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  server: {
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "https://run.mocky.io",
        rewrite: (path) => path.replace(/^\api/, ""),
      },
    },
  },
});
