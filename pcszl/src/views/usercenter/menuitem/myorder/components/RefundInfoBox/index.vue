<template>
  <div class="refund-info-box">
    <div class="info-list">
      <div class="info-item f-ac">
        <div class="info-label">退货商品</div>
        <div class="info-cont">
          <div class="form-product-bar f">
            <div class="product-img-box">
              <img :src="order.productImg" />
            </div>
            <div class="product-info f-ja fd-c">
              <div class="u-line-1">{{order.productName}}</div>
              <div class="f-ac">
                <div style="margin-right: 20px">￥{{order.productPrice}}</div>
                <div>X{{order.count}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-item f-ac">
        <div class="info-label">
          退款金额
          <div class="icon">*</div>
        </div>
        <div class="info-cont">
          <div style="color: #fb2b1e">￥{{single.refundMoney}}</div>
        </div>
      </div>
      <div class="info-item f-ac">
        <div class="info-label">
          退款理由
          <div class="icon">*</div>
        </div>
        <div class="info-cont">
          <div>{{single.refundReason}}</div>
        </div>
      </div>
      <div class="info-item f-ac" v-if="single.refundRemark">
        <div class="info-label">退款说明</div>
        <div class="info-cont">
          <div>{{single.refundRemark}}</div>
        </div>
      </div>
      <div class="info-item f-ac" v-if="single.refundImg">
        <div class="info-label">上传凭证</div>
        <div class="info-cont">
          <div class="img-box">
            <img :src="single.refundImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { aftersale } from "@/utiles/types";
const props = defineProps({
  order:{
    type: Object,
    default: {}
  },
  single:{
    type: Object,
    default:<aftersale>{}
  },
  priceNum:{
    type:String,
    default:""
  },
});
</script>

<style lang="scss" scoped>
.refund-info-box {
  width: 100%;
  background: #f6f6f6;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  margin-top: 20px;
}
.product-info {
  margin-left: 10px;
  height: 60px;
}
.product-img-box {
  width: 60px;
  height: 60px;
  overflow: hidden;
  background-color: util.$ThemeColors;
}
.product-img-box img {
  width: 100%;
  height: 100%;
}
.info-item {
  margin-bottom: 15px;
}
.info-label {
  margin-right: 20px;
  position: relative;
}
.info-label .icon {
  position: absolute;
  right: -7px;
  top: 0;
  color: #fb2b1e;
}
.img-box {
  width: 60px;
  height: 60px;
  overflow: hidden;
  background-color: util.$ThemeColors;
}
.img-box img {
  width: 100%;
  height: 100%;
}
</style>
