<template>
  <div class="login">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ElForm } from "element-plus";
  import { reactive, ref } from "vue";
  import localCache from "@/utils/cache";
  import { rules } from "../config";
  const account = reactive({
    name: "",
    password: "",
  });
  const formRef = ref<InstanceType<typeof ElForm>>();
  const emits = defineEmits(["loginPc"]);
  const login = async (isKeepPwd: string) => {
    formRef.value?.validate((res) => {
      if (res) {
        if (isKeepPwd === "记住密码") {
          localCache.setCache("name", account.name);
          localCache.setCache("pwd", encodeURIComponent(account.password));
        }
      } else {
        localCache.deleteCache("name");
        localCache.deleteCache("password");
      }
    });
    emits("loginPc", account);
  };
  defineExpose({ login });
</script>
