<template>
  <div class="login-container">
    <div class="login-panel">
      <h1 class="title">一点商城管理系统</h1>
      <el-tabs type="border-card" stretch v-model="currentTab">
        <el-tab-pane name="pc">
          <template #label>
            <span><i class="el-icon-user-solid"></i> 账号登录</span>
          </template>
          <login-pc ref="pcRef" @login-pc="loginWithPc"></login-pc>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
          </template>
          <login-phone
            ref="phoneRef"
            @phone-login="loginWithPhone"
          ></login-phone>
        </el-tab-pane>
      </el-tabs>
      <div class="input-wrapper">
        <el-radio-group v-model="KeepPassWard" @change="handleKeepPassWard">
          <el-radio label="记住密码"></el-radio>
          <el-radio label="暂不记住密码"></el-radio>
        </el-radio-group>
        <el-button
          type="primary"
          class="login-btn"
          @click.stop="handleLoginClick"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, reactive, ref } from "vue";
  import LoginPc from "./platform/login-pc.vue";
  import LoginPhone from "./platform/login-phone.vue";
  import useMenuStore from "@/store/menu/index";
  const menuStore = useMenuStore();
  const KeepPassWard = ref("记住密码");
  const pcRef = ref<InstanceType<typeof LoginPc>>();
  const phoneRef = ref<InstanceType<typeof LoginPhone>>();
  //todo  如何检测当前的客户端是 PC 还是手机
  const currentTab = ref("pc");
  const handleKeepPassWard = (e: any) => {
    KeepPassWard.value = e;
  };
  const handleLoginClick = () => {
    if (currentTab.value === "pc") {
      pcRef.value?.login(KeepPassWard.value);
    } else {
      phoneRef.value?.login(KeepPassWard.value);
    }
  };
  const loginWithPhone = (params: any) => {
    menuStore.getLogin(params);
  };
  const loginWithPc = (params: any) => {
    menuStore.getLogin(params);
  };
</script>

<style lang="scss" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url("@/assets/image/login/login-bg.svg");
  }
  .login-panel {
    width: 320px;
    margin-bottom: 100px;
    .el-tabs {
      border-radius: 0px 0px 10px 10px;
    }
    .title {
      text-align: center;
    }
    .input-wrapper {
      margin-top: 10px;
    }
    .login-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
