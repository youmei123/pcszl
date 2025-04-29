<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:28:42
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-29 14:27:39
 * @FilePath: \pcszl\src\views\usercenter\menuitem\mycourse\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="continue-bar f-jb-ac">
      <div class="f-ac">
        <div>上次观看至</div>
        <div class="continue-time">第二篇呼吸系统32:05</div>
      </div>
      <div>
        <div class="continue-btn f-jc-ac pointer">
          <el-icon :size="24"><CaretRight /></el-icon>继续观看
        </div>
      </div>
    </div>
    <div class="my-course-list">
      <MyCourseItem v-for="() in 6" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { CaretRight } from "@element-plus/icons-vue";
import MyCourseItem from "../mycourse/components/MyCourseItem.vue";
</script>

<style lang="scss" scoped>
.continue-bar {
  width: 100%;
  height: 60px;
  background: #fdf8e2;
  border-radius: 4px;
  padding: 0 25px;
  box-sizing: border-box;
}
.continue-btn {
  width: 110px;
  height: 36px;
  background: util.$ThemeColors;
  border-radius: 18px;
}
.continue-time {
  margin-left: 15px;
  color: #ce9433;
}
</style>
