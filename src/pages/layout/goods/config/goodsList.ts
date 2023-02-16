export const formConfig = {
  labelWidth: "120px",
  formItems: [
    {
      field: "name",
      type: "text",
      label: "角色名称",
      placeholder: "请输入角色名称",
      rules: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: ["change"],
        },
        {
          min: 3,
          max: 10,
          message: "Length should be 3 to 5",
          trigger: ["blur"],
        },
      ],
    },
    {
      field: "intro",
      type: "text",
      label: "权限介绍",
      placeholder: "请输入权限介绍",
      rules: [
        {
          required: true,
          message: "Please input email address",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Please input correct email address",
          trigger: ["blur", "change"],
        },
      ],
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
        separator: "~",
      },
    },
    {
      field: "category",
      type: "select",
      label: "商品分类",
      options: [
        {
          value: "phone",
          label: "手机",
        },
        {
          value: "ipad",
          label: "平板",
        },
        {
          value: "tv",
          label: "电视",
        },
      ],
    },

    {
      field: "time",
      type: "time",
      label: "选择时间",
      otherOptions: {
        isRange: true,
        arrowControl: true,
      },
      cssStyle: {
        width: 100 + "%",
      },
    },
    {
      field: "datetime",
      type: "date",
      label: "选择日期",
      cssStyle: {
        width: 100 + "%",
      },
      otherOptions: {
        format: "YYYY/MM/DD",
        clearable: true,
        defaultValue: new Date(),
      },
    },
    {
      field: "goodsState",
      type: "radioGroup",
      label: "商品状态",
      options: [
        {
          value: "onsell",
          label: "上架",
        },
        {
          value: "new",
          label: "新品",
        },
        {
          value: "offsell",
          label: "下架",
        },
      ],
      otherOptions: {
        size: "large",
        disabled: false,
        border: true,
        fill: "#ccc",
        textColor: "blue",
      },
      radioType: "button",
    },
    {
      field: "goodsCheckState",
      type: "radio",
      label: "商品审核状态",
      options: [
        {
          value: "onsell",
          label: "上架",
        },
        {
          value: "new",
          label: "新品",
        },
        {
          value: "offsell",
          label: "下架",
        },
      ],
      otherOptions: {
        disabled: false,
        border: true,
      },
      size: "large",
    },
    {
      field: "avatar",
      type: "upload",
      label: "头像",
    },
  ],
};
