<template>
  <div id="user-info ml-10">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="default"
          fit="fill"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span class="ml-10">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout"
            ><el-icon><CircleClose /></el-icon>退出登录</el-dropdown-item
          >
          <el-dropdown-item divided
            ><el-icon><User /></el-icon>用户信息</el-dropdown-item
          >
          <el-dropdown-item>
            <el-icon><Operation /></el-icon>系统管理</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import localCache from "@/utils/cache";

  import { useRouter } from "vue-router";

  const router = useRouter();
  const name = computed(() => {
    // store.state.login.userInfo.name
    return "admin";
  });

  const handleLogout = () => {
    localCache.deleteCache("token");
    localCache.deleteCache("userInfo");
    localCache.deleteCache("userMenu");
    router.push("/login");
  };
</script>

<style lang="scss" scoped>
  #user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    box-sizing: border-box;
  }
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
</style>
