<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 15:15:18
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-13 16:41:13
 * @FilePath: \pcszl\src\views\usercenter\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="user-center content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="f-jb-as">
        <el-affix :offset="155">
          <div class="left-menu-cont">
            <div
              class="menu-item f-ac pointer"
              v-for="(item, index) in menulist"
              @click="handswithcmenu(index)"
              :class="{ active: item.path === route.path }"
            >
              <div class="menu-text">{{ item.name }}</div>
            </div>
          </div>
        </el-affix>
        <div class="menu-view-cont">
          <router-view v-slot="{ Component }">
            <transition name="fade-right" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import usercenterroutelist from "@/router/modules/usercenter";
const router = useRouter();
const route = useRoute();
console.log(route);
// 创建路由类型
interface RouteConfig {
  path: string;
  name: string;
  meta: {
    title: string;
  };
  children?: RouteConfig[];
}

const processSingleRouteData = (route: RouteConfig) => {
  const result: { name: string; path: string }[] = [];
  if (route.children) {
    for (const childRoute of route.children) {
      result.push({
        name: childRoute.meta.title,
        path: `${route.path}/${childRoute.path}`,
      });
    }
  }
  return result;
};
const menulist = reactive(processSingleRouteData(usercenterroutelist[0]));
console.log(menulist);

const handswithcmenu = (index: number) => {
  router.push({
    path: menulist[index].path,
  });
};
</script>

<style lang="scss" scoped>
.user-center {
  padding: 20px 0;
  box-sizing: border-box;
}
.breadcrumb-cont {
  margin-bottom: 20px;
}
.left-menu-cont {
  width: 200px;
  padding: 15px 0;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 10px;
}
.menu-item {
  width: 100%;
  height: 48px;
  background-color: white;
  transition: background-color 0.3s ease;
}
.menu-text {
  font-size: 16px;
  color: rgba(33, 41, 48, 1);
  border-left: 4px solid #dbdbdb;
  padding-left: 7px;
  box-sizing: border-box;
  margin-left: 25px;
  transition: border-left 0.3s ease;
}
.active {
  background-color: util.$ThemeColors;
}
.active .menu-text {
  border-left: 4px solid #fb2b1e;
}
.menu-view-cont {
  width: 980px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
// 进入后和离开前保持原位
.fade-right-enter-to,
.fade-right-leave-from {
  opacity: 1;
  transform: none;
}

// 设置进入和离开过程中的动画时长0.5s
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.5s;
}

// 进入前和离开后为透明，并在右侧20px位置
.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
