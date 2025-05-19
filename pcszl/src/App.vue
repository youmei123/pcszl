<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 09:32:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 17:28:42
 * @FilePath: \pcszl\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { ElConfigProvider } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import LoginPopup from "@/components/LoginPopup/index.vue";
import { useModalStore } from "@/store/loginStore";

const modalStore = useModalStore();
const isRouteLoading = ref(false);
const router = useRouter();
const route = useRoute();
const isshowLogin = ref(false);
watch(
  () => modalStore.isLoginVisible,
  (newVal) => {
    console.log(newVal);
  }
);

//让路由切换刷新时，Header和Footer让其与路由同步显示
router.afterEach((to, from, next) => {
  isRouteLoading.value = true;
});
</script>

<template>
  <el-config-provider :locale="zhCn" :zIndex="6000" >
    <Header v-if="isRouteLoading" />
    <router-view v-slot="{ Component }" :key="route.fullPath">
      <transition name="fade-right" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer v-if="isRouteLoading" />
  </el-config-provider>
  <LoginPopup />
</template>

<style lang="scss">
body {
  --ThemeColors: #{util.$ThemeColors}; //将scss变量转换成css变量
}
#app {
  // overflow-x: hidden;
  color: #212930;
  font-size: 16px;
  min-height: 500px;
}
@import "@/assets/icons/iconfont.css";

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
