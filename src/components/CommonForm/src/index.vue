<template>
  <div>
    <BaseFrom
      v-model="formData"
      v-bind="formConfig"
      ref="baseformRef"
      @pass-validate="formValidate"
    >
      <template #header>
        <h1>{{ formHeader }}</h1>
      </template>
      <template #footer>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleResetForm">重置</el-button>
          <el-button type="primary" @click="handleSearchForm">搜索</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </template>
    </BaseFrom>
  </div>
</template>

<script lang="ts" setup>
  import BaseFrom from "@/components/BaseForm/src/BaseFrom.vue";
  import { ref, reactive, watch } from "vue";
  import type { FormInstance } from "element-plus";
  const props = defineProps({
    formConfig: {
      type: Object,
      require: true,
    },
    formHeader: {
      type: String,
      require: true,
    },
    editItem: {
      type: Object,
      default: () => {},
    },
  });
  const formData: any = reactive({});
  const baseformRef = ref<FormInstance>();

  const initFormData = () => {
    const originForm = props.formConfig?.formItems ?? [];
    for (const item of originForm) {
      formData[item.field] = "";
    }
  };
  initFormData();
  watch(
    () => props.editItem,
    (newValue, oldValue) => {
      for (const key in formData) {
        formData[key] = newValue?.[key] || "";
      }
    },
    {
      deep: true,
      immediate: true,
    }
  );
  const emits = defineEmits(["reset", "search", "validated"]);

  const handleResetForm = (e: Event) => {
    for (const key in formData) {
      formData[key] = "";
    }
    emits("reset", formData); // 因为重置完原始数据后，重新打开draw父组件传过来的数据没有发生变化。所以watch 监听不到，必须重置原始数据
  };
  const handleSearchForm = (e: Event) => {
    emits("search", formData);
  };
  // 表单提交
  const handleSubmit = () => {
    baseformRef.value?.formValidate();
  };
  // 表单校验完成 可以发送接口请求数据
  const formValidate = () => {
    emits("validated", formData);
  };

  defineExpose({});
</script>
<style scoped lang="scss">
  .btn-wrapper {
    display: flex;
    padding-right: 1%;
    justify-content: flex-end;
    align-items: center;
  }
</style>
