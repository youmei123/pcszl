<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-15 15:49:55
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-15 17:19:37
 * @FilePath: \pcszl\src\views\encyclopedia\detailpage\components\preparations\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="f-jc-ac" style="width: 100%">
      <div class="detail-title">{{ object?.name }}</div>
    </div>
    <div v-if="object?.definition">
      <div class="label-cont">定义:</div>
      <div class="text-cont">{{ object.definition }}</div>
    </div>
    <div v-if="object?.type">
      <div class="label-cont">分类:</div>
      <div class="text-cont">{{ object.type }}</div>
    </div>
    <div v-if="object?.attention">
      <div class="label-cont">用药注意:</div>
      <div class="text-cont">{{ object.attention }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { firstlist } from "@/api/encyclopedia";
const route = useRoute();
console.log(route.query);
interface DiaphoreticType {
  id: string;
  name: string;
  type: string;
  attention: string;
  abbreviation: string;
  definition?: string;
}
const object = ref<DiaphoreticType>();

onMounted(async () => {
  const { data } = await firstlist();
  if (data.length > 0) {
    object.value = data[Number(route.query.index)];
    console.log(object.value);
  }
});
</script>
