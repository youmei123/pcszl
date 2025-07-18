<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-15 17:09:16
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-16 10:49:04
 * @FilePath: \pcszl\src\views\encyclopedia\detailpage\components\preparationsthree\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="f-jc-ac" style="width: 100%">
      <div class="detail-title">{{ object?.name }}</div>
    </div>
    <div class="video-cont" v-if="object?.hwUrl">
      <XGplayer :src="object.hwUrl" :poster="object.imgUrl" :type="1" />
    </div>
    <div v-if="object?.name">
      <div class="label-cont">药品名称:</div>
      <div class="text-cont">{{ object.name }}</div>
    </div>
    <div v-if="object?.source">
      <div class="label-cont">始载于:</div>
      <div class="text-cont">{{ object.source }}</div>
    </div>
    <div v-if="object?.composition">
      <div class="label-cont">组成:</div>
      <div class="text-cont">{{ object.composition }}</div>
    </div>
    <div v-if="object?.effect">
      <div class="label-cont">功效:</div>
      <div class="text-cont">{{ object.effect }}</div>
    </div>
    <div v-if="object?.indication">
      <div class="label-cont">主治:</div>
      <div class="text-cont">{{ object.indication }}</div>
    </div>
    <div v-if="object?.attention">
      <div class="label-cont">注意事项:</div>
      <div class="text-cont">{{ object.attention }}</div>
    </div>
    <div v-if="object?.method">
      <div class="label-cont">用法用量:</div>
      <div class="text-cont">{{ object.method }}</div>
    </div>
    <div v-if="object?.rhymes">
      <div class="label-cont">歌诀:</div>
      <div class="text-cont">{{ object.rhymes }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { thirdsingle } from "@/api/encyclopedia";
import XGplayer from "@/views/course/components/Video/index.vue";
const route = useRoute();
console.log(route.query);
interface HerbalMedicineType {
  id: string;
  addtime: number;
  updatetime: number;
  name: string;
  content: string;
  composition: string;
  effect: string;
  indication: string;
  method: string;
  source?: string;
  attention?: string;
  rhymes?: string;
  hwUrl?: string;
  imgUrl?: string;
}
const object = ref<HerbalMedicineType>();

onMounted(async () => {
  const { data } = await thirdsingle({
    id: route.query.id,
  });
  object.value = data;
  console.log(object.value);
});
</script>
