<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-06 16:38:06
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-06 17:12:24
 * @FilePath: \pcszl\src\views\home\FeatureZone\SingleFeatureZone\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="single-feature-zone content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>111</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="single-feature-zone-content content">
      <FeatureZoneItem v-for="(item, index) in list" :key="index" :data="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import FeatureZoneItem from "./components/FeatureZoneItem/index.vue";
import { listCourse } from "@/api/home";
import { CourseListType } from "@/utiles/types";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const zoneId = route.query.id;

onMounted(() => {
  getFeatureZoneList();
});

const pageNo = ref(1);
const totalcount = ref(0);
const list = reactive<CourseListType[]>([]);
const zl_loading = ref(false);

const getFeatureZoneList = async () => {
  zl_loading.value = true;
  const { data, count } = await listCourse({
    zoneId: zoneId,
    userId: userStore.userId,
    types: 4,
  });
  list.splice(0, list.length, ...(data || []));
  totalcount.value = count;
  zl_loading.value = false;
};
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.single-feature-zone-content {
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
</style>
