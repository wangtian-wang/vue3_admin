<template>
  <div class="error-page flex-container-row">
    <img :src="notFoundImg" alt="页面不见了~~" />
    <h1>
      抱歉，您要访问的页面不见了~~~
      <el-button type="primary" @click="goPrevPage">返回上个页面</el-button>
    </h1>
  </div>
</template>

<script lang="ts" setup>
  import notFoundImg from "@/assets/notFound.png";
  import { useRouter } from "vue-router";
  const router = useRouter();
  const goPrevPage = () => {
    router.go(-1);
  };
</script>
<style scoped lang="scss">
  .error-page {
    height: 100%;
  }
</style>
