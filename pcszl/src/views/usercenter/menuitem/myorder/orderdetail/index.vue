<template>
  <div class="page-container">
    <div class="breadcrumb-cont content">
      <el-breadcrumb :separator-icon="DArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/usercenter/myorder' }"
          >我的订单</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail-cont content f-jb-as">
      <div class="detail-left">
        <div class="status-title">{{ statusTitle }}</div>
        <div v-if="order.isEntity==1 && (!aftersaleList.id || aftersaleList.refundStatus==2 || (tabIndex!=5 && (aftersaleList.status==3 || aftersaleList.status==4)))">
          <div class="delivery-bar f-ac">
            <div class="delivery-status" v-if="order.status==4">运送中</div>
            <div class="delivery-status"  v-if="order.status==1">已签收</div>
            <div class="delivery-info">您已在安农大北二门新菜鸟驿站完成取件</div>
            <div class="look-delivery pointer">查看物流详情></div>
          </div>
          <div class="user-address-info f-as">
            <div class="address-icon">
              <div class="iconfont icon-ziyuan"></div>
            </div>
            <div class="user-address-info">
              <div class="user-address-text">
                {{order.consigneeAddress}}
              </div>
              <div class="user-info f-ac">
                <div class="user-name">{{order.consignee}}</div>
                <div class="user-mobile">{{order.consigneeMobile}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-product-info f-jb-ac">
          <div class="f-ac">
            <div>
              <div class="product-img">
                <img :src="order.productImg" />
              </div>
            </div>
            <div class="product-name">{{order.productName}}</div>
          </div>
          <div class="f-ac">
            <div class="product-price">￥{{order.productPrice}}</div>
            <div class="product-count">X{{order.count}}</div>
          </div>
        </div>
        <div class="switch-bar f-je-ac">
          <div class="none-btn pointer">再买一单</div>
          <div class="none-btn pointer" @click="handlebtnchange('联系客服')" v-if="order.status==0">联系客服</div>
          <div class="none-btn pointer" @click="afterSales()" v-if="order.aftersaleIsShow==1 && isopen==1">申请售后</div>
          <div class="color-btn pointer" @click="linkToRefundPage()" v-if="aftersaleList.refundStatus==0 && tabIndex==5">退款中</div>
          <div class="color-btn pointer" @click="linkToRefundPage()" v-if="aftersaleList.refundStatus==1 && (aftersaleList.status!=3 && aftersaleList.status!=4) && tabIndex==5">退款完成</div>
          <div class="none-btn pointer" v-if="aftersaleList.refundStatus==2">已取消</div>
          <div class="none-btn pointer" v-if="(aftersaleList.status==3 || aftersaleList.status==4) && tabIndex==5">拒绝退款</div>
        </div>
      </div>
      <div class="detail-right">
        <OrderInfoCard :order="order" :aftersaleList="aftersaleList" :orderPrice="orderPrice" :priceNum="priceTotal" :tabIndex="tabIndex" :isbutton="true" 
          @handlebtnchange="handlebtnchange" />
      </div>
    </div>
    <RefundPopuo :order="order" :visible="isshowRefundPopuo" @close="isshowRefundPopuo = false"  />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import OrderInfoCard from "../components/OrderInfoCard/index.vue";
import RefundPopuo from "@/views/usercenter/menuitem/myorder/components/RefundPopup/index.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  singleOrdersById,
  postage,
  ordersCancel,
  updateDeliveryOrder,
  aftersaleCancel,
 } from "@/api/order";
