<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-06 15:00:06
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 17:57:21
 * @FilePath: \pcszl\src\views\home\FeatureZone\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="featurezone-content content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>特色疗法</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="featurezone-cont">
        <div class="featurezone-item-cont f-jb-ac f-w" v-if="!zl_loading && list.length > 0">
          <FeatureZoneItem v-for="item in list" :key="item.id" :data="item" />
        </div>
        <div v-else style="height: 400px">
          <loading
            v-if="zl_loading"
            :translateY="50"
            color="#FCDC46"
            active
            text="正在加载中..."
          />
          <el-empty v-else description="暂无数据" />
        </div>
        <div class="pagination-cont">
          <Pagination
            @changePage="handlePageChange"
            :count="totalcount"
            :currentPage="pageNo"
            :pageSize="10"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import FeatureZoneItem from "./components/FeatureZoneItem/index.vue";
import { zonelist } from "@/api/home";
import { CourseListType } from "@/utiles/types";

onMounted(() => {
  getZoneList();
});

const pageNo = ref(1);
const totalcount = ref(0);
const list = reactive<CourseListType[]>([]);
const zl_loading = ref(false);
const getZoneList = async () => {
  zl_loading.value = true;
  const { data, count } = await zonelist({
    page: pageNo.value,
    size: 10,
  });
  list.splice(0, list.length, ...(data || []));
  totalcount.value = count;
  zl_loading.value = false;
  console.log(data);
};

const handlePageChange = (page: number) => {
  console.log(page);
  pageNo.value = page;
  getZoneList();
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 600px !important;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.featurezone-cont {
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.pagination-cont {
  margin-top: 20px;
}
</style>
