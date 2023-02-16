<template>
  <div id="layout">
    <el-container class="page-container">
      <el-aside
        v-if="!showMenu"
        :width="isCollapse ? '50px' : '200px'"
        style="background-color: aquamarine"
      >
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="main-page">
        <el-header>
          <nav-header @fold-change="foldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import NavHeader from "@/components/Layout/NavHeader.vue";
  import { useThemeStore } from "@/store/theme/theme";
  const isCollapse = ref(false);
  const foldChange = (isFold: boolean) => {
    isCollapse.value = isFold;
  };

  const themeStore = useThemeStore();
  const showMenu = computed(() => themeStore.themeConfig.maximize);
</script>
<style lang="scss" scoped>
  #layout {
    :deep(.el-main) {
      overflow: hidden;
      padding: 0;
      margin-top: 40px;
      box-shadow: 0 0 3px 0px #ccc;
    }
    .el-header {
      padding: 0;
    }
    .page-content {
    }
    .page-info {
      height: calc(100vh - 60px);
      overflow-y: scroll;
      div:nth-child(1) {
        height: 100%;
      }
    }
  }
</style>
