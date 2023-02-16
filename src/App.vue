<template>
  <div class="app">
    <ElConfigProvider :locale="locale">
      <router-view></router-view>
    </ElConfigProvider>
  </div>
</template>
<script setup lang="ts">
  import { ElConfigProvider } from "element-plus";
  import zhCn from "element-plus/es/locale/lang/zh-cn";
  import en from "element-plus/es/locale/lang/en";
  const locale = computed(() => {
    return zhCn;
  });
</script>

<style scoped lang="scss">
  .app {
    height: 100vh;
    #layout {
      height: 100%;
    }
  }
</style>
