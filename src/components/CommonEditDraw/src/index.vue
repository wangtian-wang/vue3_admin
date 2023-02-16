<template>
  <div>
    <el-drawer
      v-model="isVisiable"
      :modal="modal"
      :show-close="showClose"
      :lock-scroll="lockScroll"
      @update:model-value="handleUpdateModelValue"
    >
      <template #header="{ titleId, titleClass }">
        <span>header slot</span>
      </template>
      <CommonForm
        :edit-item="curItem"
        :form-config="formConfig"
        @reset="handleReset"
        @validated="handleConfimEdit"
      >
      </CommonForm>
    </el-drawer>
    <div ref="divRef">test</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, inject } from "vue";
  import { CircleCloseFilled } from "@element-plus/icons-vue";
  import CommonForm from "@/components/CommonForm/src/index.vue";
  // const visible = ref(false);
  // v-bind 只能是具体的值
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    beforeClose: {
      type: Function,
      default(done: () => void) {
        return done;
      },
    },
    editKeys: {
      type: Object,
      default() {
        return {};
      },
    },
    formItems: {
      type: Array,
      default() {
        return [];
      },
    },
    curItem: {
      type: Object,
      default() {
        return {};
      },
    },
  });
  const formRef = ref();
  const divRef = ref();

  const formConfig = {
    formItems: props.formItems,
  };
  const emits = defineEmits(["update:modelValue", "editFinish"]);
  const emitItem = computed(() => {
    console.log("----- computed ----");
    return props.curItem;
  });
  const isVisiable = computed({
    get() {
      return props.modelValue;
    },
    set(value) {},
  });

  const handleUpdateModelValue = () => {
    emits("update:modelValue", !props.modelValue);
  };
  const handleConfimEdit = (formData: any) => {
    emits("editFinish", formData);
  };
  const handleReset = (formData: any) => {
    emits("editFinish", formData);
  };
</script>
