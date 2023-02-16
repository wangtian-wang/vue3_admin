<template>
  <div class="nav-breadcrumb flex-row-between">
    <el-breadcrumb
      separator="/"
      :separator-icon="ArrowRight"
      :class="['flex-container-base']"
    >
      <template v-for="item in breadcrumbs" :key="item.name + item.url">
        <div class="crumb-wrapper mr-10">
          <el-breadcrumb-item :to="{ path: item.path || '' }"
            >{{ item.name }}
          </el-breadcrumb-item>
          <el-icon @click="handleClose(item)" :size="20"
            ><CircleClose
          /></el-icon>
        </div>
      </template>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        更多
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Refresh" @click="dropDownRefresh"
            >刷新</el-dropdown-item
          >
          <el-dropdown-item :icon="FullScreen" @click="dropDownMaximum"
            >最大化</el-dropdown-item
          >
          <el-dropdown-item divided :icon="Close" @click="dropDownAllTab"
            >关闭所有</el-dropdown-item
          >
          <el-dropdown-item :icon="Close" @click="dropDownCurrentTab"
            >关闭当前</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from "vue";
  import {
    ArrowRight,
    Refresh,
    Close,
    FullScreen,
  } from "@element-plus/icons-vue";
  import { useThemeStore } from "@/store/theme/theme";
  import localCache from "@/utils/cache";
  interface IBreadcrumb {
    name: string;
    path?: string;
  }
  type IBreadcrumbList = PropType<IBreadcrumb[]>;

  const props = defineProps({
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default() {
        return [];
      },
    },
  });
  const themeStore = useThemeStore();
  const emits = defineEmits(["delCrumb"]);
  const handleClose = (cur: any) => {
    emits("delCrumb", cur);
  };

  const dropDownRefresh = () => {};
  const dropDownMaximum = () => {
    themeStore.setMaxmum(!themeStore.themeConfig.maximize);
  };
  const dropDownCurrentTab = () => {};
  const dropDownAllTab = () => {};
</script>

<style scoped lang="scss">
  .nav-breadcrumb {
    padding: 10px 0px;
    box-shadow: 0 0 3px 3px #ccc;
    .crumb-wrapper {
      position: relative;
      padding: 5px 10px;
      :deep(.el-icon) {
        position: absolute;
        top: -5px;
        right: -15px;
        cursor: pointer;
      }
    }
    .el-icon {
      margin-left: 10px;
    }
  }
</style>
