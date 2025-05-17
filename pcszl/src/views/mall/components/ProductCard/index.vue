<template>
  <div class="product-card" :class="{ 'is-sticky': isSticky }">
    <div class="product-hint-bar">人气必选商品 资质保障 官方正品</div>
    <div class="title-bar u-line-2">
      <span class="title-tag">官方正品</span>
      {{ data.name }}
    </div>
    <div class="hot-bar f-jb-ac">
      <div>
        <div class="f-ae last-time-bar">
          <div class="affter-price" ><span>￥</span>{{ data.price }}</div>
          <div class="before-price" >￥{{ data.originalPrice }}</div>
        </div>
        <div class="f-ac">
          <div class="rob-count">
            疯抢{{ transNumberToShort(data.realSalesVolume + data.salesVolume) }}件
          </div>
          <div class="rob-txt">快要抢光</div>
        </div>
      </div>
      <div class="hot-right">
        <div class="hot-title">热卖中</div>
        <div class="hot-txt">人气必选商品</div>
      </div>
    </div>
    <div class="Label-bar f-ac">
      <div class="double-Label f-ac">
        <div class="discount" v-if="calculateDiscount(data.originalPrice, data.price)">
          大促享{{ calculateDiscount(data.originalPrice, data.price) }}
        </div>
        <div class="remainder-time">快要抢光</div>
      </div>
      <div class="Label-item" v-if="data.originalPrice != data.price">
        立省{{ (data.originalPrice - data.price).toFixed(2) }}
      </div>
    </div>
    <div class="tags-bar f-ac" v-if="data.labels">
      <div class="tag-item f-shrink0" v-for="item in data.labels.split(',')">
        {{ item }}
      </div>
    </div>
    <div class="commitment-cont">
      <div class="commitment-item f-ac">
        <div class="iconfont icon-anquanbaozhang"></div>
        <div>资质保障 不支持7天无理由退货</div>
      </div>
      <div class="commitment-item f-ac">
        <div class="iconfont icon-baozhang"></div>
        <div>48小时内发货 包邮(偏远地区除外)</div>
      </div>
      <div class="commitment-item f-ac">
        <div class="iconfont icon-liwuhuodong"></div>
        <div>新人专区 官方补贴 超低折扣</div>
      </div>
    </div>
    <div class="buy-btn pointer" @click="toBuy">立即购买￥{{ data.price }}</div>
  </div>
</template>

<script lang="ts" setup>
import { types } from "util";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { transNumberToShort } from "@/utiles/public";
import { useUserStore } from "@/store/userStore";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance()?.appContext.config.globalProperties; // 获取全局属性
const props = defineProps({
  isSticky: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {},
  },
});

const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
  if (originalPrice == discountedPrice) {
    return "";
  }
  const discount = (discountedPrice / originalPrice) * 10;
  return discount.toFixed(1) + "折"; // 返回几折，保留1位小数
};
const userStore = useUserStore();
const router = useRouter();
const toBuy = () => {
  console.log("立即购买");
  if (!userStore.token) {
    instance?.$openLoginPopup();
    return;
  }
  router.push({
    path: "/submitorder",
    query: {
      types: 7,
      productId: props.data.id,
    },
  });
};
</script>

<style lang="scss" scoped>
.product-card {
  height: 600px;
  width: 520px;
  position: relative;
  transition: all 0.3s ease;
}

.product-hint-bar {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  background-color: rgb(255, 233, 232);
  color: #fb2b1e;
  font-size: 16px;
  padding-left: 15px;
  box-sizing: border-box;
  line-height: 50px;
  border-radius: 4px;
}
.title-bar {
  margin-top: 20px;
  font-size: 26px;
  color: #212930;
  font-weight: bold;
  line-height: 30px;
}
.title-tag {
  background: #000000;
  color: #f6f6f6;
  font-size: 16px;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  line-height: 15px;
}
.hot-bar {
  width: 100%;
  height: 90px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/24/663265648369425371/pd_bar_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 20px;
}
.hot-right {
  text-align: right;
}
.hot-title {
  font-size: 30px;
  color: #fb2b1e;
  font-weight: bold;
  padding-right: 10px;
  box-sizing: border-box;
  margin-bottom: 5px;
}
.hot-txt {
  color: #fb2b1e;
  font-size: 22px;
  font-weight: bold;
}
.last-time-bar {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 5px;
}
.last-time-bar div:first-child {
  margin-right: 10px;
}
.rob-count {
  width: 110px;
  height: 34px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #fb2b1e;
  font-size: 16px;
  color: #fb2b1e;
  text-align: center;
  line-height: 34px;
}
.rob-txt {
  width: 80px;
  height: 34px;
  background: #fb2b1e;
  border-radius: 4px;
  border: 1px solid #ffffff;
  text-align: center;
  line-height: 34px;
  color: #ffffff;
  font-size: 16px;
  margin-left: 5px;
}
.Label-bar {
  margin-top: 15px;
}
.discount {
  width: 110px;
  height: 34px;
  background: #fb2b1e;
  border-radius: 4px 0px 0px 4px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  line-height: 34px;
}
.remainder-time {
  width: 90px;
  height: 34px;
  background: #ffffff;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid #fb2b1e;
  font-size: 16px;
  color: #fb2b1e;
  text-align: center;
  line-height: 34px;
  box-sizing: border-box;
}
.Label-item {
  height: 34px;
  background: #ffffff;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid #fb2b1e;
  font-size: 16px;
  color: #fb2b1e;
  text-align: center;
  line-height: 34px;
  box-sizing: border-box;
  margin-left: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
.tags-bar {
  overflow: hidden;
  margin-top: 20px;
  position: relative;
}

.tags-bar::before {
  content: "";
  /* 创建伪元素 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: -10px 0 30px rgba(255, 255, 255, 1) inset;
  z-index: 1;
  /* 确保阴影在文字下面 */
}

.tag-item {
  padding: 10px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  color: #212930;
  font-size: 16px;
  margin-right: 10px;
}
.commitment-cont {
  margin-top: 20px;
}
.commitment-item {
  height: 48px;
  line-height: 48px;
  color: #212930;
  border-top: 1px solid #eeeeee;
  box-sizing: border-box;
}
.icon-anquanbaozhang {
  color: #1cbb15;
}
.icon-liwuhuodong {
  color: #b6b6b6;
}
.icon-baozhang {
  color: #b6b6b6;
}
.iconfont {
  margin-right: 5px;
}
.commitment-item:last-child {
  border-bottom: 1px solid #eeeeee;
}
.buy-btn {
  width: 100%;
  height: 60px;
  border-radius: 30px;
  background-color: util.$ThemeColors;
  font-size: 24px;
  color: #ff3950;
  text-align: center;
  line-height: 60px;
  margin-top: 10px;
}
.is-sticky {
  height: auto !important;
  width: 380px !important;
  position: sticky !important;
  right: 20px !important;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0px 2px 20px 0px rgba(117, 117, 117, 0.3);
  border-radius: 10px;
}
.is-sticky .hot-bar {
  background-size: 100% 100% !important;
  text-align: right !important;
}
.is-sticky .hot-bar .hot-title {
  font-size: 22px !important;
  padding-right: 0px !important;
}
.is-sticky .hot-bar .hot-txt {
  font-size: 14px !important;
  margin-top: 5px !important;
}
.is-sticky .buy-btn {
  margin-top: 45px;
}
.affter-price{
  font-size: 24px;
  font-weight: bold;
}
.affter-price span{
  font-size: 14px;
}
.before-price{
  font-size: 16px;
  text-decoration: line-through
}
</style>
