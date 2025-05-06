<template>
  <div class="feature-zone-item">
    <div class="feature-zone-item-img">
      <img :src="data.coverImg" />
      <div class="svip-icon">svip专属</div>
    </div>
    <div class="feature-zone-bottom-bar fd-c f-jb">
      <div class="feature-zone-title">{{ data.name }}</div>
      <div class="feature-zone-desc u-line-2">
        {{ data.description }}
      </div>
      <div class="f-jb-ac">
        <div class="watch-num">播放量{{ transNumberToShort(data.playCount) }}</div>
        <div class="btn-more pointer" @click="handlesingleroom(data)">立即了解</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { transNumberToShort } from "@/utiles/public";
import { useRouter } from "vue-router";
const router = useRouter();

const handlesingleroom = (item: any) => {
  router.push({ path: "/SingleFeatureZone", query: { id: item.id } });
};

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>

<style lang="scss" scoped>
.feature-zone-item {
  width: 560px;
}
.feature-zone-item-img {
  width: 100%;
  height: 310px;
  background-color: util.$ThemeColors;
  border-radius: 16px 16px 0px 0px;
  border: 1px solid #dddddd;
  position: relative;
  overflow: hidden;
}

.feature-zone-item-img img {
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
.feature-zone-bottom-bar {
  width: 100%;
  height: 150px;
  background: #ffffff;
  border-radius: 0px 0px 16px 16px;
  border: 1px solid #dddddd;
  padding: 20px;
  box-sizing: border-box;
}
.feature-zone-title {
  font-size: 18px;
  font-weight: bold;
}
.feature-zone-desc {
  color: #999999;
}
.watch-num {
  color: #ce9433;
}
.btn-more {
  width: 90px;
  height: 40px;
  background-color: util.$ThemeColors;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
}
</style>
