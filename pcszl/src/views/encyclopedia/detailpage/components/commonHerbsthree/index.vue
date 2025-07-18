<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-15 17:09:16
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-18 15:19:19
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
    <div class="title-cont f-jc-ac">
      <div class="title f-jb-ac">
        <div class="iconfont icon-caoyaofei"></div>
        <div>基本信息</div>
        <div class="iconfont icon-caoyaofei"></div>
      </div>
      <div class="title-line"></div>
    </div>
    <div v-if="object?.drugNames">
      <div class="label-cont">药品名称:</div>
      <div class="text-cont">{{ object.drugNames }}</div>
    </div>
    <div v-if="object?.originallyPublished">
      <div class="label-cont">始载于:</div>
      <div class="text-cont">{{ object.originallyPublished }}</div>
    </div>
    <div v-if="object?.alias">
      <div class="label-cont">别名:</div>
      <div class="text-cont">{{ object.alias }}</div>
    </div>
    <div v-if="object?.sexClassics">
      <div class="label-cont">性味归经:</div>
      <div class="text-cont">{{ object.sexClassics }}</div>
    </div>
    <div v-if="object?.effect">
      <div class="label-cont">功效:</div>
      <div class="text-cont">{{ object.effect }}</div>
    </div>
    <div v-if="object?.introductionMaterials">
      <div class="label-cont">药材简介:</div>
      <div class="text-cont">{{ object.introductionMaterials }}</div>
    </div>
    <div v-if="object?.usageDosage">
      <div class="label-cont">用法用量:</div>
      <div class="text-cont">{{ object.usageDosage }}</div>
    </div>
    <div v-if="object?.mattersAttention">
      <div class="label-cont">注意事项:</div>
      <div class="text-cont">{{ object.mattersAttention }}</div>
    </div>
    <div class="title-cont f-jc-ac">
      <div class="title f-jb-ac">
        <div class="iconfont icon-caoyaofei"></div>
        <div>应用</div>
        <div class="iconfont icon-caoyaofei"></div>
      </div>
      <div class="title-line"></div>
    </div>
    <div v-if="object?.use">
      <div class="label-cont">用法用量:</div>
      <div class="text-cont">{{ object.use }}</div>
    </div>
    <div v-if="object?.correlationCompatibility">
      <div class="label-cont">相关配伍:</div>
      <div class="text-cont">{{ object.correlationCompatibility }}</div>
    </div>
    <div class="title-cont f-jc-ac">
      <div class="title f-jb-ac">
        <div class="iconfont icon-caoyaofei"></div>
        <div>应用</div>
        <div class="iconfont icon-caoyaofei"></div>
      </div>
      <div class="title-line"></div>
    </div>
    <div v-if="object?.modernProcessing">
      <div class="label-cont">现代炮制:</div>
      <div class="text-cont">{{ object.modernProcessing }}</div>
    </div>
    <div v-if="object?.ancientProcessing">
      <div class="label-cont">古法炮制:</div>
      <div class="text-cont">{{ object.ancientProcessing }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { singleCyzyThird } from "@/api/encyclopedia";
import XGplayer from "@/views/course/components/Video/index.vue";
const route = useRoute();
console.log(route.query);
interface ChineseHerbDetail {
  id: number;
  name: string;
  orderNum: number;
  secondId: number;
  firstId: number;
  drugNames: string;
  originallyPublished: string;
  alias: string;
  sexClassics: string;
  effect: string;
  introductionMaterials: string;
  usageDosage: string;
  mattersAttention: string;
  use: string;
  correlationCompatibility: string;
  modernProcessing: string;
  ancientProcessing: string;
  addtime: number;
  hwUrl?: string;
  imgUrl?: string;
}
const object = ref<ChineseHerbDetail>();

onMounted(async () => {
  const { data } = await singleCyzyThird({
    id: route.query.id,
  });
  object.value = data;
  console.log(object.value);
});
</script>
