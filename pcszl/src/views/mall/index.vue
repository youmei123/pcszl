<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:55:10
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-14 17:25:40
 * @FilePath: \pcszl\src\views\mall\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="mall-content content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商城</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="mall-list f-w">
        <div class="mall-item">
          <div class="mall-poster">
            <img />
          </div>
          <div class="mall-title u-line-1">人体十二经络穴位图解与病症11111</div>
          <div class="mall-tags f-ac">
            <div class="tags-item f-shrink0" v-for="item in tags">{{ item }}</div>
          </div>
          <div class="mall-bottom-bar">
            <div class="mall-price"><span>￥</span>199</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";

const tags = reactive(["好评率98%", "24小时热卖600+", "免费包邮"]);
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 20px 0;
  box-sizing: border-box;
}
.mall-list {
  width: 100%;
  background: #ffffff;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
}
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
.mall-title {
  font-size: 18px;
  color: #212930;
  margin-top: 10px;
}
.tags-item {
  border-radius: 4px;
  border: 1px solid #dddddd;
  padding: 6px 9px;
  box-sizing: border-box;
  color: #999999;
  color: 16px;
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
