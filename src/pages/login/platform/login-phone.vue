<template>
  <el-form label-width="100px" ref="formRef" :rules="rulesPhone" :model="phone">
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn" @click="getVerifyCode"
          >获取验证码</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { ElForm } from "element-plus";
  import { reactive, ref } from "vue";
  import { rulesPhone } from "../config";
  import localCache from "@/utils/cache";
  const formRef = ref<InstanceType<typeof ElForm>>();
  const phone = reactive({
    num: "",
    code: "",
  });

  const emits = defineEmits(["phoneLogin"]);
  const login = (isKeepPwd: string) => {
    formRef.value?.validate((res) => {
      if (res) {
        if (isKeepPwd === "记住密码") {
          localCache.setCache("phoneNumber", phone.num);
        }
      } else {
        localCache.deleteCache("phoneNumber");
      }
      emits("phoneLogin", phone);
    });
  };

  defineExpose({ login });
</script>

<style lang="scss">
  .get-code {
    display: flex;
  }

  .get-btn {
    margin-left: 8px;
  }
</style>
