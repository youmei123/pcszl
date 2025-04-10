<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-09 15:55:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-10 15:25:59
 * @FilePath: \pcszl\src\components\FeatureZoneItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="featurezone-item"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <img />
    <div class="svip-icon">svip专属</div>
    <div class="shad-cover f-ae" v-if="isshow">
      <div class="shad-cont">
        <div class="featurezone-title">妙手罗老师</div>
        <div class="featurezone-desc u-line-2">
          师芝林书院院长，中师传承中医药究院名誉院长点穴复位非目创师芝林书院院长，中师传承中医药究院名誉院...
        </div>
        <div class="featurezone-bottom f-jb-ac">
          <div class="featurezone-watchcount">播放量940.3万</div>
          <div class="play-btn pointer">立即了解</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isshow = ref(false);
const handleMouseEnter = () => {
  console.log("鼠标移入");
  isshow.value = true;
  console.log(isshow.value);
};

const handleMouseLeave = () => {
  console.log("鼠标移出");
  isshow.value = false;
  console.log(isshow.value);
};
</script>

<style lang="scss" scoped>
.featurezone-item {
  width: 560px;
  height: 307px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  background-color: util.$ThemeColors;
}
.featurezone-item img {
  width: 100%;
  height: 100%;
}
.svip-icon {
  width: 90px;
  height: 34px;
  background: linear-gradient(90deg, #ea4109, #f99202);
  border-radius: 4px 14px 4px 14px;
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff5e5;
  font-size: 16px;
  text-align: center;
  line-height: 34px;
}
.shad-cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.8)
  );
}
.shad-cover {
  padding: 25px;
  box-sizing: border-box;
  color: white;
}
.featurezone-title {
  font-size: 18px;
  font-weight: bold;
}
.featurezone-desc {
  font-size: 16px;
  height: 41px;
  margin: 15px 0;
}
.featurezone-watchcount {
  font-size: 16px;
}
.play-btn {
  width: 90px;
  height: 30px;
  border-radius: 15px;
  font-size: 16px;
  color: #212930;
  background-color: util.$ThemeColors;
  text-align: center;
  line-height: 30px;
}
</style>
