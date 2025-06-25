<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-10 15:45:29
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-06-16 09:55:17
 * @FilePath: \pcszl\src\views\encyclopedia\consilia\consiliadetail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="consiliadetail-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/encyclopedia' }">百科</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/consilia' }">名家医案</el-breadcrumb-item>
          <el-breadcrumb-item>1111</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="consiliadetail-content">
        <div class="page-title">
          <div>桂枝汤治疗颈椎病</div>
          <div class="page-title-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 30px 0;
  box-sizing: border-box;
}
.consiliadetail-content {
  padding: 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
}
.page-title {
  font-weight: bold;
  font-size: 26px;
  color: #212930;
  position: relative;
}
.page-title div:first-child{
  position: relative;
  z-index: 10;
}
.page-title-icon {
  position: absolute;
  left: -7px;
  bottom: -4px;
  width: 22px;
  height: 22px;
  background: #fcdc46;
  z-index: 5;
}
</style>
