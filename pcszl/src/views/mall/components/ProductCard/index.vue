<template>
  <div class="product-card" :class="{ 'is-sticky': isSticky }">
    <div class="product-hint-bar">人气必选商品 资质保障 官方正品</div>
    <div class="title-bar u-line-2">
      <span class="title-tag">官方正品</span>
      砭石按摩锥点按穴位文化用品
    </div>
    <div class="hot-bar f-jb-ac">
      <div>
        <div class="f-ac last-time-bar">
          <div>最后6小时￥169</div>
          <div>原价￥899</div>
        </div>
        <div class="f-ac">
          <div class="rob-count">疯抢1.2万件</div>
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
        <div class="discount">大促享2.8折</div>
        <div class="remainder-time">还剩6小时</div>
      </div>
      <div class="Label-item">立省600</div>
    </div>
    <div class="tags-bar f-ac">
      <div class="tag-item f-shrink0">好评率98%</div>
      <div class="tag-item f-shrink0">24小时热卖600+件</div>
      <div class="tag-item f-shrink0">2千+人买过</div>
      <div class="tag-item f-shrink0">中医热门课程</div>
    </div>
    <div class="commitment-cont">
      <div class="commitment-item f-ac">
        <div class="iconfont icon-anquanbaozhang"></div>
        <div>资质保障 不支持7天无理由退货</div>
      </div>
      <div class="commitment-item f-ac">
        <div class="iconfont icon-liwuhuodong"></div>
        <div>新人专区 官方补贴 超低折扣</div>
      </div>
    </div>
    <div class="buy-btn pointer" @click="toBuy">立即购买￥168</div>
  </div>
</template>

<script lang="ts" setup>
import { types } from "util";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  isSticky: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();
const toBuy = () => {
  console.log("立即购买");
  router.push({
    path:"/submitorder",
    query:{
      types:2
    }
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
  line-height: 16px;
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
  width: 80px;
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
  margin-top: 75px;
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
</style>
