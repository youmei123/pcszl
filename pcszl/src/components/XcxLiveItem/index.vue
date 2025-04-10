<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-10 10:41:23
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-10 15:25:49
 * @FilePath: \pcszl\src\components\XcxLiveItem\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="live-item f-ac">
    <div class="live-poster-img f-shrink0">
      <img  />
    </div>
    <div class="live-info fd-c f-jb">
      <div class="live-title u-line-1">中医针灸学基础理论及六中医针灸学基础理论及六</div>
      <div class="live-time">10月18日 20:00</div>
      <div class="live-tearcher">李老师</div>
      <div class="xcx-btn f-jc-ac pointer">
        <div class="iconfont icon-xiaochengxu"></div>
        <el-popover class="box-item" width="175" placement="top">
          <template #reference>
            <div>去小程序查看</div>
          </template>
          <div class="xcxqrcode-box"></div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.live-poster-img {
  width: 130px;
  height: 130px;
  border-radius: 20px;
  overflow: hidden;
  background-color: util.$ThemeColors;
}
.live-poster-img img {
  width: 100%;
  height: 100%;
}
.live-info {
  width: 210px;
  height: 130px;
  margin-left: 15px;
}
.live-title {
  font-weight: bold;
  font-size: 18px;
}
.live-time {
  color: #999999;
  font-size: 16px;
}
.live-tearcher {
  font-size: 16px;
  color: #ce9433;
}
.xcx-btn {
  width: 150px;
  height: 40px;
  border-radius: 20px;
  background: #efefef;
}
.xcxqrcode-box {
  width: 150px;
  height: 150px;
  background-color: util.$ThemeColors;
}
</style>
