<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-15 17:09:16
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-18 14:36:06
 * @FilePath: \pcszl\src\views\encyclopedia\detailpage\components\preparationsthree\index.vue
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
    <div v-if="object?.classify">
      <div class="label-cont">分类:</div>
      <div class="text-cont">{{ object.classify }}</div>
    </div>
    <div v-if="object?.medicationAttention">
      <div class="label-cont">用药注意:</div>
      <div class="text-cont">{{ object.medicationAttention }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { singleCyzyFirst } from "@/api/encyclopedia";
import XGplayer from "@/views/course/components/Video/index.vue";
const route = useRoute();
console.log(route.query);
interface ChineseMedicineCategory {
  id: number;
  name: string;
  abbreviation: string;
  orderNum: number;
  addtime: number;
  definition: string;
  function: string;
  classify: string;
  compatibilityOfMedicines: string;
  medicationAttention: string;
}
const object = ref<ChineseMedicineCategory>();

onMounted(async () => {
  const { data } = await singleCyzyFirst({
    id: route.query.id,
  });
  object.value = data;
  console.log(object.value);
});
</script>
