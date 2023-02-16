<template>
  <div>
    <CommonForm
      :formConfig="formConfig"
      :formHeader="'条件查询'"
      @reset="resetForm"
      @search="formSearch"
    ></CommonForm>
  </div>
</template>

<script lang="ts" setup>
  import { formConfig } from "./config/goodsList";
  import CommonForm from "@/components/CommonForm/src/index.vue";

  const resetForm = (e: Event, value: any) => {};
  const formSearch = (e: Event, value: any) => {};
</script>
