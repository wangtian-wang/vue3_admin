<template>
  <div id="nav-header">
    <div class="icon-contaniner fold-menu">
      <el-icon v-if="isFold" @click="handleFoldClick"><Fold /></el-icon>
      <el-icon v-else @click="handleFoldClick"><Expand /></el-icon>
    </div>

    <div class="content">
      <el-icon size="large" class="mr-10 cursor" @click="openSearch"
        ><Search
      /></el-icon>
      <el-icon size="large" class="mr-10 cursor" @click="openDraw"
        ><Setting
      /></el-icon>
      <el-icon size="large" class="mr-10 cursor" @click="openFullscreen"
        ><FullScreen
      /></el-icon>
      <user-info />
    </div>
  </div>
  <BreadCrumb :breadcrumbs="breadcrumbs" @del-crumb="handleDelCrumbs" />
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item flex-row-between">
      <span>主题颜色</span>
      <el-color-picker
        v-model="themeConfig.primary"
        :predefine="COLORLIST"
        @change="changePrimary"
      />
    </div>
    <div class="theme-item flex-row-between">
      <span>暗夜模式</span>
      <el-switch
        v-model="themeConfig.isDark"
        inline-prompt
        active-text="🌝"
        inactive-text="🌞"
      />
    </div>
    <div class="theme-item flex-row-between">
      <span>护眼模式</span>
      <el-switch v-model="themeConfig.isWeak" @change="changeGreyOrWeak" />
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
  </el-drawer>
  <CommonSearch v-model="showSearchDialog" ref="searchRef"></CommonSearch>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";
  import { useFullscreen } from "@vueuse/core";
  import { useRoute } from "vue-router";
  import { COLORLIST, DEFAULT_PRIMARY } from "@/common/theme/config";
  import { useThemeStore } from "@/store/theme/theme";
  import { useTheme } from "@/hooks/useTheme";
  import { getBreadCrumbs } from "@/utils/map-menus";
  import localCache from "@/utils/cache";
  import Mitt from "@/utils/mitt";

  import UserInfo from "./UserInfo.vue";
  import BreadCrumb from "./BreadCrumb.vue";
  import CommonSearch from "../CommonSearch";
  import { FullScreen } from "@element-plus/icons-vue";
  const isFold = ref(false);
  const emits = defineEmits(["foldChange"]);
  Mitt.on("initCrumbs", (data: any) => {
    crumbRef.value = data;
  });
  const handleFoldClick = () => {
    isFold.value = !isFold.value;
    emits("foldChange", isFold.value);
  };

  let crumbRef = getBreadCrumbs(); // 只在初始化的时候执行一次， 等到列表清空后 不会执行

  let breadcrumbs = computed({
    get() {
      return crumbRef.value;
    },
    set(value) {
      crumbRef.value = value;
      localCache.setCache("clickedMenuList", value);
    },
  });
  const handleDelCrumbs = (item: any) => {
    breadcrumbs.value = breadcrumbs.value.filter((c) => c.path !== item.path);
  };

  const drawer = ref(false);
  const openDraw = () => {
    drawer.value = true;
  };
  const themeStore = useThemeStore();
  const themeConfig = computed(() => {
    return themeStore.themeConfig;
  });
  const { changePrimary, changeGreyOrWeak } = useTheme();
  const searchRef = ref();
  const showSearchDialog = ref(false);
  const openSearch = () => {
    showSearchDialog.value = true;
    if (searchRef.value) {
      if (!searchRef.value.searchKey) {
        searchRef.value.searchKey = "";
      }
    }
  };
  const { toggle: openFullscreen, isFullscreen } = useFullscreen();
</script>

<style scoped lang="scss">
  #nav-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--el-color-primary-light-5);
    .fold-menu {
      font-size: 30px;
      cursor: pointer;
    }
    .content {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      padding: 5px 20px;
    }
  }
</style>
