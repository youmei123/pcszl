<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-30 15:25:58
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-30 16:36:15
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\components\OrderInfoCard\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="order-info-card">
    <div class="card-title">订单信息</div>
    <div class="order-info-list">
      <div class="item-bar f-jb-ac">
        <div class="order-label">商品总价:</div>
        <div class="order-value">￥336</div>
      </div>
      <div class="item-bar f-jb-ac">
        <div class="order-label">订单运费:</div>
        <div class="order-value">￥0</div>
      </div>
      <div class="item-bar f-jb-ac">
        <div class="order-label">实付款:</div>
        <div class="order-value" style="color: #fb2b1e">￥336</div>
      </div>
    </div>
    <div class="other-info-list">
      <div class="other-item f-jb-ac">
        <div class="other-label">订单编号：</div>
        <div class="other-value">20031023301</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">下单时间：</div>
        <div class="other-value">2025-1-10 10:56:13</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">付款时间：</div>
        <div class="other-value">2025-1-10 10:56:18</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">支付方式：</div>
        <div class="other-value">微信支付</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">发货时间：</div>
        <div class="other-value">2025-1-10 10:56:18</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">物流公司：</div>
        <div class="other-value">邮政</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">快递单号：</div>
        <div class="other-value">20031023301</div>
      </div>
      <div class="other-item f-jb-ac">
        <div class="other-label">备注：</div>
        <div class="other-value">无</div>
      </div>
    </div>
    <div class="switch-bar f-je-ac">
      <div class="none-btn pointer">取消退款</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
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
}
</style>