import { useRoute,useRouter } from 'vue-router';
import { ordersType,aftersale } from "@/utiles/types";
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const isshowRefundPopuo = ref(false);//是否显示退款弹窗
const orderId = ref(route.query.orderId);//订单id
const tabIndex = ref(Number(route.query.tabIndex));//当前tab索引
const isopen = ref(Number(route.query.isopen));//是否有售后
const statusTitle = ref("")//标题状态
const order = ref(<ordersType>{})
const orderPrice = ref(0)//运费
const aftersaleList = ref(<aftersale>{})//售后信息
const priceTotal =ref("")//需付款
// 订单详情
const singleOrders=async ()=>{
  const res = await singleOrdersById({
    orderId:orderId.value,
  });
  if(res.status==0){
    order.value=res.data
    priceNum()
    if(order.value.consigneeAddress){
      getOrderPrice()
    }
    if(order.value.aftersaleList && order.value.aftersaleList.length!=0){
      aftersaleList.value=order.value.aftersaleList[0]
      upStatusTitle(order.value.status,aftersaleList.value.refundStatus,aftersaleList.value.status)
    }else{
      aftersaleList.value=<aftersale>{}
    }
  }
}
// 右边点击返回
const handlebtnchange = (type: string) => {
  console.log(type);
  if(type == "取消订单"){
    cancelOrder()
  }
  if(type == "付款"){

  }
  if(type == "联系客服"){
    
  }
  if(type == "取消退款"){
    revoke()
  }
  if(type == "确认收货"){
    receivegoods()
  }
};
// 申请售后
const afterSales = ()=>{
  if(isOverOneMonth(order.value.payTime)){
    return
  }
  if(!order.value.payTime && isOverOneMonth(order.value.addtime)){
    return
  }
  if(order.value.isEntity==1){
    isshowRefundPopuo.value = true;
  }else{
   linkToRefundPage()
  }
}
// 售后跳转
const linkToRefundPage = () => {
  router.push({
    path:"/orderrefund",
    query:{
      orderId:order.value.id,
    }
  });
};
// 取消订单
const cancelOrder=async()=>{
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
      id:order.value.id
    });
    if(res.status==0){
      ElMessage({
        type: 'success',
        message: '取消成功',
      })
      singleOrders()
    }
    
  }).catch(() => {})
}
// 确认收货
const receivegoods =()=>{
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
      ordersId:order.value.id
    });
    if(res.status==0){
      ElMessage({
        type: 'success',
        message: '确认收货成功!',
      })
      singleOrders()
    }
    
  }).catch(() => {})
}
// 撤销申请
const revoke =()=>{
  ElMessageBox.confirm(
    '是否要撤销退款？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
    const res = await aftersaleCancel({
      userId: userStore.userId,
      aftersaleId:aftersaleList.value.id
    });
    if(res.status==0){
      ElMessage({
        type: 'success',
        message: '撤销成功!',
      })
      singleOrders()
    }
    
  }).catch(() => {})
}
// 判断标题状态
const upStatusTitle = (status: any,refundStatus: any,aftersaleStatus: any)=>{
  if(tabIndex.value==5){
    if(refundStatus==0){
      statusTitle.value='退款中'
    }else if(refundStatus==1 && (aftersaleStatus!=3 && aftersaleStatus!=4)){
      statusTitle.value='退款完成'
    }else if(aftersaleStatus==3 || aftersaleStatus==4){
      statusTitle.value='拒绝退款'
    }else{
      statusTitle.value='订单详情'
    }
  }else{
    if(status==0){
      statusTitle.value='待付款'
    }else if(status==1){
      statusTitle.value='交易成功'
    }else if(status==2){
      statusTitle.value='已取消'
    }else if(status==3){
      statusTitle.value='待发货'
    }else if(status==4){
      statusTitle.value='待收货'
    }else{
      statusTitle.value='订单详情'
    }
  }
}
// 获取运费
const getOrderPrice= async ()=>{
  if(!order.value.consigneeAddress || 
    (!order.value.consigneeAddress.includes("西藏自治区") && !order.value.consigneeAddress.includes("新疆维吾尔自治区"))){
    orderPrice.value=0
    return
  }
  let text=''
  if(order.value.consigneeAddress.includes("西藏自治区")){
    text='西藏'
  }else if(order.value.consigneeAddress.includes("新疆维吾尔自治区")){
    text='新疆'
  }
   const res = await postage({
    address:text
  });
  if (res.status == '0') {
   orderPrice.value=Number(res.data)
  }
}
// 计算需付金额
const priceNum=()=>{
  let coinNumPrice:any=0
  let couponMoney:any=0
  if(order.value.healthcoinCount){
    coinNumPrice=(order.value.healthcoinCount/10000).toFixed(2)
  }
  if(order.value.couponMoney){
    couponMoney=order.value.couponMoney
  }
  let price:any=(order.value.truePrice*order.value.count).toFixed(2)
  priceTotal.value=(price - coinNumPrice - couponMoney).toFixed(2)
}
// 订单从支付时间开始是否超过一个月
const isOverOneMonth = (payTime:any)=>{
  let currentTime = Date.now(); // 当前时间戳，单位是毫秒
  let oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // 30天的毫秒数
  // 比较当前时间与给定时间戳差值是否超过一个月
  return (currentTime - payTime) > oneMonthInMillis;
}
onMounted(()=>{
  if(route.query.orderId){
    upStatusTitle(route.query.status,route.query.refundStatus,route.query.aftersaleStatus)
    singleOrders()
  }
})
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.detail-left {
  width: 810px;
  height: 620px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.status-title {
  font-size: 28px;
  font-weight: bold;
}
.delivery-bar {
  margin: 15px 0;
}
.delivery-info {
  color: #000;
}
.delivery-status {
  color: #fb2b1e;
  margin-right: 5px;
}
.look-delivery {
  color: #fb2b1e;
}
.user-address-text {
  color: #000;
}
.user-info {
  color: #999999;
  margin-top: 10px;
}
.user-name {
  margin-right: 15px;
}
.iconfont {
  font-size: 20px;
  margin-right: 10px;
}
.order-product-info {
  width: 100%;
  background: #f6f6f6;
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
}
.product-img {
  width: 60px;
  height: 60px;
  overflow: hidden;
}
.product-img img {
  width: 100%;
  height: 100%;
}
.product-name {
  margin-left: 30px;
}
.product-price {
  margin-right: 60px;
}
.product-count {
  margin-right: 50px;
}
.switch-bar {
  margin-top: 20px;
}
.none-btn {
  width: 100px;
  height: 40px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #dddddd;
  text-align: center;
  line-height: 40px;
  margin-left: 15px;
}
.color-btn {
  width: 100px;
  height: 40px;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #ce9433;
  text-align: center;
  line-height: 40px;
  color: #ce9433;
  margin-left: 15px;
}
</style>
