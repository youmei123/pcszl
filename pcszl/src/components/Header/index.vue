<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 11:24:05
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-07 16:06:20
 * @FilePath: \pcszl\src\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-page-navbar f-ja-ac">
    <div class="logo-box">
      <img
        src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/7/2951187417718319454/logo.png"
        alt=""
      />
    </div>
    <div class="menu-list f-ja-ac">
      <div class="mebu-item" v-for="item in navMenuList">{{ item }}</div>
    </div>
    <div class="user-box f-ac">
      <div class="iconfont icon-sousuo"></div>
      <div class="iconfont icon-denglu"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const navMenuList = reactive([
  "首页",
  "全部课程",
  "特色疗法",
  "直播",
  "短视频",
  "百科",
  "商城",
  "关于我们",
  "联系我们",
]);
</script>

<style lang="scss" scoped>
.home-page-navbar {
  width: 100%;
  background-color: rgba(252, 220, 70, 0.1);
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 5;
}
.logo-box {
  width: 210px;
  height: 51px;
}
.logo-box img {
  width: 100%;
  height: 100%;
}
.menu-list {
  max-width: 1200px;
  width: 100%;
}
.mebu-item {
  color: #212930;
  font-size: 18px;
  cursor: pointer;
}
.user-box .iconfont {
  font-size: 28px;
}
.user-box div {
  cursor: pointer;
}
.icon-sousuo {
  margin-right: 40px;
}
</style>
