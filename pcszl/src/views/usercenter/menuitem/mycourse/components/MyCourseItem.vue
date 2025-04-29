<template>
  <div>
    <div class="my-course-item f-ac">
      <div class="item-poster-box f-shrink0">
        <img />
      </div>
      <div class="my-course-info fd-c f-jb">
        <div class="info-bar">
          <div class="my-course-name">常用穴位真人取穴</div>
          <div class="my-course-desc">
            黄帝内经太素详细介绍了人体的构造、五脏六腑、经络关节等。
          </div>
        </div>
        <div class="f-jb-ac">
          <div class="progress">已看41%</div>
          <div class="continue-btn pointer">继续学习</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
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
