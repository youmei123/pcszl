<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-15 15:49:55
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-18 16:07:50
 * @FilePath: \pcszl\src\views\encyclopedia\detailpage\components\preparations\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="f-jc-ac" style="width: 100%">
      <div class="detail-title">{{ object?.name }}</div>
    </div>
    <div v-if="object?.prescription">
      <div class="label-cont">处方:</div>
      <div class="text-cont">{{ object.prescription }}</div>
    </div>
    <div v-if="object?.preparation">
      <div class="label-cont">制法:</div>
      <div class="text-cont">{{ object.preparation }}</div>
    </div>
    <div v-if="object?.majorDrug">
      <div class="label-cont">主治:</div>
      <div class="text-cont">{{ object.majorDrug }}</div>
    </div>
    <div v-if="object?.character">
      <div class="label-cont">性状:</div>
      <div class="text-cont">{{ object.character }}</div>
    </div>
    <div v-if="object?.usageDosage">
      <div class="label-cont">用法用量:</div>
      <div class="text-cont">{{ object.usageDosage }}</div>
    </div>
    <div v-if="object?.mattersAttention">
      <div class="label-cont">注意事项:</div>
      <div class="text-cont">{{ object.mattersAttention }}</div>
    </div>
    <div v-if="object?.specification">
      <div class="label-cont">规格:</div>
      <div class="text-cont">{{ object.specification }}</div>
    </div>
    <div v-if="object?.store">
      <div class="label-cont">储藏:</div>
      <div class="text-cont">{{ object.store }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { singleZcy } from "@/api/encyclopedia";
const route = useRoute();
console.log(route.query);
interface ChinesePatentMedicineDetailType {
  id: number;
  name: string;
  prescription: string;
  preparation: string;
  majorDrug: string;
  character: string;
  usageDosage: string;
  mattersAttention: string;
  specification: string;
  store: string;
  addtime: number;
}
const object = ref<ChinesePatentMedicineDetailType>();

onMounted(async () => {
  const { data } = await singleZcy({
    id: route.query.id,
  });
  object.value = data;
  console.log(object.value);
});
</script>
