<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 09:13:38
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-24 12:11:40
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
            <img />
          </div>
          <ProductCard />
        </div>
        <div class="product-info-box f-as">
          <div class="product-html-cont f-shrink0"></div>
          <Transition name="slide-fade">
            <el-affix :offset="100" target=".product-info-box" v-if="isSticky">
              <ProductCard :isSticky="isSticky" />
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
import { ref, reactive, onMounted, onUnmounted } from "vue";

const isSticky = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  console.log(scrollY);
  if (scrollY > 800) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
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
  background-color: util.$ThemeColors;
  height: 1800px;
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
