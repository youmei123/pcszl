<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-11 16:03:51
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-12 09:22:21
 * @FilePath: \pcszl\src\views\course\components\Video\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div id="xgplayer"></div>
    <VideoActionBar />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import VideoActionBar from "../VideoActionBar/index.vue";
import Player from "xgplayer";
import HlsPlugin from "xgplayer-hls";
import "xgplayer/dist/index.min.css";
onMounted(() => {
  const xgplayer = new Player({
    id: "xgplayer",
    width: "840px",
    height: "473px",
    lang: "zh-cn",
    plugins: [HlsPlugin],
  });
});
</script>

<style lang="scss" scoped></style>
