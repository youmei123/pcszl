<template>
  <div>
    <div v-if="orderList.length != 0 && !listLoading">
      <div class="order-item" v-for="(item, index) in orderList" :key="index">
        <div class="order-statu-bar f-ac">
          <div class="order-time">2025-1-10 10:56</div>
          <div class="order-idcard">订单号：{{ item.orderNo }}</div>
          <div class="order-status">
            <div class="order-status-item1" v-if="item.status == 0">
              待付款
            </div>
            <div class="order-status-item2" v-if="tabIndex != 5 && item.status == 1">
              交易成功
            </div>
            <div class="order-status-item2" v-if="item.status == 2">
              已取消
            </div>
            <div class="order-status-item1"
              v-if="tabIndex != 5 && item.status == 3 && (!item.aftersaleId || item.aftersaleStatus == 3 || item.aftersaleStatus == 4)">
              待发货
            </div>
            <div class="order-status-item1"
              v-if="tabIndex != 5 && item.status == 4 && (!item.aftersaleId || item.aftersaleStatus == 3 || item.aftersaleStatus == 4)">
              待收货
            </div>
            <div class="order-status-item1" v-if="item.refundStatus == 0">
              退款中
            </div>
            <div class="order-status-item2"
              v-if="tabIndex != 4 && item.refundStatus == 1 && (item.aftersaleStatus != 3 && item.aftersaleStatus != 4)">
              退款完成
            </div>
            <div class="order-status-item1" v-if="tabIndex == 5 && item.aftersaleStatus == 3 || item.aftersaleStatus == 4">
              拒绝退款
            </div>
          </div>
          <div class="order-link-detail pointer" @click="linkorderdetail(item)">订单详情</div>
        </div>
        <div class="order-info-bar f-jb-ac">
          <div class="order-product-box f-ac">
            <div class="order-product-img">
              <img v-if="item.productImg" :src="item.productImg" />
            </div>
            <div class="order-product-name u-line-2">
              {{item.productName}}
            </div>
          </div>
          <div class="order-count-cont">
            <div>￥{{item.productPrice}}</div>
            <div>X{{item.count}}</div>
          </div>
          <div class="order-delivery-cont">
            <div>运费</div>
            <div>￥{{ orderPrice(item) }}</div>
          </div>
          <div class="order-price-cont">
            <div>需付款</div>
            <div>￥{{ priceNum(item) }}</div>
          </div>
          <div class="order-switch-cont">
            <div class="order-pay-btn order-pay-btn-bg pointer" @click="submitpay(item)" v-if="item.status==0">
              付款
            </div>
            <div class="order-pay-btn pointer" v-if="(item.status>=1 && item.status!=3) || item.aftersaleId">
              再买一单
            </div>
            <div class="order-pay-btn pointer" @click="urge(item)"
              v-if="tabIndex!=5 && item.status==3 && (!item.aftersaleId || item.refundStatus==2 || item.aftersaleStatus==3 || item.aftersaleStatus==4)">
              催发货
            </div>
            <div class="order-pay-btn pointer" @click="receivegoods(item)"
              v-if="tabIndex!=5 && item.status==4 && (!item.aftersaleId || item.refundStatus==2 || item.aftersaleStatus==3 || item.aftersaleStatus==4)">
              确认收货
            </div>
            <div class="order-none-btn pointer" @click="afterSales(item)" v-if="item.aftersaleIsShow==1 &&isopen==1">
              申请售后
            </div>
            <div class="order-none-btn pointer" v-if="item.status==0" @click="cancelOrder(item)">
              取消订单
            </div>
            <div class="order-none-btn pointer" v-if="item.status!=4 || item.aftersaleId">
              联系客服
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="height: 400px">
      <div v-if="listLoading">
        <loading :translateY="50" color="#FCDC46" active text="正在加载中..." />
      </div>
      <el-empty v-else description="暂无数据" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { 
  ordersCancel,
  updateDeliveryOrder,
 } from "@/api/order";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineEmits } from 'vue';
import { ordersType } from "@/utiles/types";
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();
const emit = defineEmits(['changeGetList','Popup']);
const router = useRouter();
const props = defineProps({
  tabIndex: {
    type: Number,
    default: 0,
  },
  listLoading: {
    type: Boolean,
    default: false,
  },
  orderList: {
    type: Array<ordersType>,
    default: [],
  },
  isopen: {
    type: Number,
    default: 0,
  },
});

