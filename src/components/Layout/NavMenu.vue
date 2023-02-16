<template>
  <div id="nav-menu">
    <div class="logo">
      <div v-if="!isCollapse" class="title">mall-admin-system</div>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      router
      :uniqueOpened="true"
      :default-active="defaultMenu"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      @select="handleSelect"
    >
      <template v-for="item in menuList" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="hanldeIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children" :key="child.id + ''">
              <div class="flex-containe-row">
                <el-menu-item :index="child.url">
                  <el-icon>
                    <component :is="hanldeIcon(item.icon)"></component>
                  </el-icon>
                  {{ child.name }}</el-menu-item
                >
              </div>
            </template>
          </el-sub-menu>
        </template>
        <!-- <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template> -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon>
              <component :is="hanldeIcon(item.icon)"></component>
            </el-icon>
            {{ item.icon }}
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    onMounted,
    defineComponent,
    onUpdated,
    ref,
    watch,
    watchEffect,
    toRefs,
  } from "vue";
  import useMenuStore from "@/store/menu/index";
  import { useRouter, useRoute } from "vue-router";
  import { getActiveMenu } from "@/utils/map-menus";
  import localCache from "@/utils/cache";
  import { generateMunuMapping } from "@/utils/map-menus";
  import menu from "@/store/menu/index";
  import Mitt from "@/utils/mitt";

  const menuStore = useMenuStore();
  const menuList = computed(() => {
    return menuStore.menuList;
  });
  const hanldeIcon = (icon: string) => {
    let index = icon.lastIndexOf("-");
    icon = icon.slice(index + 1);
    let iconArr = icon.split("");
    let iconFirstLetter = icon.substring(0, 1).toUpperCase();
    iconArr[0] = iconFirstLetter;
    icon = iconArr.join("");
    return icon;
  };
  const props = defineProps({
    isCollapse: {
      type: Boolean,
      default: false,
    },
  });

  const { isCollapse } = toRefs(props);

  const route = useRoute();

  const currentRoute = route.path;
  /*
         将当前点击的菜单和当前的路由对应起来
         当不刷新的时候，点击menu，页面显示对应的路由  无需手动匹配
         当刷新的时候，或者通过地址栏切换路由的时候 本质上都是当前的路由在变化 所以需要找到当前的路由项，对应的menu
         */

  let defaultMenu = ref<any>("");
  defaultMenu.value = getActiveMenu(menuStore.menuList, currentRoute)[0].value;
  /** 通过搜索跳转页面后 defaultmenu 值改变 */
  watch(route, (value: any) => {
    defaultMenu.value = getActiveMenu(menuStore.menuList, value.path)[0].value;
  });
  //defaultMenu 是  <el-menu-item index="2"> 的index属性
  // 将当前选择的菜单 存储到storage里面
  const handleSelect = (
    index: any,
    indexPath: any,
    item: any,
    routeResult: any
  ) => {
    localStorage.setItem("activeMenu", index);
    let clickedMenu = localCache.getCache("clickedMenuList");
    if (!clickedMenu) {
      clickedMenu = [];
    }
    let menuName = "";
    const mapping = generateMunuMapping();
    for (const key of Object.keys(mapping)) {
      if (mapping[key] === index) {
        menuName = key;
      }
    }
    const menuItem = clickedMenu.find((item: any) => item.name == menuName);
    if (!menuItem) {
      clickedMenu.push({ path: index, name: menuName });
      localCache.setCache("clickedMenuList", clickedMenu);
      Mitt.emit("initCrumbs", localCache.getCache("clickedMenuList"));
    }
  };
</script>

<style lang="scss">
  #nav-menu {
    height: 100%;
    background-color: #545c64;
    &.el-menu-vertical:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .title {
      color: #fff;
      padding-left: 50px;
      line-height: 44px;
    }
  }
</style>
<style lang="scss">
  #nav-menu {
    .el-menu {
      border-right: none;
    }
  }
</style>
