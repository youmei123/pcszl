<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:55:10
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-29 17:10:34
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
      <div class="mall-list f-jb-ac f-w">
        <ProductItem v-for="() in 12" />
        <div style="width: 100%">
          <Pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import ProductItem from "./components/ProductItem/index.vue";
import { ref, reactive, onMounted } from "vue";
import Pagination from "@/components/Pagination/index.vue";
const tags = reactive(["好评率98%", "24小时热卖600+", "免费包邮"]);
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
