<template>
  <div id="common-table-container">
    <BaseTable
      v-bind="tableConfig"
      v-model="pageInfo"
      :table-data="pageTableData"
      :list-count="pageSizeCount"
    >
      <template #header>
        <h1>{{}} header <title></title></h1>
      </template>
      <template #headerBtns v-if="showHeaderButton">
        <div class="btn-container">
          <div class="btn-button">
            <el-button
              v-if="usePermission('add')"
              type="primary"
              :size="'default'"
              @click="handleCreate"
            >
              <el-icon><CirclePlus /></el-icon>
              新建用户
            </el-button>
            <el-button type="primary" :size="'default'" @click="handleCreate">
              <el-icon><Download /></el-icon>
              导出用户
            </el-button>
            <el-button type="primary" :size="'default'" @click="handleCreate">
              <el-icon><Check /></el-icon>
              批量筛选
            </el-button>
            <el-button type="primary" :size="'default'" @click="handleCreate">
              <el-icon><Delete /></el-icon>
              批量删除
            </el-button>
          </div>
          <div class="btn-status">
            <el-button :icon="Search" circle />
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="success" :icon="Refresh" circle />
            <el-button type="info" :icon="Message" circle />
            <el-button type="warning" :icon="Star" circle />
            <el-button type="danger" :icon="Delete" circle />
          </div>
        </div>
      </template>
      <template #status="scope">
        <el-button
          plain
          :size="'small'"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ timeFormatter(scope.row.createTime) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ timeFormatter(scope.row.updateTime) }}</span>
      </template>
      <template #handler="scope">
        <el-button
          v-if="usePermission('edit')"
          :icon="EditPen"
          size="small"
          type="primary"
          @click="handleEdit(scope.row)"
        >
          编辑</el-button
        >
        <el-button
          v-if="usePermission('delete')"
          :icon="Delete"
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
      <template
        v-for="other in otherPropsSlots"
        :key="other.prop"
        #[other.slotName]="scope"
      >
        <slot :name="other.slotName" :row="scope.row">
          <img :src="scope.row.avatar" :style="imgStyle" />
        </slot>
      </template>
      <!-- 不新增加内容的话 默认显示分页组件 -->
      <template #default></template>
    </BaseTable>
    <CommonEditDraw
      v-model="visible"
      ref="drawRef"
      :edit-keys="editableKeys"
      :form-items="formItems"
      :cur-item="curEditItem"
      @edit-finish="confirmEdit"
    ></CommonEditDraw>
  </div>
</template>

<script lang="ts" setup>
  import { provide } from "vue";
  import BaseTable from "@/components/BaseTable/src/index.vue";
  import CommonEditDraw from "@/components/CommonEditDraw/src/index.vue";
  import { useGetData } from "@/hooks/useGetdata";
  import { usePermission } from "@/hooks/usePermission";
  import { findEdiableKey } from "@/utils/index";
  import { handleGenerateFormConfig } from "../config/formConfig";
  import {
    Check,
    Delete,
    Edit,
    EditPen,
    Message,
    Refresh,
    Search,
    Star,
  } from "@element-plus/icons-vue";
  const props = defineProps({
    tableConfig: {
      type: Object,
      require: true,
    },
    pageName: {
      type: String,
      require: true,
    },
    showHeaderButton: {
      type: Boolean,
      default: true,
    },
    imgStyle: {
      type: Object,
      default: () => ({
        width: 150 + "px",
        height: 100 + "px",
      }),
    },
  });

  const visible = ref(false);
  const drawRef = ref<any>(null);
  watch(visible, (value) => {});
  /**
   * 分页器的页码 和 数量
   */

  const pageInfo = ref({ curPage: 1, pageSize: 10 });
  const keys = findEdiableKey(props.tableConfig);
  const editableKeys = reactive(keys);
  const formItems = handleGenerateFormConfig(props.tableConfig?.tableList);
  //   console.log(rowItem);
  let pageTableData: any = ref([]);
  let pageSizeCount: any;
  watch(pageInfo, (val) => {
    getData();
  });
  const getData = async () => {
    const { dataList, totalCount } = await useGetData({
      url: "src/mock/addGoods.json",
      showLoading: true,
      size: pageInfo.value.pageSize,
      page: pageInfo.value.curPage,
      methods: "post",
    });
    pageTableData.value = dataList.value;
    pageSizeCount = totalCount;
  };
  getData();
  const handleCreate = () => {};
  const timeFormatter = (time: string) => {
    return time;
  };
  let curEditItem = reactive({});
  const handleEdit = (item: any) => {
    for (const key in item) {
      curEditItem[key] = item[key];
    }
    console.log(curEditItem, "curEditItem");
    visible.value = true;
  };
  const handleDelete = (content: any) => {};

  /**动态获取其他特别的插槽 可以提供父组件使用的插槽 */
  let otherPropsSlots = props.tableConfig?.tableList.filter(
    (item: any) => item.slotName === "image" || item.slotName === "oldPrice"
  );
  const confirmEdit = (formData: any) => {
    for (const key in formData) {
      if (curEditItem.hasOwnProperty(key)) {
        curEditItem[key] = formData[key];
      }
    }
    // 拿到已经编辑好的信息 发送给后台
  };
</script>
<style lang="scss" scoped>
  .btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
</style>
