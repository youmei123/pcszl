<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:29:47
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-30 15:24:17
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="order-tabs-content">
      <el-tabs v-model="activeIndex" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tablist" :key="index" :label="item" :name="index">
          <OrderItem ref="refOrderItem" :orderList="orderList" :tabIndex="activeIndex" :listLoading="listLoading" :isopen="isopen"  />
        </el-tab-pane>
      </el-tabs>
      <div style="margin-top: 20px">
        <Pagination 
        @changePage="handlePageChange"
          :count="totalcount"
          :currentPage="pageNo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import OrderItem from "./components/OrderItem/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { 
  listOrder,
  isRefund,
 } from "@/api/order";
import { useUserStore } from "@/store/userStore";
import { orderListType } from "@/utiles/types";
const userStore = useUserStore();
const tablist = reactive(["全部", "待付款", "待发货", "待收货", "已完成", "售后"]);
const activeIndex = ref(0);//当前订单状态
const pageNo = ref(1); // 当前页码
const totalcount = ref(0); // 总条数
const listLoading = ref(false);//加载
const orderList = reactive([]); // 订单列表
const isopen = ref(0)//是否有售后权限

// tab切换
const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeIndex.value = tab.paneName as number;
  pageNo.value=1
  getList()
};
// 翻页
const handlePageChange = (page: number) => {
  pageNo.value = page;
  getList()
};
// 获取订单列表
const getList = async () => {
  listLoading.value = true
  let params:any = {
    page: pageNo.value,
    userId: userStore.userId,
    token: userStore.token,
    status:'',
  }
  let url='/api/szl/listOrders'
  if (activeIndex.value == 0) {
    params.status = ''
  }
  //待付款
  if (activeIndex.value == 1) {
    params.status = '0'
  }
  //待发货
  if (activeIndex.value == 2) {
    params.status = '3'
  }
  //待收货
  if (activeIndex.value == 3) {
    params.status = '4'
  }
  //已完成
  if (activeIndex.value == 4) {
    params.status = '1'
  }
  if(activeIndex.value == 5){
    url='/api/szl/orders/aftersale/list'
  }
  const { data, count } = await listOrder(url,params);
  listLoading.value = false
  if(data.length!=0){
    data.forEach((item:any,index:number)=>{
      if(item.aftersaleList && item.aftersaleList.length!=0){
        item.refundStatus=item.aftersaleList[0].refundStatus
        item.aftersaleId=item.aftersaleList[0].id
        item.deliveryNumber=item.aftersaleList[0].deliveryNumber
        item.aftersaleStatus=item.aftersaleList[0].status
      }
    })
  }
  orderList.splice(0, orderList.length, ...(data || []));
  totalcount.value = count;
  
}
// 是否有售后权限
const getIsOpen = async ()=>{
  const { data } = await isRefund({
    token: userStore.token,
  });
  isopen.value = data || 0;
}

onMounted(() => {
  getList()
  getIsOpen()
});
</script>

<style lang="scss" scoped></style>
