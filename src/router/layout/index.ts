export default [
  {
    path: "/layout/goods",
    name: "goods",
    children: [
      {
        path: "/layout/goods/addGoods",
        name: "addGoods",
        meta: {
          title: "商品添加",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },

        component: () => import("@/pages/layout/goods/addGoods.vue"),
      },
      {
        path: "/layout/goods/goodsList",
        name: "goodsList",
        meta: {
          title: "商品列表",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/goods/goodsList.vue"),
      },
      {
        path: "/layout/goods/addCategory",
        name: "addCategory",
        meta: {
          title: "商品分类",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/goods/addCategory.vue"),
      },
      {
        path: "/layout/goods/goodsBrands",
        name: "goodsBrands",
        meta: {
          title: "品牌管理",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/goods/goodsBrands.vue"),
      },
    ],
  },
  {
    path: "/layout/product",
    name: "product",
    children: [
      {
        path: "/layout/product/category",
        meta: {
          title: "商品类别",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        name: "category",
        component: () => import("@/pages/layout/product/category.vue"),
      },
      {
        path: "/layout/product/goods",
        name: "goods",
        meta: {
          title: "商品信息",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/product/goods.vue"),
      },
    ],
  },
  {
    path: "/layout/system",
    name: "system",
    children: [
      {
        path: "/layout/system/user",
        name: "user",
        meta: {
          title: "用户设置",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/system/user.vue"),
      },
      {
        path: "/layout/system/department",
        name: "department",
        meta: {
          title: "部门",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/system/department.vue"),
      },
      {
        path: "/layout/system/menu",
        name: "menu",
        meta: {
          title: "菜单信息",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/system/menu.vue"),
      },
      {
        path: "/layout/system/role",
        name: "role",
        meta: {
          title: "角色设置",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/system/role.vue"),
      },
    ],
  },
  {
    path: "/layout/sell",
    name: "sell",
    children: [
      {
        path: "/layout/sell/couponList",
        name: "couponList",
        meta: {
          title: "优惠券列表",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/sell/couponList.vue"),
      },
      {
        path: "/layout/sell/activity",
        name: "activity",
        meta: {
          title: "活动页面",
          hidden: true,
          roles: ["add", "edit", "delete"],
        },
        component: () => import("@/pages/layout/sell/activity.vue"),
      },
    ],
  },
];
