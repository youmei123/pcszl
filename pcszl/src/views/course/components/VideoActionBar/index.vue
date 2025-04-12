<template>
  <div class="video-action-bar">
    <div class="action-list f-ac">
      <div class="action-item">
        <div class="font-icon">Aa字号</div>
      </div>
      <div class="action-item">
        <SerachBar />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SerachBar from "@/components/SerachBar/index.vue";
import { ref, reactive, onMounted } from "vue";
</script>

<style lang="scss" scoped>
.video-action-bar {
  width: 100%;
  height: 79px;
  background-color: #212930;
}
.action-list {
  height: 100%;
}
.action-item {
  margin-left: 20px;
}
.font-icon {
  width: 80px;
  height: 40px;
  background-color: rgb(56, 63, 69);
  color: #d0e1f0;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
}
</style>
