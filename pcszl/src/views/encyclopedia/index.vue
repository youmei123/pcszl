<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-03 10:23:07
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-06-04 15:14:13
 * @FilePath: \pcszl\src\views\encyclopedia\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="encyclopedia-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>百科</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="encyclopedia-menu-cont">
        <div class="encyclopedia-title f-ac">
          <div class="iconfont icon-yezi"></div>
          <div>中医·百科</div>
        </div>
        <div class="menu-list f-w f-jb-ac">
          <div
            class="menu-item fd-c f-jb"
            @click="router.push(item.path)"
            v-for="(item, index) in EncyclopediaMenuList"
            :style="{
              'background-image': `url(${item.bg})`,
              width: item.title == '民间特色疗法专区' ? '593px' : '290px',
            }"
          >
            <div class="item-title-bar f-ac">
              <div class="item-title">{{ item.title }}</div>
              <div class="menu-right-icon f-jc-ac">
                <el-icon :size="12"><ArrowRight /></el-icon>
              </div>
            </div>
            <div class="item-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
      <div class="acupoint-cont">
        <div class="encyclopedia-title f-ac">
          <div class="iconfont icon-yezi"></div>
          <div>穴位挂图</div>
        </div>
        <div class="acupoint-list f-w f-jb-ac">
          <div class="acupoint-item" v-for="(item, index) in AcupointList">
            <div class="acupoint-img-box">
              <el-image
                style="width: 100%; height: 100%"
                :src="item.img"
                :preview-src-list="[item.gifurl]"
                fit="cover"
              />
            </div>
            <div class="acupoint-name">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight, ArrowRight } from "@element-plus/icons-vue";
import { EncyclopediaMenuList, AcupointList } from "@/utiles/staticdata";
import { useRouter } from "vue-router";
const router = useRouter();
console.log(EncyclopediaMenuList);
console.log(AcupointList);
</script>

<style lang="scss" scoped>
.page-container {
  padding-bottom: 30px;
  box-sizing: border-box;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
  margin-bottom: 15px;
}
.encyclopedia-title {
  font-size: 24px;
  font-weight: bold;
}
.encyclopedia-title .iconfont {
  color: util.$ThemeColors;
  font-size: 26px;
  margin-right: 8px;
}
.menu-list {
  padding-top: 10px;
  box-sizing: border-box;
}
.menu-item {
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 35px 30px;
  box-sizing: border-box;
}
.item-title {
  font-size: 24px;
  font-weight: bold;
}
.menu-right-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: util.$ThemeColors;
  margin-left: 3px;
}
.item-desc {
  color: #999999;
  font-size: 16px;
}
.acupoint-cont {
  margin-top: 30px;
}
.acupoint-list {
  margin-top: 10px;
}
.acupoint-item {
  width: 280px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 30px;
}
.acupoint-img-box {
  height: 280px;
}
.acupoint-name {
  height: 40px;
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  background-color: white;
}
</style>
