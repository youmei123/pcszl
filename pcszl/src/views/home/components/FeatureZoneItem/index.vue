<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-09 15:55:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 17:05:25
 * @FilePath: \pcszl\src\components\FeatureZoneItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="featurezone-item pointer"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="linkzone"
  >
    <img v-if="data.coverImg" :src="data.coverImg" />
    <div class="svip-icon">svip专属</div>
    <transition name="fade">
      <div class="shad-cover f-ae" v-if="isshow">
        <div class="shad-cont">
          <div class="featurezone-title">{{ data.name }}</div>
          <div class="featurezone-desc u-line-2">
            {{ data.description }}
          </div>
          <div class="featurezone-bottom f-jb-ac">
            <div class="featurezone-watchcount">
              播放量{{ transNumberToShort(data.playCount) }}
            </div>
            <div class="play-btn ">立即了解</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { transNumberToShort } from "@/utiles/public";
import { useRouter } from "vue-router";
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const router = useRouter();

const isshow = ref(false);
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

const linkzone = () => {
  router.push({
    path: "/SingleFeatureZone",
    query: {
      id: props.data.id,
      name: props.data.name,
    },
  });
};
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
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
  line-height: 33px;
}
.shad-cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.8)
  );
}
.shad-cover {
  padding: 25px;
  padding-bottom: 20px;
  box-sizing: border-box;
  color: white;
  width: 100%;
}
.featurezone-title {
  font-size: 18px;
  font-weight: bold;
}
.featurezone-desc {
  font-size: 16px;
  // height: 41px;
  margin: 10px 0;
  width: 100%;
  line-height: 24px;
}
.featurezone-watchcount {
  font-size: 16px;
}
.play-btn {
  width: 90px;
  height: 30px;
  border-radius: 15px;
  font-size: 16px;
  color: #212930;
  background-color: util.$ThemeColors;
  text-align: center;
  line-height: 30px;
}
.shad-cont {
  width: 100%;
}
</style>
