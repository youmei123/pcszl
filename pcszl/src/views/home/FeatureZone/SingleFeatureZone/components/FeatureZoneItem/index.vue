<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-06 16:59:07
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-06 17:08:32
 * @FilePath: \pcszl\src\views\home\FeatureZone\SingleFeatureZone\components\FeatureZoneItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="feature-zone-item">
    <div class="feature-zone-item-img">
      <img />
      <div class="svip-icon">svip专属</div>
    </div>
    <div class="feature-zone-bottom-bar fd-c f-jb">
      <div class="feature-zone-title">妙手罗老师</div>
      <div class="feature-zone-desc u-line-2">
        师芝林书院院长，中师传承中医药究院名誉院长点穴复位非目创师芝林书院院长，中师传承中医药究院名誉院...
      </div>
      <div class="f-jb-ac">
        <div class="watch-num">播放量20万</div>
        <div class="btn-more pointer">立即了解</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { transNumberToShort } from "@/utiles/public";
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.feature-zone-item {
  width: 800px;
  margin: 0 auto;
}
.feature-zone-item-img {
  width: 100%;
  height: 450px;
  background-color: util.$ThemeColors;
  border-radius: 16px 16px 0px 0px;
  border: 1px solid #dddddd;
  position: relative;
  overflow: hidden;
}

.feature-zone-item-img img {
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
.feature-zone-bottom-bar {
  width: 100%;
  height: 150px;
  background: #ffffff;
  border-radius: 0px 0px 16px 16px;
  border: 1px solid #dddddd;
  padding: 20px;
  box-sizing: border-box;
}
.feature-zone-title {
  font-size: 18px;
  font-weight: bold;
}
.feature-zone-desc {
  color: #999999;
}
.watch-num {
  color: #ce9433;
}
.btn-more {
  width: 90px;
  height: 40px;
  background-color: util.$ThemeColors;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
}
</style>
