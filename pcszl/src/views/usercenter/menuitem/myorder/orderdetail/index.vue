<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-30 14:14:25
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 10:24:15
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\orderdetail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
        <div class="status-title">退款完成</div>
        <div class="delivery-bar f-ac">
          <div class="delivery-status">已签收</div>
          <div class="delivery-info">您已在安农大北二门新菜鸟驿站完成取件</div>
          <div class="look-delivery pointer">查看物流详情></div>
        </div>
        <div class="user-address-info f-as">
          <div class="address-icon">
            <div class="iconfont icon-ziyuan"></div>
          </div>
          <div class="user-address-info">
            <div class="user-address-text">
              山东省济南市历城区王舍人街(济南东站地铁站出口步行120米)
            </div>
            <div class="user-info f-ac">
              <div class="user-name">小明</div>
              <div class="user-mobile">13500100203</div>
            </div>
          </div>
        </div>
        <div class="order-product-info f-jb-ac">
          <div class="f-ac">
            <div>
              <div class="product-img">
                <img />
              </div>
            </div>
            <div class="product-name">砭石按摩锥点按穴位文化用品</div>
          </div>
          <div class="f-ac">
            <div class="product-price">￥168</div>
            <div class="product-count">X1</div>
          </div>
        </div>
        <div class="switch-bar f-je-ac">
          <div class="none-btn pointer">再买一单</div>
          <div class="color-btn pointer">退款完成</div>
        </div>
      </div>
      <div class="detail-right">
        <OrderInfoCard @handlebtnchange="handlebtnchange" />
      </div>
    </div>
    <RefundPopuo :visible="isshowRefundPopuo" @close="isshowRefundPopuo = false"  />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { DArrowRight } from "@element-plus/icons-vue";
import OrderInfoCard from "../components/OrderInfoCard/index.vue";
import RefundPopuo from "../components/RefundPopup/index.vue";

const isshowRefundPopuo = ref(false);
const handlebtnchange = (type: string) => {
  console.log(type);
  if (type == "联系客服") {
    isshowRefundPopuo.value = true;
  }
};
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
