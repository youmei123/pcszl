<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-30 16:42:01
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 15:51:56
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\orderrefund\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="order-refund-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/usercenter/myorder' }">我的订单</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="refund-content f-jb-as">
        <div class="refund-left">
          <div class="refund-form-cont" v-if="currentstatus == 1">
            <RefundForm ref="RefundForms" :order="order" :type="type" @Refund="Refund" :priceNum="priceTotal" />
          </div>
          <div class="refund-Steps-cont" v-if="currentstatus != 1">
            <RefundSteps ref="RefundStepss" :order="order" :single="single" @Steps="Steps" />
          </div>
          <div class="refun-info-box-cont" v-if="currentstatus != 1">
            <RefunInfoBox :order="order" :single="single" :priceNum="priceTotal" />
          </div>
          <div v-if="SingleLoading">
            <loading :translateY="50" color="#FCDC46" active text="正在加载中..." :height="500" />
          </div>
        </div>
        <div class="refund-right">
          <OrderInfoCard :order="order" :aftersaleList="aftersaleList" :orderPrice="orderPrice"
            :priceNum="priceTotal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import OrderInfoCard from "../components/OrderInfoCard/index.vue";
import RefundForm from "../components/RefundForm/index.vue";
import RefunInfoBox from "../components/RefundInfoBox/index.vue";
import RefundSteps from "../components/RefundSteps/index.vue";
import { useRoute, useRouter } from 'vue-router';
import { ordersType, aftersale } from "@/utiles/types";
import {
  singleOrdersById,
  postage,
  aftersaleSingle
} from "@/api/order";
import { useUserStore } from "@/store/userStore";
const router = useRouter();
const userStore = useUserStore();
const refundstatuslist = ref([]);
const RefundForms = ref(<any>null)
const RefundStepss = ref(<any>null)
const currentstatus = ref(1);//当前进度
const route = useRoute();
const orderId = ref(route.query.orderId)
const order = ref(<ordersType>{})
const orderPrice = ref(0)//运费
const aftersaleList = ref(<aftersale>{})//售后信息
const priceTotal = ref("")//需付款
const type = ref(Number(route.query.type))//1仅退款 2退货退款
const SingleLoading = ref(false);//加载
const single = ref(<aftersale>{})
// 订单详情
const singleOrders = async () => {
  SingleLoading.value = true
  const res = await singleOrdersById({
    orderId: orderId.value,
  });
  SingleLoading.value = false
  if (res.status == 0) {
    order.value = res.data
    type.value = order.value.isEntity == 1 ? Number(route.query.type) : 1
    priceNum()
    if (order.value.consigneeAddress) {
      getOrderPrice()
    }
    if (order.value.aftersaleList && order.value.aftersaleList.length != 0) {
      aftersaleList.value = order.value.aftersaleList[0]
      currentstatus.value = 2
      getSingle()
    } else {
      aftersaleList.value = <aftersale>{}
      currentstatus.value = 1
      RefundForms.value.onMountedClick()
    }
  }
}
// 获取售后详情
const getSingle = async () => {
  SingleLoading.value = true
  const res = await aftersaleSingle({
    id: aftersaleList.value.id,
    userId: userStore.userId,
    token: userStore.token,
  });
  SingleLoading.value = false
  if (res.status == 0) {
    currentstatus.value = 2
    single.value = res.data
    RefundStepss.value.onMountedClick(single.value, order.value)
  }
}
// 退款申请返回
const Refund = () => {
  currentstatus.value = 2
  singleOrders()
}
// 退款步骤返回
const Steps = () => {
  router.push({
    path: "/usercenter/myorder",
  });
}
// 获取运费
const getOrderPrice = async () => {
  if (!order.value.consigneeAddress ||
    (!order.value.consigneeAddress.includes("西藏自治区") && !order.value.consigneeAddress.includes("新疆维吾尔自治区"))) {
    orderPrice.value = 0
    return
  }
  let text = ''
  if (order.value.consigneeAddress.includes("西藏自治区")) {
    text = '西藏'
  } else if (order.value.consigneeAddress.includes("新疆维吾尔自治区")) {
    text = '新疆'
  }
  const res = await postage({
    address: text
  });
  if (res.status == '0') {
    orderPrice.value = Number(res.data)
  }
}
// 计算需付金额
const priceNum = () => {
  let coinNumPrice: any = 0
  let couponMoney: any = 0
  if (order.value.healthcoinCount) {
    coinNumPrice = (order.value.healthcoinCount / 10000).toFixed(2)
  }
  if (order.value.couponMoney) {
    couponMoney = order.value.couponMoney
  }
  let price: any = (order.value.truePrice * order.value.count).toFixed(2)
  priceTotal.value = (price - coinNumPrice - couponMoney).toFixed(2)
}
onMounted(() => {
  singleOrders()
})
</script>

<style lang="scss" scoped>
.page-container{
  min-height: auto;
}
.order-refund-container{
  padding-bottom: 30px;
  box-sizing: border-box;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}

.refund-left {
  width: 810px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 30px 30px;
  box-sizing: border-box;
  position: relative;
}


.refund-form-cont {
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