// 订单详情
const linkorderdetail = (item:any) => {
  router.push({
    path:"/orderdetail",
    query:{
      orderId:item.id,
      status:item.status,
      refundStatus:item.refundStatus,
      aftersaleStatus:item.aftersaleStatus,
      tabIndex:props.tabIndex,
      isopen:props.isopen
    }
  });
};
// 计算需付金额
const priceNum=(item:any)=>{
  let coinNumPrice:any=0
  let couponMoney:any=0
  if(item.healthcoinCount){
    coinNumPrice=(item.healthcoinCount/10000).toFixed(2)
  }
  if(item.couponMoney){
    couponMoney=item.couponMoney
  }
  let price:any=(item.truePrice*item.count).toFixed(2)
  return (price - coinNumPrice - couponMoney).toFixed(2)
}
// 判断是否有运费
const orderPrice = (item:any)=>{
  if(item.consigneeAddress && (item.consigneeAddress.includes("西藏自治区") || item.consigneeAddress.includes("新疆维吾尔自治区"))){
    return 20
  }else{
    return 0
  }
}
// 催发货
const urge = (item:any) => {
  ElMessage({
    type: 'success',
    message: '平台已为您跟进！',
  })
}

// 取消订单
const cancelOrder=async(item:any)=>{
   ElMessageBox.confirm(
    '是否要取消订单？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
    const res = await ordersCancel({
      id:item.id
    });
    if(res.status==0){
      ElMessage({
        type: 'success',
        message: '取消成功',
      })
      emit('changeGetList')
    }
    
  }).catch(() => {})
}

// 确认收货
const receivegoods =(item:any)=>{
  ElMessageBox.confirm(
    '是否要确认收货？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
    const res = await updateDeliveryOrder({
      userId: userStore.userId,
      ordersId:item.id
    });
    if(res.status==0){
      ElMessage({
        type: 'success',
        message: '确认收货成功!',
      })
      emit('changeGetList')
    }
    
  }).catch(() => {})
}
// 付款
const submitpay =(item:any)=>{

}
// 申请售后
const afterSales = (item:any)=>{
  if(isOverOneMonth(item.payTime)){
    return
  }
  if(!item.payTime && isOverOneMonth(item.addtime)){
    return
  }
  if(item.isEntity==1){
    emit('Popup',item)
  }else{
   linkToRefundPage(item)
  }
}
// 售后跳转
const linkToRefundPage = (item:any) => {
  router.push({
    path:"/orderrefund",
    query:{
      orderId:item.id,
    }
  });
};
// 订单从支付时间开始是否超过一个月
const isOverOneMonth = (payTime:any)=>{
  let currentTime = Date.now(); // 当前时间戳，单位是毫秒
  let oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // 30天的毫秒数
  // 比较当前时间与给定时间戳差值是否超过一个月
  return (currentTime - payTime) > oneMonthInMillis;
}
</script>

<style lang="scss" scoped>
.order-item:not(:first-child) {
  margin-top: 10px;
}

.order-statu-bar>div {
  margin-right: 15px;
}

.order-time,
.order-idcard {
  color: #999999;
}

.order-status-item1 {
  width: 60px;
  height: 24px;
  background: rgb(255, 233, 232);
  border-radius: 4px;
  color: #fb2b1e;
  text-align: center;
  line-height: 24px;
}

.order-status-item2 {
  width: 77px;
  height: 24px;
  background: rgb(245, 245, 245);
  border-radius: 4px;
  color: #999999;
  text-align: center;
  line-height: 24px;
}

.order-link-detail {
  color: #fb2b1e;
}

.order-info-bar {
  line-height: 24px;
  margin-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
}

.order-product-img {
  width: 100px;
  height: 100px;
  overflow: hidden;
  // background: util.$ThemeColors;
}

.order-product-img img {
  width: 100%;
  height: 100%;
}

.order-product-name {
  color: #212930;
  width: 250px;
  margin-left: 15px;
}

.order-count-cont {
  color: #999999;
  text-align: center;
}

.order-delivery-cont {
  color: #999999;
  text-align: center;
}

.order-price-cont {
  color: #fb2b1e;
}

.order-switch-cont {
  text-align: center;
}

.order-switch-cont div {
  margin-bottom: 5px;
}

.order-pay-btn-bg {
  background: util.$ThemeColors;
  border: none;
}
.order-pay-btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  box-sizing: border-box;
  border: 1px solid #DDDDDD;
}

.order-none-btn:hover {
  color: util.$ThemeColors;
}
</style>
