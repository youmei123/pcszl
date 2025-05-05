<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-09 15:29:45
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 17:26:02
 * @FilePath: \pcszl\src\components\ProductItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="product-item f-ac">
    <div class="product-poster f-shrink0">
      <img v-if="data.courseCoverImg" :src="data.courseCoverImg" alt="poster" />
    </div>
    <div class="product-info fd-c f-ja">
      <div class="product-title u-line-1">{{ data.courseName }}</div>
      <div class="product-desc u-line-2"></div>
      <div class="product-bottom f-jb-ac">
        <div class="watch-count">播放量{{ transNumberToShort(data.playCount) }}</div>
        <div class="play-btn pointer" @click="linkplayvideo">立即播放</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { transNumberToShort } from "@/utiles/public";
const router = useRouter();
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const linkplayvideo = () => {
  router.push("coursevideo");
};
</script>

<style lang="scss" scoped>
.product-poster {
  width: 240px;
  height: 134px;
  border-radius: 10px;
  background-color: util.$ThemeColors;
  overflow: hidden;
}
.product-poster img {
  width: 100%;
  height: 100%;
}
.product-info {
  margin-left: 10px;
  height: 134px;
  width: 300px;
}
.product-title {
  font-size: 18px;
  font-weight: bold;
}
.product-desc {
  font-size: 16px;
  color: #999999;
  line-height: 24px;
}
.watch-count {
  font-size: 16px;
  color: #ce9433;
}
.play-btn {
  width: 90px;
  height: 40px;
  border-radius: 20px;
  background-color: util.$ThemeColors;
  text-align: center;
  line-height: 40px;
}
</style>
