<template>
  <div id="table-container">
    <div class="table-header">
      <!-- 显示操作按钮以及其他内容区域 -->
      <slot name="header"></slot>
      <slot name="headerBtns"></slot>
    </div>
    <div class="table-content">
      <el-table
        tooltip-effect="light"
        :data="tableData"
        :height="tableHeight"
        :border="border"
        v-bind="childrenProps"
        @select-all="handleSelectChange"
      >
        <el-table-column
          v-if="showIndex"
          type="index"
          width="50"
          label="序号"
          align="center"
        >
        </el-table-column>

        <!-- 展示选择的 对号图标 -->
        <el-table-column v-if="showSelection" type="selection" width="55">
        </el-table-column>
        <!-- 自定义表头  只要是表格中的列 每一列都会拿到表格的数据-->
        <el-table-column v-if="showCustomHeader">
          <template #header>
            <h1>我是自定义表头</h1>
          </template>
          <template #default="scope">
            <span>{{ scope.row.gender }}</span>
          </template>
        </el-table-column>
        <template v-for="item in tableList" :key="item.prop">
          <el-table-column v-bind="item" align="center" show-overflow-tooltip>
            <template #default="scope">
              <slot :name="item.slotName" :row="scope.row">
                {{ scope.row[item.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="table-footer">
      <!--  默认显示 分页 假设上级组件调用 $slots.defalut -->
      <slot v-if="$slots.default">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          :layout="tableLayout"
          :total="listCount"
        >
        </el-pagination>
      </slot>
      <slot name="footer" v-if="$slots.footer">
        <p>footer content</p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { props as prop } from "./props";
  const props = defineProps(prop);
  const emits = defineEmits(["selectionChange", "update:page"]);

  const handleCurrentChange = (val: any) => {
    emits("update:page", { ...props.page, currentPage: val });
  };
  const handleSizeChange = (val: number) => {
    emits("update:page", { ...props.page, pageSize: val });
  };
  const handleSelectChange = (val: number) => {
    emits("selectionChange", val);
  };
</script>
