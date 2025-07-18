<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-10 14:15:47
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-14 15:50:44
 * @FilePath: \pcszl\src\views\encyclopedia\consilia\components\ConsiliaItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="consilia-item fd-c f-jb pointer" @click="linkdetail">
      <div class="consilia-item-title">{{ data.name }}</div>
      <div class="consilia-item-tags f-ac">
        <div class="tags-item f-shrink0 f-jc-ac" v-for="val in data.symptom.split(' ')">
          {{ val }}
        </div>
      </div>
      <div class="consilia-item-bottombar f-jb-ac">
        <div class="consilia-item-left f-ac">
          <div class="consilia-item-doctor f-ac">
            <div class="iconfont icon-wodeyisheng"></div>
            <div>{{ data.doctor }}</div>
          </div>
          <div class="consilia-item-watch f-ac">
            <div class="iconfont icon-yanjing-zhengyan"></div>
            <div>{{ data.viewCount }}</div>
          </div>
        </div>
        <div class="consilia-item-right f-ac">{{ timeFormat(data.addtime) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timeFormat } from "@/utiles/public";
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits<{
  (e: "linkdetail", event: object): void;
}>();

const linkdetail = () => {
  emit("linkdetail", { id: props.data.id })
};

</script>

<style lang="scss" scoped>
.consilia-item {
  width: 365px;
  height: 140px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #dddddd;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/6/5/4413226589981358389/bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.consilia-item-title {
  color: #212930;
  font-size: 20px;
  font-weight: bold;
}
.consilia-item-tags {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.tags-item {
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 16px;
  color: #999999;
  margin-right: 10px;
}
.consilia-item-tags::before {
  content: "";
  position: absolute;
  top: 0;
  left: 235px;
  right: 0;
  bottom: 0;
  box-shadow: -10px 0 30px rgba(255, 255, 255, 1) inset;
  z-index: 3; // 确保阴影在文字下方
}
.consilia-item-left,
.consilia-item-right {
  font-size: 16px;
  color: #999999;
}
.consilia-item-watch {
  margin-left: 25px;
}
</style>
