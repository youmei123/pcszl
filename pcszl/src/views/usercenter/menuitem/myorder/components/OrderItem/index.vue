<template>
  <div class="order-item">
    <div class="order-statu-bar f-ac">
      <div class="order-time">2025-1-10 10:56</div>
      <div class="order-idcard">订单号：20031023301</div>
      <div class="order-status">
        <!-- <div class="order-status-item1">待付款</div> -->
        <div class="order-status-item2">交易成功</div>
      </div>
      <div class="order-link-detail pointer" @click="linkorderdetail">订单详情></div>
    </div>
    <div class="order-info-bar f-jb-ac">
      <div class="order-product-box f-ac">
        <div class="order-product-img">
          <img />
        </div>
        <div class="order-product-name u-line-2">
          砭石按摩锥点按穴位文化用品砭石按 摩锥点按穴位文化用品 拷贝 3
        </div>
      </div>
      <div class="order-count-cont">
        <div>￥168</div>
        <div>X1</div>
      </div>
      <div class="order-delivery-cont">
        <div>运费</div>
        <div>￥0</div>
      </div>
      <div class="order-price-cont">
        <div>需付款</div>
        <div>￥168</div>
      </div>
      <div class="order-switch-cont">
        <div class="order-pay-btn pointer">付款</div>
        <div class="order-none-btn pointer">取消订单</div>
        <div class="order-none-btn pointer">联系客服</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const linkorderdetail = () => {
  router.push("/orderdetail");
};
</script>

<style lang="scss" scoped>
.order-item:not(:first-child) {
  margin-top: 10px;
}
.order-statu-bar > div {
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
  background: util.$ThemeColors;
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
.order-pay-btn {
  width: 100px;
  height: 40px;
  background: util.$ThemeColors;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
}
.order-none-btn:hover {
  color: util.$ThemeColors;
}
</style>
