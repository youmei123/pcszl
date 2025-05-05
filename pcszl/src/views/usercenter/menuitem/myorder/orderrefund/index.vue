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
          <el-breadcrumb-item :to="{ path: '/usercenter/myorder' }"
            >我的订单</el-breadcrumb-item
          >
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="refund-content f-jb-as">
        <div class="refund-left">
          <div class="refund-status-cont f-jb-ac">
            <div
              class="refund-status-item"
              :class="{ active: currentstatus > index }"
              v-for="(item, index) in refundstatuslist"
            >
              {{ item }}
            </div>
          </div>
          <div class="refund-form-cont" v-if="false">
            <RefundForm />
          </div>
          <div class="refund-Steps-cont">
            <RefundSteps />
          </div>
          <div class="refun-info-box-cont">
            <RefunInfoBox />
          </div>
        </div>
        <div class="refund-right">
          <OrderInfoCard />
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

const refundstatuslist = reactive([
  "1买家申请退款",
  "2卖家处理退款申请",
  "3寄回商品",
  "4退款完毕",
]);
const currentstatus = ref(3);
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.refund-left {
  width: 810px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.refund-status-item {
  width: 180px;
  height: 50px;
  background: #f6f6f6;
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
}
.active {
  background: util.$ThemeColors;
}
.refund-form-cont {
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
