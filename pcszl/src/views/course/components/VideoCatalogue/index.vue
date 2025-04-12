<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-11 16:29:55
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-12 09:32:56
 * @FilePath: \pcszl\src\views\course\components\VideoCatalogue\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="video-catalogue">
    <div class="catalogue-title">目录</div>
    <div class="catalogue-cont">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :name="index + 1" v-for="(item, index) in 20">
          <template #title><div class="item-title">罗老师72招（一）</div> </template>
          <div class="subitem-list">
            <div class="subitem f-as" v-for="() in 3">
              <div class="iconfont icon-24gf-playCircle"></div>
              <div class="subitem-info">
                <div class="sub-title u-line-1">常用按摩手法</div>
                <div class="sub-progress">已看42%</div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { CollapseModelValue } from "element-plus";
const activeNames = ref(["1"]);
const handleChange = (val: CollapseModelValue) => {
  console.log(val);
};
</script>

<style lang="scss" scoped>
.video-catalogue {
  width: 360px;
  height: 552px;
  background-color: #212930;
}
.catalogue-title {
  height: 60px;
  width: 100%;
  line-height: 60px;
  padding-left: 25px;
  box-sizing: border-box;
  color: #8ea1b2;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #151c22;
}
.catalogue-cont {
  color: #6e7b87;
  padding: 0 20px;
  box-sizing: border-box;
  height: 491px;
  overflow-y: auto;
}

.catalogue-cont::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 100px;
}

.catalogue-cont::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: #6e7b87;
  border-radius: 10px;
}

.catalogue-cont::-webkit-scrollbar {
  /*滚动条里面轨道*/
  background-color: #212930;
}

:deep(.el-collapse) {
  border-top: none;
}
:deep(.el-collapse-item__header) {
  background-color: transparent;
  color: #6e7b87;
  border-bottom: none;
}
:deep(.el-collapse-item__wrap) {
  background-color: transparent;
  color: #6e7b87;
  border-bottom: 1px solid #3d4a56;
}
:deep(.el-collapse-item__content) {
  color: #6e7b87;
  padding-bottom: 0;
}
@keyframes addBorder {
  from {
    border-bottom: none;
  }
  to {
    border-bottom: 1px solid #3d4a56;
  }
}

:deep(.el-collapse :not(.is-active) button) {
  // 应用动画，设置动画名称、动画持续时间、延迟时间和播放次数
  animation: addBorder 0.1s 0.3s 1 forwards;
}
.item-title {
  height: 16px;
  line-height: 16px;
  border-left: 3px solid #8ea1b2;
  padding-left: 7px;
  box-sizing: border-box;
}
:deep(.el-icon svg) {
  width: 2rem;
}
.subitem {
  margin-bottom: 10px;
}
.subitem-info {
  margin-left: 3px;
}
.sub-title {
  font-size: 16px;
}
</style>
