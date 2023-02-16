<template>
  <div class="add-goods-container">
    <CommonTable
      :table-config="tableConfig"
      :page-name="pageName"
    ></CommonTable>
    <el-button type="primary">点击</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { tableConfig } from "./config/addGoodsTable";
  import CommonTable from "@/components/CommonTable/src/index.vue";
  const pageName = "addGoods";
</script>
