export interface TableCellItem {
  prop?: string;
  label?: string;
  minWidth?: string | number;
  slotName?: string;
}
export interface TableConfig {
  title?: string;
  showIndex?: boolean;
  showSelection?: boolean;
  tableList: TableCellItem[];
}
export const tableConfig = {
  title: "测试表格",
  showIndex: true,
  showSelection: true,
  showCustomHeader: false, //控制是否显示自定义表头
  tableList: [
    {
      prop: "name",
      label: "用户名",
      minWidth: "120px",
      editable: true,
    },
    {
      prop: "realname",
      label: "真实姓名",
      minWidth: "100",
      editable: true,
    },
    {
      prop: "cellphone",
      label: "手机号码",
      minWidth: "100",
      editable: true,
    },
    {
      prop: "gender",
      label: "性别",
      minWidth: "100",
    },
    {
      prop: "enable",
      label: "状态",
      minWidth: "100",
      slotName: "status",
    },
    {
      prop: "createTime",
      label: "创建时间",
      minWidth: "250",
      slotName: "createAt",
    },
    {
      prop: "updateTime",
      label: "更新时间",
      minWidth: "250",
      slotName: "updateAt",
    },
    {
      prop: "avatar",
      label: "头像",
      minWidth: "200",
      slotName: "image",
      editable: true,
    },
    {
      label: "操作",
      minWidth: "250",
      slotName: "handler",
    },
  ],
};
