<template>
  <div class="refund-info-box">
    <div class="info-list">
      <div class="info-item f-ac">
        <div class="info-label">退货商品</div>
        <div class="info-cont">
          <div class="form-product-bar f-ac">
            <div class="product-img-box"></div>
            <div class="product-info">
              <div class="u-line-1">砭石按摩锥点按穴位文化用品</div>
              <div class="f-ac">
                <div style="margin-right: 20px">￥168</div>
                <div>X1</div>
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
          <div style="color: #fb2b1e">￥336</div>
        </div>
      </div>
      <div class="info-item f-ac">
        <div class="info-label">
          退款理由
          <div class="icon">*</div>
        </div>
        <div class="info-cont">
          <div>不想要了</div>
        </div>
      </div>
      <div class="info-item f-ac">
        <div class="info-label">退款说明</div>
        <div class="info-cont">
          <div>买多了</div>
        </div>
      </div>
      <div class="info-item f-ac">
        <div class="info-label">上传凭证</div>
        <div class="info-cont">
          <div class="img-box">
            <img />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
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
