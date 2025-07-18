<template>
  <div class="page-container">
    <div class="detail-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/encyclopedia' }">百科</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="detail-content">
        <!-- 中成药 -->
        <div v-if="Number(route.query.type) == 1">
          <patentchinesemedicine />
        </div>
        <!-- 中医药膳 -->
        <div v-if="Number(route.query.type) == 2">
          <chinesemedicinaldiet />
        </div>
        <!-- 中医药剂三级 -->
        <div v-if="Number(route.query.type) == 3">
          <preparationsthree />
        </div>
        <!-- 中医药剂一级 -->
        <div v-if="Number(route.query.type) == 4">
          <preparationsfirst />
        </div>
        <!-- 常用中药一级 -->
        <div v-if="Number(route.query.type) == 5">
          <commonHerbsfirst />
        </div>
        <!-- 常用中药三级 -->
        <div v-if="Number(route.query.type) == 6">
          <commonHerbsthree />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import preparationsfirst from "./components/preparationsfirst/index.vue";
import preparationsthree from "./components/preparationsthree/index.vue";
import commonHerbsfirst from "./components/commonHerbsfirst/index.vue";
import commonHerbsthree from "./components/commonHerbsthree/index.vue";
import patentchinesemedicine from "./components/patentchinesemedicine/index.vue";
import chinesemedicinaldiet from "./components/chinesemedicinaldiet/index.vue";
const route = useRoute();
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 20px 0;
  box-sizing: border-box;
}
:deep(.detail-content) {
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
}

:deep(.detail-title) {
  font-size: 26px;
  font-weight: bold;
  height: 50px;
  background-color: #f7efdc;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
  line-height: 50px;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 20px;
}
:deep(.detail-title::before) {
  content: "";
  width: 28px;
  height: 50px;
  position: absolute;
  left: -28px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2024/9/5/6266304000739139876/title_left.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
:deep(.detail-title::after) {
  content: "";
  width: 28px;
  height: 50px;
  position: absolute;
  right: -28px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2024/9/5/8995892362218179609/title_right.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
:deep(.label-cont) {
  color: #ce9433;
  font-size: 18px;
  margin-bottom: 10px;
}
:deep(.text-cont) {
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 28px;
}
:deep(.video-cont) {
  width: 500px;
  height: 280px;
  margin: 0 auto;
}
:deep(.title-cont) {
  position: relative;
}
:deep(.title-line) {
  width: 100%;
  border-top: 1px solid #ce9433;
  position: absolute;
  left: 0;
  right: 0;
  top: 18px;
  z-index: 3;
}
:deep(.title) {
  position: relative;
  width: 180px;
  height: 36px;
  font-size: 24px;
  font-weight: bold;
  color: #212930;
  text-align: center;
  background-color: white;
  z-index: 5;
  padding: 0 5px;
  box-sizing: border-box;
}
:deep(.title .iconfont) {
  color: #ce9433;
  font-size: 24px;
}
</style>
