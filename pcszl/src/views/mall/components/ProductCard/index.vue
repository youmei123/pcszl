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
          <div class="affter-price" v-if="Specification.specificationPrice">
            <span>￥</span>
            {{ Specification.specificationPrice }}
          </div>
          <div class="affter-price" v-else>
            <span>￥</span>
            {{ data.price }}
          </div>
          <div class="before-price" v-if="Specification.specificationOriginalPrice">￥{{ Specification.specificationOriginalPrice }}</div>
          <div class="before-price" v-else>￥{{ data.originalPrice }}</div>
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
        <div class="discount" v-if="calculateDiscount()">
          大促享{{ calculateDiscount() }}
        </div>
        <div class="remainder-time">快要抢光</div>
      </div>
      <div class="Label-item" style="border-radius: 4px;" v-if="savePric()!=0">
        立省{{ savePric() }}
      </div>
    </div>
    <div class="tags-bar f-ac" v-if="data.labels">
      <div class="tag-item f-shrink0" v-for="item in data.labels.split(',')">
        {{ item }}
      </div>
    </div>
    <div class="specification-box f-ac" v-if="specificationList.length!=0">
      <div>
        规格：
      </div>
      <div class="f-w f-ac">
        <div class="specificationItem" v-for="item in specificationList" 
          @click="specificationClick(item)" :class="{'specificationActive':Specification.id==item.id}" >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="specification-box f-ac" v-if="specificationList.length!=0">
      <div>
        数量：
      </div>
        <el-input-number v-if="data.isEntity==1" v-model="count" :min="1" @change="countChange"/>
        <div  v-else>1</div>
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
    <div class="buy-btn pointer" @click="toBuy">立即购买￥{{ (minPrice * count).toFixed(2) }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { transNumberToShort } from "@/utiles/public";
import { useUserStore } from "@/store/userStore";
import { useModalStore } from "@/store/loginStore";
const userStore = useUserStore();
const router = useRouter();
const modalStore = useModalStore();
const emit = defineEmits([ "specificationChange","countChange" ]);
const props = defineProps({
  isSticky: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {},
  },
  specificationList: {
    type: Array,
    default: [],
  }
});
const minPrice=ref(0)
const Specification =ref(<any>{})
const count = ref(1)
// 计算折扣
const calculateDiscount = () => {
  let originalPrice=0
  let discountedPrice=0
  if(Specification.value && Specification.value.specificationPrice){
    originalPrice=Specification.value.specificationOriginalPrice
    discountedPrice=Specification.value.specificationPrice
  }else{
    originalPrice=props.data.originalPrice
    discountedPrice=props.data.price
  }
  if((!originalPrice || !discountedPrice) || originalPrice==discountedPrice){
    return ''
  }
  const discount = (discountedPrice / originalPrice) * 10;
  return discount.toFixed(1) + "折"; // 返回几折，保留1位小数
};
// 立省
const savePric =()=>{
  let originalPrice=0
  let discountedPrice=0
  if(Specification.value && Specification.value.specificationPrice){
    originalPrice=Specification.value.specificationOriginalPrice
    discountedPrice=Specification.value.specificationPrice
  }else{
    originalPrice=props.data.originalPrice
    discountedPrice=props.data.price
  }
  if(originalPrice!=discountedPrice && originalPrice>discountedPrice){
    return (originalPrice-discountedPrice).toFixed(2)
  }else{
    return 0
  }
}
// 规格点击
const specificationClick=(item:any)=>{
  if(Specification.value.id != item.id){
  }
  minPrice.value=item.specificationPrice
  Specification.value=item
  emit('specificationChange',item)
}
const countChange=()=>{
  emit('countChange',count.value)
}

const toBuy = () => {
  console.log("立即购买");
  if (!userStore.token) {
    modalStore.showLoginModal();
    return;
  }
  let price=''
  if(Specification.value && Specification.value.id){
    price=Specification.value.specificationPrice
  }else{
    price=props.data.price
  }
  router.push({
    path: "/submitorder",
    query: {
      types: 7,
      productId: props.data.id,
      price:price,
      specificationId:Specification.value.id,
      specificationName:Specification.value.name,
      count:count.value,
    },
  });
};
const mountedClick=(type:number,item:any)=>{
  let specification=<any>{}
  let data=<any>{}
  if(type==1){
    specification=item
  }else{
    data=item
  }
  if(data.productSpecificationCount!=0){
    if(item && item.id){
      minPrice.value=specification.specificationPrice
      Specification.value=specification
    }
  }else{
    minPrice.value=data.price;
  }
}
const countNum = (num:number) => {
  count.value=num
}
defineExpose({mountedClick,countNum})
</script>

<style lang="scss" scoped>
.product-card {
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
  margin-top: 15px;
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
  margin-top: 15px;
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
  // width: 100px;
  padding: 0 10px;
  box-sizing: border-box;
  height: 30px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #fb2b1e;
  font-size: 16px;
  color: #fb2b1e;
  text-align: center;
  line-height:28px;
}
.rob-txt {
  width: 80px;
  height: 30px;
  background: #fb2b1e;
  border-radius: 4px;
  border: 1px solid #ffffff;
  text-align: center;
  line-height: 30px;
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
  line-height: 33px;
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
  line-height: 32px;
  box-sizing: border-box;
  margin-left: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
.tags-bar {
  overflow: hidden;
  margin-top: 15px;
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
  margin-top: 15px;
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
  margin-top: 30px;
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
  font-size: 28px;
  font-weight: bold;
}
.affter-price span{
  font-size: 14px;
}
.before-price{
  font-size: 16px;
  text-decoration: line-through
}
.specification-box{
  margin-top:15px ;
}
.specificationItem{
		padding: 5px 10px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dddddd;
    color: #212930;
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
	}
	.specificationActive{
		border: 1px solid #FB2B1E;
		background-color: #FFF6F5;
		color:#FB2B1E ;
	}
</style>
