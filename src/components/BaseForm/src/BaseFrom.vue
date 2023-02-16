<template>
  <div>
    <div class="form-header">
      <slot name="header"></slot>
    </div>
    <div class="form-content">
      <el-form
        ref="formRef"
        :label-position="labelPosition"
        :model="modelValue"
        :scroll-to-error="true"
      >
        <!-- <el-row :gutter="10">
         
        </el-row> -->
        <template v-for="item in formItems" :key="item.field">
          <!-- <el-col :span="4">
           
          </el-col> -->
          <el-form-item
            v-if="!item.isHidden"
            :label="item.label"
            :rules="item.rules ? item.rules : {}"
            :style="itemStyles"
            :prop="item.field"
          >
            <template v-if="item.type == 'text' || item.type == 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type == 'password'"
                v-model="modelValue[item.field]"
                v-bind="item.otherOptions"
                @input="changeModelValue($event, item.field)"
              >
              </el-input>
            </template>
            <template v-if="item.type == 'select'">
              <el-select
                style="width: 100%"
                :placeholder="item.placeholder"
                :style="item.cssStyle"
                v-model="modelValue[item.field]"
                @update:model-value="changeModelValue($event, item.field)"
              >
                <el-option
                  v-for="o in item.options"
                  :key="o.label"
                  :value="o.value"
                  :label="o.label"
                >
                </el-option>
              </el-select>
            </template>
            <template v-if="item.type == 'datepicker'">
              <el-date-picker
                type="datetimerange"
                :range-separator="item.otherOptions.separator"
                :placeholder="item.placeholder"
                :style="item.cssStyle"
                v-model="modelValue[item.field]"
                v-bind="item.otherOptions"
                @update:model-value="changeModelValue($event, item.field)"
              />
            </template>
            <template v-if="item.type == 'date'">
              <el-date-picker
                type="date"
                :placeholder="item.placeholder"
                :style="item.cssStyle"
                v-model="modelValue[item.field]"
                v-bind="item.otherOptions"
                @update:model-value="changeModelValue($event, item.field)"
              />
            </template>
            <template v-if="item.type == 'time'">
              <el-time-picker
                :placeholder="item.placeholder"
                :style="item.cssStyle"
                v-model="modelValue[item.field]"
                v-bind="item.otherOptions"
                @update:model-value="changeModelValue($event, item.field)"
              />
            </template>
            <template v-if="item.type == 'radio'">
              <el-radio-group
                v-model="modelValue[item.field]"
                v-bind="item.otherOptions"
                @update:model-value="changeModelValue($event, item.field)"
              >
                <el-radio
                  v-for="o in item.options"
                  :label="o.value"
                  :size="item.size || 'default'"
                  >{{ o.label }}</el-radio
                >
              </el-radio-group></template
            >
            <template v-if="item.type === 'radioGroup'">
              <el-radio-group
                v-model="modelValue[item.field]"
                v-bind="item.otherOptions"
                @update:model-value="changeModelValue($event, item.field)"
              >
                <template v-if="item.radioType === 'button'">
                  <el-radio-button v-for="o in item.options" :label="o.value"
                    >{{ o.label }}
                  </el-radio-button>
                </template>
                <template v-else>
                  <el-radio v-for="o in item.options" :label="o.value">{{
                    o.label
                  }}</el-radio>
                </template>
              </el-radio-group>
            </template>
            <template v-if="item.type === 'upload'">
              <BaseUpload
                upload-type="fileList"
                @img-upload-success="imgUploadSuccess"
                :auto-load="false"
              >
              </BaseUpload>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { FormInstance } from "element-plus";
  import BaseUpload from "@/components/BaseUpload/src/index.vue";
  import { IFromItem } from "../types/index";
  import { file } from "@babel/types";
  interface IBaseForm {
    formItems: IFromItem[];
    labelWidth?: string;
    colLayout?: any;
    itemStyles?: any;
    labelPosition?: any;
    title?: string;
    modelValue: any;
  }
  const props = withDefaults(defineProps<IBaseForm>(), {
    labelWidth: "100px",
    itemStyles: () => ({ padding: "10px 40px" }),
    labelPosition: "top",
    colLayout: () => () => ({
      xl: 6,
      lg: 1,
      md: 12,
      sm: 24,
      xs: 24,
    }),
    modelValue: {},
    formItems: () => [],
  });
  const formRef = ref<FormInstance>();
  const formValidate = () => {
    if (!formRef.value) return;
    formRef.value?.validate((valid, fields) => {
      if (valid) {
        emits("passValidate");
      } else {
        console.log("error submit!", fields);
      }
    });
  };
  const emits = defineEmits(["update:modelValue", "passValidate"]);
  const changeModelValue = (value: any, filed: string) => {
    emits("update:modelValue", { ...props.modelValue, [filed]: value });
  };
  const imgUploadSuccess = (file: any) => {};
  defineExpose({ formValidate });
</script>
