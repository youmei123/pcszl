<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-11 15:51:36
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 17:06:29
 * @FilePath: \pcszl\src\views\home\components\SpecialColumn\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="module-cont">
    <div class="module-title-bar f-jb-ac">
      <div class="m-title-left f-ae">
        <div class="m-title">{{ title }}</div>
        <div class="iconfont icon-sangejiantou-right"></div>
      </div>
      <div class="m-title-right">{{ desc }}</div>
    </div>
    <slot></slot>
    <div class="more-btn pointer f-jc-ac" @click="$emit('btnchange',title)" >
      <div class="f-ac" style="margin-top: 12px">
        {{ moretext }}
        <div class="iconfont" :class="moreicon"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  moretext: {
    type: String,
    default: "查看更多",
  },
  moreicon: {
    type: String,
    default: "icon-huanyihuan",
  },
  title: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.module-title-bar {
  width: 100%;
  margin-bottom: 20px;
}
.m-title {
  font-size: 30px;
  font-weight: bold;
}
.m-title-left .iconfont {
  font-size: 24px;
  margin-left: 10px;
  transform: translateY(10%);
}
.m-title-right {
  color: #ce9433;
  font-size: 16px;
}
.more-btn {
  width: 209px;
  height: 74px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/9/4334976739655543468/btn_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 0 auto;
  color: white;
  font-size: 16px;
  margin-top: 15px;
  padding-right: 20px;
  box-sizing: border-box;
  line-height: 74px;
}

.more-btn .iconfont {
  margin-left: 5px;
}

.module-cont {
  max-width: 1200px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
}
</style>
