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
          <div class="delivery-bar" v-if="order.deliveryName">
            <text class="delivery-status" v-if="order.status==4">运送中</text>
            <text class="delivery-status"  v-if="order.status==1">已签收</text>
            <text class="delivery-info" v-if="stepData && stepData[0]?.desc">{{ stepData[0].desc }}</text>
            <text class="look-delivery pointer" @click="openPopup()">查看物流详情></text>
          </div>
          <div class="user-address-info f-as">
            <div class="address-icon">
              <div class="iconfont icon-ziyuan"></div>
            </div>
            <div>
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
      <div v-if="pageLoading">
        <loading :translateY="50"  color="#FCDC46" active text="正在加载中..." :height="400" />
      </div>
    </div>
    <RefundPopuo :order="order" :visible="isshowRefundPopuo" @close="isshowRefundPopuo = false"  />
    <customerPopup ref="customerPopups" :mobile="mobile" :qrCode="qrCode" />
    <defineStep ref="defineSteps" :order="order" :expressdelivery="expressdelivery" :stepData="stepData" />
     <el-dialog
      v-model="PayQrcodeDialogVisible"
      title="支付二维码"
      width="350"
      align-center
      :close-on-click-modal="false"
    >
      <div class="dialog-content f-jc-ac">
        <qrcode-vue :value="qrcodeurl" :size="300" class="qrcode-container" />
      </div>
      <template #footer>
        <div class="buy-btn pointer" @click="paysuccess">已完成支付</div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import OrderInfoCard from "../components/OrderInfoCard/index.vue";
import RefundPopuo from "@/views/usercenter/menuitem/myorder/components/RefundPopup/index.vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import customerPopup from '../components/customerPopup/index.vue'
import {
  singleOrdersById,
  postage,
  ordersCancel,
  updateDeliveryOrder,
  aftersaleCancel,
  customerServiceMobile,
  companyCodeList,
  expressRouts,
 } from "@/api/order";
 import { submitSingle } from "@/api/usercenter";
import { useRoute,useRouter } from 'vue-router';
import { ordersType,aftersale } from "@/utiles/types";
import { useUserStore } from "@/store/userStore";
import defineStep from '../components/defineStep/index.vue'
import QrcodeVue from "qrcode.vue";
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
const mobile =ref("")//联系电话
const qrCode =ref("")//联系二维码
const customerPopups = ref<any>()
const expressdelivery =ref(<any>{})
const stepData = ref(<any>[])
const defineSteps = ref<any>()
const pageLoading = ref(false)
const qrcodeurl = ref("");
const PayQrcodeDialogVisible = ref(false); // 支付二维码弹窗
// 订单详情
const singleOrders=async ()=>{
  pageLoading.value=true
  const res = await singleOrdersById({
    orderId:orderId.value,
  });
  pageLoading.value=false
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
    if (order.value.deliveryName) {
      getexpressdeliveryinfo();
      
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
    submitpay()
  }
  if(type == "联系客服"){
    linkcustomerservice()
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
    ElMessage.success("订单已超过1个月，无法申请售后")
    return
  }
  if(!order.value.payTime && isOverOneMonth(order.value.addtime)){
    ElMessage.success("订单已超过1个月，无法申请售后")
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
// 付款
const submitpay = async ()=>{
   let params: any = {
    userId: userStore.userId,
    payTypeCode: "WXPAY",
    truePrice:order.value.truePrice,
    productPrice:order.value.productPrice,
    count:order.value.count,
    orderType:7,
    productId:order.value.productId,
    payType:4,
    id:order.value.id
  };
  const { status, data, message } = await submitSingle(params);
  if (status == "0") {
    qrcodeurl.value = data.qrCode;
    PayQrcodeDialogVisible.value = true;
  } else {
    if (message) {
      ElMessage.warning(message);
    }
  }
}
// 支付弹窗 点击已完成支付
const paysuccess = () => {
  PayQrcodeDialogVisible.value = false;
};
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
  if(order.value.isEntity!=1){
    return 0
  }
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
// 获取客服信息
const linkcustomerservice = async ()=>{
  const res = await customerServiceMobile({});
  if(res.status==0){
    mobile.value=res.data.mobile
    qrCode.value=res.data.qrCode || ''
    customerPopups.value.linkcustomerservice();
  }
}
// 打开物流弹窗
const openPopup = ()=>{
  if(order.value.deliveryName){
    defineSteps.value.linkcustomerservice()
  }else{
    ElMessage.error("暂无物流信息")
  }
}
// 获取物流数据
const getexpressdeliveryinfo = async ()=>{
  if(!order.value.deliveryName){
    ElMessage.error("暂无物流信息")
    return
  }
  pageLoading.value=true
  const res = await companyCodeList({
    name:order.value.deliveryName
  });
  expressdelivery.value = res.data[0] || ''
  if (expressdelivery) {
    materialflow();
  }
}
const materialflow = async ()=>{
  const res = await expressRouts({
    expressCompanyCode: expressdelivery.value.code,
    expressNumber: order.value.deliveryNumber,
    checkPhoneNo: order.value.consigneeMobile
  });
  pageLoading.value=false
  if (res.data && res.data.length > 0) {
    stepData.value = res.data.map((item:any, index:number) => {
      return {
        name: item.status,
        time: item.acceptTime,
        type: 1,
        isNow: index <= 0 ? 1 : 0,
        desc: item.remark
      }
    })
   
  }
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
.detail-cont{
  position: relative;
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
  margin: 15px 0 0;
  display: inline-block;
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
.user-address-info{
  margin-top: 15px;
}
.buy-btn {
  width: 100%;
  height: 50px;
  background: #fcdc46;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  margin-top: 20px;
}
</style>
