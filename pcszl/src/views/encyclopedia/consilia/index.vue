<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-04 15:02:13
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-14 15:47:10
 * @FilePath: \pcszl\src\views\encyclopedia\consilia\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="consilia-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/encyclopedia' }">百科</el-breadcrumb-item>
          <el-breadcrumb-item>名家医案</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="consilia-cont">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="item in consilialist" :label="item.name" :name="item.id">
            <div
              class="course-item-cont f-w f-jb"
              v-if="!loadingstatus && MjyaSecondlist.length > 0"
            >
              <ConsiliaItem
                v-for="val in MjyaSecondlist"
                :data="val"
                :key="val.id"
                @linkdetail="linkdetail"
              />
            </div>
            <div v-else style="height: 750px" class="f-jc-ac">
              <loading
                v-if="loadingstatus"
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
          :currentPage="page"
          :pageSize="24"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import { listMjyaFirst, listMjyaSecond } from "@/api/encyclopedia";
import type { TabsPaneContext } from "element-plus";
import ConsiliaItem from "./components/ConsiliaItem/index.vue";
import { useRouter } from "vue-router";
const router = useRouter();

interface ConsiliaType {
  id: number;
  name: string;
  addtime: number;
  orderNum: number;
}
interface MedicalRecordType {
  id: number;
  name: string;
  doctor: string;
  symptom: string;
  addtime: number;
  viewCount: number;
}
const loadingstatus = ref(true);
const page = ref(1);
const totalcount = ref(1);
const consilialist = ref<ConsiliaType[]>([]);
const activeName = ref<string | number>("");
const MjyaSecondlist = ref<MedicalRecordType[]>([]);
onMounted(() => {
  getlistMjyaFirst();
});

const getlistMjyaFirst = async () => {
  const { data } = await listMjyaFirst();
  consilialist.value = data;
  activeName.value = consilialist.value[0].id ?? "";
  getlistMjyaSecond(activeName.value);
  console.log(data);
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event);
  activeName.value = tab.paneName ?? "";
  getlistMjyaSecond(activeName.value);
};

const getlistMjyaSecond = async (id: string | number) => {
  loadingstatus.value = true;
  const { data, count } = await listMjyaSecond({
    page: page.value,
    firstId: id,
    pageSize: 24,
  });
  loadingstatus.value = false;
  MjyaSecondlist.value = data;
  totalcount.value = count;
  console.log(count.value);
  console.log(data);
};

const handlePageChange = (p: number) => {
  console.log(p);
  page.value = p;
  getlistMjyaSecond(activeName.value);
};

const linkdetail = (e: any) => {
  console.log(e);
  router.push({
    path: "/consiliadetail",
    query: { id: e.id, page: page.value, firstId: activeName.value },
  });
};
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 30px 0;
  box-sizing: border-box;
}
.consilia-cont {
  padding: 30px;
  padding-top: 0;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
}
:deep(.el-tabs__nav-prev) {
  font-size: 20px;
  line-height: 76px;
}
:deep(.el-tabs__nav-next) {
  font-size: 20px;
  line-height: 76px;
}
:deep(.el-tabs) {
  --el-tabs-header-height: 70px;
}
:deep(.el-tabs__active-bar) {
  height: 4px;
}
:deep(.el-tabs__nav-wrap:after) {
  height: 4px;
  background: #f6f6f6;
}
</style>
