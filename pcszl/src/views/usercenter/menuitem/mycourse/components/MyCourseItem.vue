<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-29 13:47:40
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-12 17:31:19
 * @FilePath: \pcszl\src\views\usercenter\menuitem\mycourse\components\MyCourseItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="my-course-item f-ac">
      <div class="item-poster-box f-shrink0">
        <img :src="data.courseCoverImg" />
      </div>
      <div class="my-course-info fd-c f-jb">
        <div class="info-bar">
          <div class="my-course-name">{{ data.courseName }}</div>
          <div class="my-course-desc u-line-2">
            {{ data.courseSimpleDescription }}
          </div>
        </div>
        <div class="f-jb-ac">
          <div class="progress" v-if="data.schedule">已看{{ data.schedule }}%</div>
          <div class="progress" v-else>未看</div>
          <div class="continue-btn pointer" v-if="data.schedule && data.schedule > 0">
            继续学习
          </div>
          <div class="continue-btn pointer" v-else>开始学习</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { MyCourseType } from "@/utiles/types";
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.my-course-item {
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
}
.item-poster-box {
  width: 267px;
  height: 150px;
  background: util.$ThemeColors;
  border-radius: 10px;
  overflow: hidden;
}
.item-poster-box img {
  width: 100%;
  height: 100%;
}
.my-course-info {
  height: 150px;
  padding: 10px 0;
  box-sizing: border-box;
  margin-left: 20px;
  width: 100%;
}
.my-course-name {
  font-size: 20px;
  font-weight: bold;
}
.my-course-desc {
  color: #999999;
  margin-top: 15px;
}
.continue-btn {
  width: 110px;
  height: 40px;
  background: #fdf8e2;
  border-radius: 20px;
  border: 1px solid #ce9433;
  color: #ce9433;
  text-align: center;
  line-height: 40px;
}
.progress {
  color: #ce9433;
}
</style>
