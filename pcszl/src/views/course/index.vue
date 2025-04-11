<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-10 14:39:12
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-11 11:04:54
 * @FilePath: \pcszl\src\views\course\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="course-container">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>全部课程</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="course-list">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in tablist"
            :label="item.courseTypeName"
            :name="item.id"
          >
            <div class="course-item-cont f-w f-jb">
              <ProductItem v-for="() in 16" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import { DArrowRight } from "@element-plus/icons-vue";
import { listCourseType } from "@/api/course";
import ProductItem from "@/components/ProductItem/index.vue";
// 定义一个TabItem接口
interface TabItem {
  id: string;
  courseTypeName: string;
}
//专业集合
const tablist = reactive<TabItem[]>([]);
//当前激活的tab
const activeName = ref<string | number>("");
onMounted(() => {
  getlistCourseType();
});
const getlistCourseType = async () => {
  const { data } = await listCourseType();
  tablist.splice(0, tablist.length, ...(data || []));
  activeName.value = tablist[0].id;
  console.log(tablist);
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event);
  activeName.value = tab.paneName ?? "";
};
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  background-color: rgb(246, 246, 246);
}
.course-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
:deep(.el-breadcrumb__inner.is-link:hover) {
  color: #ce9433;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.course-list {
  padding: 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
}
:deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: bold;
  padding: 0 37px;
}
:deep(.el-tabs__item.is-active, .el-tabs__item:hover) {
  color: #ce9433;
}
:deep(.el-tabs__active-bar) {
  background-color: #ce9433;
}
:deep(.el-tabs__item:hover) {
  color: #ce9433;
}
.product-item {
  margin-bottom: 30px;
}
.course-item-cont {
  padding-top: 15px;
  box-sizing: border-box;
}
</style>
