<template>
  <div
    class="featurezone-item"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <img src="@/assets/images/menu1.png" />
    <div class="svip-icon">svip专属</div>
    <div class="shad-cover" v-if="isshow" >
    
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isshow = ref(false);
let num=1
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
</style>
