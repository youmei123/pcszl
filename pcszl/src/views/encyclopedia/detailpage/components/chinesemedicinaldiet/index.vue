<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-15 15:49:55
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-18 16:22:49
 * @FilePath: \pcszl\src\views\encyclopedia\detailpage\components\preparations\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="f-jc-ac" style="width: 100%">
      <div class="detail-title">{{ object?.name }}</div>
    </div>
    <div v-if="object?.source">
      <div class="label-cont">出处:</div>
      <div class="text-cont">{{ object.source }}</div>
    </div>
    <div v-if="object?.ingredient">
      <div class="label-cont">食材:</div>
      <div class="text-cont">{{ object.ingredient }}</div>
    </div>
    <div v-if="object?.method">
      <div class="label-cont">制法:</div>
      <div class="text-cont">{{ object.method }}</div>
    </div>
    <div v-if="object?.effect">
      <div class="label-cont">功效:</div>
      <div class="text-cont">{{ object.effect }}</div>
    </div>
    <div v-if="object?.note">
      <div class="label-cont">附注:</div>
      <div class="text-cont">{{ object.note }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { zyyssingle } from "@/api/encyclopedia";
const route = useRoute();
console.log(route.query);
interface ChineseMedicinalDietType {
  id: number;
  name: string;
  source: string;
  ingredient: string;
  method: string;
  effect: string;
  note: string;
  addtime: number;
}
const object = ref<ChineseMedicinalDietType>();

onMounted(async () => {
  const { data } = await zyyssingle({
    id: route.query.id,
  });
  object.value = data;
  console.log(object.value);
});
</script>
