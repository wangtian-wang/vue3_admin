<template>
  <div class="search-dialog">
    <el-dialog
      v-model="showDialog"
      :modal="false"
      fullscreen
      :show-close="false"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      @click.stop="dialogClick"
    >
      <el-autocomplete
        v-model="searchKey"
        ref="inputRef"
        placeholder="菜单搜索 ：支持菜单名称、路径"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelect"
        @click.stop
      >
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
        <template #default="{ item }">
          <el-icon>
            <component :is="item.meta.icon || ElementPlus"></component>
          </el-icon>
          <span> {{ item.meta.title }} {{ item.meta.icon }}</span>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ElementPlus } from "@element-plus/icons-vue";
  import { watch, nextTick } from "vue";
  import { useRouter } from "vue-router";
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(["update:modelValue"]);
  const inputRef = ref();
  const showDialog = computed(() => {
    return props.modelValue;
  });
  const dialogClick = () => {
    emits("update:modelValue", !props.modelValue);
  };

  const router = useRouter();
  const routes = reactive(router.getRoutes());

  const menuList = computed(() => {
    return routes.filter((item) => !item.meta.isHidden);
  });
  const searchKey = ref("");
  const querySearchAsync = (queryStr: string) => {
    return queryStr
      ? menuList.value.filter((item: any) => item.path.includes(queryStr))
      : menuList.value;
  };
  const handleSelect = (route: any) => {
    if (route && route.meta.isLink) {
      window.open(route.meta.isLink);
    } else {
      router.push(route.path);
    }
    searchKey.value = "";
    emits("update:modelValue", false);
  };
  watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        nextTick(() => {
          inputRef.value?.focus();
        });
      }
    },
    {
      immediate: true,
    }
  );
  defineExpose({ searchKey });
</script>
<style scoped lang="scss">
  /* 菜单搜索样式 */
  .search-dialog {
    :deep(.el-dialog) {
      background: rgb(0 0 0 / 50%);
      border-radius: 0 !important;
      box-shadow: unset !important;
      .el-dialog__header {
        border-bottom: none !important;
      }
    }
    :deep(.el-autocomplete) {
      position: absolute;
      top: 100px;
      left: 50%;
      width: 550px;
      transform: translateX(-50%);
      .el-input__wrapper {
        background-color: var(--el-bg-color);
      }
    }
  }
  .el-autocomplete__popper {
    .el-icon {
      position: relative;
      top: 2px;
      font-size: 16px;
    }
    span {
      margin: 0 0 0 10px;
      font-size: 14px;
    }
  }
</style>
