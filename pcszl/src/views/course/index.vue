<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-10 14:39:12
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-15 17:10:46
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in tablist"
            :label="item.courseTypeName"
            :name="item.id"
          >
            <div
              class="course-item-cont f-w f-jb"
              v-if="!loading1 && courselist.length > 0"
            >
              <CourseItem v-for="val in courselist" :data="val" :key="val.id" />
            </div>
            <div v-else style="height: 750px" class="f-jc-ac" >
              <loading
                v-if="loading1"
                :translateY="50"
                color="#FCDC46"
                active
                text="正在加载中..."
              />
              <el-empty v-else description="暂无数据" />
            </div>
          </el-tab-pane>
        </el-tabs>
        <Pagination
          @changePage="handlePageChange"
          :count="totalcount"
          :currentPage="pageNo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, reactive, onMounted, nextTick } from "vue";
import type { TabsPaneContext } from "element-plus";
import { DArrowRight } from "@element-plus/icons-vue";
import { listCourseType } from "@/api/course";
import CourseItem from "@/components/CourseItem/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { listCourse } from "@/api/home";
import { useUserStore } from "@/store/userStore";
import { CourseListType } from "@/utiles/types";
const userStore = useUserStore();
const route = useRoute();
const courseId = route.query.id;
console.log(courseId);
// 定义一个TabItem类型
interface TabItem {
  id: string;
  courseTypeName: string;
}
//专业集合
const tablist = reactive<TabItem[]>([]);
//当前激活的tab
const activeName = ref<string | number>("");

const pageNo = ref(1); // 当前页码
const totalcount = ref(0); // 总条数
const courselist = reactive<CourseListType[]>([]); // 课程列表
const loading1 = ref(false); // 加载状态

onMounted(() => {
  getlistCourseType();
});
const getlistCourseType = async () => {
  const { data } = await listCourseType();
  tablist.splice(0, tablist.length, ...(data || []));
  tablist.unshift({
    id: "",
    courseTypeName: "全部",
  });
  let index = tablist.findIndex((item) => {
    return item.id == courseId;
  });
  activeName.value = index !== -1 ? tablist[index].id : tablist[0].id;
  getlistCourse();
};

const getlistCourse = async () => {
  loading1.value = true;
  const { data, count } = await listCourse({
    page: pageNo.value,
    userId: userStore.userId,
    pageSize: 12,
    courseTypeId: activeName.value,
    types: 3,
  });
  courselist.splice(0, courselist.length, ...(data || []));
  totalcount.value = count;
  loading1.value = false;
};

const handlePageChange = (page: number) => {
  console.log(page);
  pageNo.value = page;
  getlistCourse();
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event);
  activeName.value = tab.paneName ?? "";
  pageNo.value = 1;
  getlistCourse();
};
</script>

<style lang="scss" scoped>
.course-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
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

.product-item {
  margin-bottom: 30px;
}
.course-item-cont {
  padding-top: 15px;
  box-sizing: border-box;
  min-height: 770px;
}
</style>
