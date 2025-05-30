<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:55:10
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-20 10:13:44
 * @FilePath: \pcszl\src\views\mall\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="mall-content content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商城</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="mall-list">
        <div v-if="tablist.length > 0">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="item in tablist"
              :label="item.name"
              :name="item.id"
            >
              <div v-if="!isloading && productlist.length > 0" class="f f-w pd-list-cont">
                <ProductItem v-for="(item, index) in productlist" :data="item" :key="index" />
              </div>
              <div v-else style="height: 800px;position: relative;">
                <loading
                  v-if="isloading"
                  :translateY="50"
                  :height="600"
                  color="#FCDC46"
                  active
                  text="正在加载中..."
                />
                <el-empty v-else description="暂无数据" />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-else>
          <div v-if="!isloading && productlist.length > 0" class="f f-w pd-list-cont">
            <ProductItem v-for="(item, index) in productlist" :data="item" :key="index" />
          </div>
          <div v-else style="height: 800px;position: relative;">
            <loading
              v-if="isloading"
              :translateY="50"
              :height="600"
              color="#FCDC46"
              active
              text="正在加载中..."
            />
            <el-empty v-else description="暂无数据" />
          </div>
        </div>
        <div style="width: 100%">
          <Pagination @changePage="handlePageChange" :count="total" :currentPage="page" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from "element-plus";
import { DArrowRight } from "@element-plus/icons-vue";
import ProductItem from "./components/ProductItem/index.vue";
import { ref,reactive, onMounted } from "vue";
import Pagination from "@/components/Pagination/index.vue";
import { listproduct,listClassification } from "@/api/mall";
import { ProductType } from "@/utiles/types";
onMounted(() => {
  getListClassification()
});
interface TabItem {
  id: string;
  name: string;
}
//分类集合
const tablist = reactive<TabItem[]>([]);
//当前激活的tab
const activeName = ref<string | number>("");
const page = ref(1);
const total = ref(0);
const productlist = ref<ProductType[]>([]);
const isloading = ref(false);
// 获取商品
const getListClassification = async () => {
  const { data, count } = await listClassification({});
  tablist.splice(0, tablist.length, ...(data || []));
  tablist.unshift({
    id: "",
    name: "全部",
  });
  getProductList();
  console.log(tablist);
};
// 获取商品
const getProductList = async () => {
  isloading.value = true;
  const { data, count } = await listproduct({
    page: page.value,
    classificationId: activeName.value,
  });
  isloading.value = false;
  productlist.value = data;
  total.value = count;
  console.log(productlist.value);
};
// tab点击
const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeName.value = tab.paneName ?? "";
  getProductList();
};
// 分页
const handlePageChange = (currentPage: number) => {
  page.value = currentPage;
  getProductList();
};
</script>

<style lang="scss" scoped>
.page-container{
  padding-bottom: 30px;
  box-sizing: border-box;
}
.breadcrumb-cont {
  padding: 20px 0;
  box-sizing: border-box;
}
.mall-list {
  width: 100%;
  background: #ffffff;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
}
.pd-list-cont{
  min-height: 800px;
}
:deep(.mall-item) {
  margin-bottom: 30px;
}
</style>
