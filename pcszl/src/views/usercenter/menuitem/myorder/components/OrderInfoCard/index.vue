<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-30 15:25:58
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 10:05:01
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\components\OrderInfoCard\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="order-info-card">
    <div class="card-title">订单信息</div>
    <div class="order-info-list">
      <div class="item-bar f-jb-ac">
        <div class="order-label">商品总价:</div>
        <div class="order-value">￥{{(order.truePrice - orderPrice).toFixed(2)}}</div>
      </div>
      <div class="item-bar f-jb-ac">
        <div class="order-label">订单运费:</div>
        <div class="order-value">￥{{ orderPrice }}</div>
      </div>
      <div class="item-bar f-jb-ac">
        <div class="order-label">{{order.status==0?'需付款：':'实付款：'}}</div>
        <div class="order-value" style="color: #fb2b1e">￥{{ priceNum }}</div>
      </div>
    </div>
    <div class="other-info-list" :class="{'falseBorder':!isbutton}">
      <div class="other-item f-jb-ac">
        <div class="other-label">订单编号：</div>
        <div class="other-value">{{order.orderNo}}</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">下单时间：</div>
        <div class="other-value">{{ timeFormat(order.addtime,'yyyy-mm-dd hh:MM:ss')}}</div>
      </div>
      <div class="other-item f-jb-ac" v-if="order.payTime">
        <div class="other-label">付款时间：</div>
        <div class="other-value">{{ timeFormat(order.payTime,'yyyy-mm-dd hh:MM:ss') }}</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">支付方式：</div>
        <div class="other-value">{{order.payType==0?'微信支付':order.payType==1?'APP支付':'快手支付'}}</div>
      </div>
      <div class="other-item f-jb-ac" v-if="order.deliveryTime">
        <div class="other-label">发货时间：</div>
        <div class="other-value">{{ timeFormat(order.deliveryTime,'yyyy-mm-dd hh:MM:ss')}}</div>
      </div>
      <div class="other-item f-jb-ac" v-if="order.deliveryName" >
        <div class="other-label">物流公司：</div>
        <div class="other-value">{{order.deliveryName}}</div>
      </div>
      <div class="other-item f-jb-ac" v-if="order.deliveryNumber">
        <div class="other-label">快递单号：</div>
        <div class="other-value">{{order.deliveryNumber}}</div>
      </div>
      <div class="other-item f-jb-ac" v-if="order.remark">
        <div class="other-label">备注：</div>
        <div class="other-value">{{order.remark}}</div>
      </div>
    </div>
    <div class="switch-bar f-je-ac" v-if="isbutton">
      <div class="none-btn pointer" @click="$emit('handlebtnchange','取消订单')" v-if="order.status==0">
        取消订单
      </div>
      <div class="none-btn order-pay-btn-bg pointer" @click="$emit('handlebtnchange','付款')" v-if="order.status==0">
        付款
      </div>
      <div class="none-btn pointer" @click="$emit('handlebtnchange','联系客服')" v-if="order.status!=0">
        联系客服
      </div>
      <div class="none-btn pointer" @click="$emit('handlebtnchange','取消退款')" 
        v-if="aftersaleList.refundStatus==0 && !aftersaleList.deliveryNumber">
        取消退款
      </div>
      <div class="none-btn pointer" @click="urge()" 
        v-if="order.status==3 && (!aftersaleList.id || aftersaleList.refundStatus==2 || tabIndex!=5)">
        催发货
      </div>
      <div class="none-btn pointer" @click="$emit('handlebtnchange','确认收货')" 
        v-if="order.status==4 && (!aftersaleList.id || aftersaleList.refundStatus==2 || aftersaleList.refundStatus==1) && tabIndex!=5">
        确认收货
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { timeFormat } from "@/utiles/public"
const props = defineProps({
  order:{
    type: Object,
    default: {}
  },
  aftersaleList:{
    type:Object,
    default:{}
  },
  orderPrice:{
    type:Number,
    default:0
  },
  priceNum:{
    type:String,
    default:""
  },
  tabIndex:{
    type:Number,
    default:0
  },
  isbutton:{
    type:Boolean,
    default:false
  }
});

// 催发货
const urge = () => {
  ElMessage({
    type: 'success',
    message: '平台已为您跟进！',
  })
}
</script>

<style lang="scss" scoped>
.order-info-card {
  width: 370px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.card-title {
  font-size: 28px;
  font-weight: bold;
}
.order-info-list {
  padding: 15px 0;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  margin-top: 15px;
}
.item-bar {
  line-height: 35px;
  font-weight: bold;
}
.other-info-list {
  padding: 15px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
}
.falseBorder{
  border-bottom: none;
  padding: 15px 0 0;
}
.other-item {
  line-height: 35px;
}
.none-btn {
  width: 150px;
  height: 50px;
  background: #ffffff;
  border-radius: 25px;
  border: 1px solid #dddddd;
  text-align: center;
  line-height: 50px;
  margin-top: 20px;
  margin-left: 15px;
}
.order-pay-btn-bg {
  background: util.$ThemeColors;
  border: none;
}
.switch-bar :first-child{
  margin-left: 0 !important;
}
</style>
