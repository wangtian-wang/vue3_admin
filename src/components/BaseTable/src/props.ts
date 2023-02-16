export const props = {
  title: {
    type: String,
    default: "表格标题",
  },
  tableLayout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  border: {
    type: Boolean,
    default: true,
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  tableList: {
    type: Array,
    default: () => [],
  },
  tableHeight: {
    type: String,
    default: "300px",
  },
  showIndex: {
    type: Boolean,
    default: false,
  },
  showSelection: {
    type: Boolean,
    default: true,
  },
  showCustomHeader: {
    type: Boolean,
    default: false,
  },
  childrenProps: {
    type: Object,
    default: () => {},
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 }),
  },
  listCount: {
    type: Number,
    default: 0,
  },
};
