<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 11:24:18
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-06-25 08:58:39
 * @FilePath: \pcszl\src\components\Footer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="footer">
    <div class="footer-content f-ac">
      <div class="footer-box f-jb-ac">
        <div class="left-cont">
          <div class="white-logo-box">
            <img
              src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/8974607872875016321/logo_white.png"
            />
          </div>
          <div class="company-info">弘扬传统中医药精髓，打造现代中医药文化</div>
        </div>
        <div class="center-cont">
          <div class="center-title">咨询热线</div>
          <div class="center-mobile">400-662-9001</div>
          <div class="center-time">(09:30 - 20:00)</div>
        </div>
        <div class="right-cont f-ac">
          <div class="IOS-qrcode">
            <div class="qrcode-box">
              <img
                src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/6/25/9206473220625989541/777.png"
              />
            </div>
            <div class="qrcode-text">【苹果app】</div>
          </div>
          <div class="and-qrocde">
            <div class="qrcode-box">
              <img
                src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/6/25/9206473220625989541/777.png"
              />
            </div>
            <div class="qrcode-text">【安卓app】</div>
          </div>
          <div class="xcx-qrcode">
            <div class="qrcode-box">
              <img
                src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/5/15/5288151969114382968/323.jpg"
              />
            </div>
            <div class="qrcode-text">【小程序】</div>
          </div>
        </div>
      </div>
    </div>
    <div class="record-id f-jc-ac">
      <a
        style="color: white; text-decoration: none"
        href="http://beian.miit.gov.cn/"
        class="pointer"
        >备案号:鲁ICP备19029375号-1</a
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.footer{
  position: relative;
  z-index: 99;
}
.footer-content {
  height: 250px;
  width: 100%;
  background: #212930;
}
.footer-box {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  color: white;
}
.white-logo-box {
  width: 220px;
  height: 54px;
}
.white-logo-box img {
  width: 100%;
  height: 100%;
}
.company-info {
  font-size: 16px;
  margin-top: 25px;
}
.center-title,
.center-time {
  font-size: 16px;
}
.center-mobile {
  font-size: 30px;
  font-weight: bold;
  margin: 15px 0;
}
.qrcode-box {
  width: 120px;
  height: 120px;
  overflow: hidden;
  background-color: util.$ThemeColors;
  margin-right: 40px;
}
.qrcode-box img {
  width: 100%;
  height: 100%;
}
.qrcode-text {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
  margin-right: 40px;
}
.record-id {
  width: 100%;
  height: 50px;
  border-top: 1px solid #323d46;
  text-align: center;
  color: white;
  background: #212930;
}
</style>
