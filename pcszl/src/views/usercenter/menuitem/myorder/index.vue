<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:29:47
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-29 17:11:16
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="order-tabs-content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tablist" :label="item" :name="index">
          <OrderItem v-for="() in 6" />
        </el-tab-pane>
      </el-tabs>
      <div style="margin-top: 20px;" >
        <Pagination/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import OrderItem from "./components/OrderItem.vue";
import Pagination from "@/components/Pagination/index.vue";
const tablist = reactive(["全部", "待付款", "待发货", "待收货", "已完成", "售后"]);
const activeName = ref(0);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName, event);
  activeName.value = tab.paneName as number;
  console.log(activeName.value);
};
</script>

<style lang="scss" scoped>
</style>
