<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 09:13:38
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-12 16:13:38
 * @FilePath: \pcszl\src\views\mall\productdetail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="product-detail-container">
      <div class="content">
        <div class="breadcrumb-cont">
          <el-breadcrumb :separator-icon="DArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>商品详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="product-content f-ac">
          <div class="product-img">
            <img :src="product?.img" />
          </div>
          <ProductCard :data="product" />
        </div>
        <div class="product-info-box f-as">
          <div class="product-html-cont f-shrink0" v-html="product?.description"></div>
          <Transition name="slide-fade">
            <el-affix :offset="100" target=".product-info-box" v-if="isSticky">
              <ProductCard :data="product" :isSticky="isSticky" />
            </el-affix>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import ProductCard from "@/views/mall/components/ProductCard/index.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { singleproduct } from "@/api/mall";
import { useUserStore } from "@/store/userStore";
import { useRoute } from "vue-router";
import { ProductType } from "@/utiles/types";

const isSticky = ref(false); // 是否吸顶
const route = useRoute(); // 获取路由参数
const userStore = useUserStore(); // 获取用户信息
const productId = route.query.productId; // 获取商品id
const product = ref<ProductType>(); // 商品详情

console.log(productId);
const handleScroll = () => {
  const scrollY = window.scrollY;
  console.log(scrollY);
  if (scrollY > 800) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }
};

const getSingleProduct = async () => {
  const { data } = await singleproduct({
    productId: productId,
    userId: userStore.userId,
  });
  product.value = data;
  console.log(data);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  getSingleProduct();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.page-container {
  padding-bottom: 30px;
  box-sizing: border-box;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.product-content {
  padding: 30px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 10px;
}
.product-img {
  width: 600px;
  height: 600px;
  overflow: hidden;
  background-color: util.$ThemeColors;
}
.product-img img {
  width: 100%;
  height: 100%;
}
:deep(.product-card) {
  margin-left: 20px;
}
.product-info-box {
  width: 100%;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 30px;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.product-html-cont {
  width: 750px;
  // background-color: util.$ThemeColors;
  min-height: 800px;
}
/* 定义进入和离开过渡的活动状态，设置过渡的属性、时间和缓动函数 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

/* 进入过渡的起始状态，元素从右侧进入且透明度为 0 */
.slide-fade-enter-from {
  opacity: 0;
}

/* 进入过渡的结束状态，元素回到正常位置且完全显示 */
.slide-fade-enter-to {
  opacity: 1;
}

/* 离开过渡的起始状态，元素处于正常位置且完全显示 */
.slide-fade-leave-from {
  opacity: 1;
}

/* 离开过渡的结束状态，元素滑到右侧且透明度为 0 */
.slide-fade-leave-to {
  opacity: 0;
}
</style>
