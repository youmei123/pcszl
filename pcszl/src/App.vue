<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 09:32:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-24 15:49:17
 * @FilePath: \pcszl\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts"></script>

<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="fade-right" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Footer />
</template>

<style lang="scss">
#app {
  overflow-x: hidden;
  color: #212930;
  font-size: 16px
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
