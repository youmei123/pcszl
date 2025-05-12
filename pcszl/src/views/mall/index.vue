<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:55:10
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-12 15:23:14
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
        <div v-if="!isloading && productlist.length > 0" class="f-jb-ac f-w">
          <ProductItem v-for="(item, index) in productlist" :data="item" :key="index" />
        </div>
        <div v-else style="height: 400px">
          <loading
            v-if="isloading"
            :translateY="50"
            color="#FCDC46"
            active
            text="正在加载中..."
          />
          <el-empty v-else description="暂无数据" />
        </div>
        <div style="width: 100%">
          <Pagination @changePage="handlePageChange" :count="total" :currentPage="page" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import ProductItem from "./components/ProductItem/index.vue";
import { ref, onMounted } from "vue";
import Pagination from "@/components/Pagination/index.vue";
import { listproduct } from "@/api/mall";
import { ProductType } from "@/utiles/types";
onMounted(() => {
  getProductList();
});
const page = ref(1);
const total = ref(0);
const productlist = ref<ProductType[]>([]);
const isloading = ref(false);
const getProductList = async () => {
  isloading.value = true;
  const { data, count } = await listproduct({
    page: page.value,
  });
  isloading.value = false;
  productlist.value = data;
  total.value = count;
  console.log(productlist.value);
};
const handlePageChange = (currentPage: number) => {
  page.value = currentPage;
  getProductList();
};
</script>

<style lang="scss" scoped>
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
:deep(.mall-item) {
  margin-bottom: 30px;
}
</style>
