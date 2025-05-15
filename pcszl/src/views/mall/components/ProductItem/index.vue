<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-15 10:33:15
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-15 17:27:39
 * @FilePath: \pcszl\src\views\mall\components\ProductItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="mall-item pointer" @click="linkproductdetail">
      <div class="mall-poster">
        <img :src="data.img" />
      </div>
      <div class="mall-title u-line-1">{{ data.name }}</div>
      <div class="mall-tags f-ac">
        <div class="tags-item f-shrink0" v-for="item in data.labels.split(',')">
          {{ item }}
        </div>
      </div>
      <div class="mall-bottom-bar">
        <div class="mall-price"><span>￥</span>{{ data.price }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const linkproductdetail = () => {
  router.push({
    path: "/productDetail",
    query: {
      productId: props.data.id,
    },
  });
};
</script>

<style lang="scss" scoped>
.mall-item {
  overflow: hidden;
  width: 264px;
}
.mall-poster {
  width: 100%;
  height: 264px;
  border-radius: 10px;
  background-color: util.$ThemeColors;
}
.mall-poster img {
  width: 100%;
  height: 100%;
}
.mall-title {
  font-size: 18px;
  color: #212930;
  margin-top: 10px;
}
.tags-item {
  border-radius: 4px;
  border: 1px solid #ebebeb;
  padding: 6px 9px;
  box-sizing: border-box;
  color: #999999;
  margin-right: 6px;
}
.mall-price {
  font-size: 26px;
  color: #fb2b1e;
  font-weight: bold;
}
.mall-price span {
  font-size: 16px;
}
.mall-tags {
  margin: 10px 0;
  position: relative;
  margin-bottom:3px;
}
.mall-tags::before {
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
</style>
