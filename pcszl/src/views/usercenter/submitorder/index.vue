<template>
  <div class="page-container">
    <div class="submit-order-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>提交订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="submit-order-content f-jb-as">
        <div class="submit-order-left">
          <VirtualOrder v-if="types == 1" />
          <EntityCreateOrder v-else />
        </div>
        <el-affix :offset="145" target=".submit-order-content">
          <div class="submit-order-right">
            <div class="right-title">付款详情</div>
            <div class="row-list">
              <div class="row-item f-jb-ac">
                <div>商品总价:</div>
                <div>￥336</div>
              </div>
              <div class="row-item f-jb-ac">
                <div>订单运费:</div>
                <div>￥0</div>
              </div>
              <div class="row-item f-jb-ac">
                <div>需付款:</div>
                <div class="price">￥336</div>
              </div>
              <div class="row-item f-jb-ac">
                <div>商品总价:</div>
                <div class="f-ac">
                  <div class="iconfont icon-weixinzhifu"></div>
                  <div>微信支付</div>
                </div>
              </div>
            </div>
            <div class="buy-btn pointer">提交订单</div>
          </div>
        </el-affix>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import EntityCreateOrder from "../submitorder/components/EntityCreateOrder/index.vue";
import VirtualOrder from "../submitorder/components/VirtualOrder/index.vue";
import { useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
const route = useRoute();
const types = Number(route.query.types);
console.log(types);
</script>

<style lang="scss" scoped>
.page-container {
  min-height: auto !important;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.submit-order-left {
  width: 810px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.submit-order-right {
  width: 370px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.right-title {
  font-size: 22px;
  font-weight: bold;
  padding-bottom: 20px;
  border-bottom: 1px solid #dddddd;
  box-sizing: border-box;
}
.row-list {
  padding-bottom: 25px;
  border-bottom: 1px solid #dddddd;
  padding-top: 5px;
  box-sizing: border-box;
}
.row-item {
  margin-top: 20px;
  font-weight: bold;
}
.price {
  color: #fb2b1e;
}
.icon-weixinzhifu {
  color: rgb(21, 186, 17);
  margin-right: 5px;
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
