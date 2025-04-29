<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 13:43:32
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-29 14:56:36
 * @FilePath: \pcszl\src\views\usercenter\menuitem\redemptioncode\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="redemption-code-title">兑换码兑换</div>
    <div class="redemption-code-content">
      <div class="redemption-code-input input">
        <input type="text" placeholder="请输入兑换码" />
      </div>
      <div class="redemption-code-pwd-input input">
        <input type="text" placeholder="请输入兑换码密码" />
      </div>
      <div class="redemption-code-btn pointer">立即兑换</div>
    </div>
    <div class="redemption-code-hint-bar f-jc-ac">
      <div>如您已兑换过，可直接点击</div>
      <div class="go-study-btn pointer">立即学习>></div>
    </div>
    <div class="redemption-code-tips">
      <div class="tips-title">兑换规则</div>
      <div class="tips-content">
        <div>1、兑换码可通过参与师芝林或合作商家相关活动获得;</div>
        <div>
          2、在本页面兑换的课程在有效期内可享免费观看，兑换的课程可在“我的课程”页面查看;
        </div>
        <div>3、在本页面兑换的会员，2D/3D经络穴位会员，在有效期内免费使用;</div>
        <div>4、凡通过不正常手段违规操作的用户，一旦发现，立即取消资格。</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
</script>

<style lang="scss" scoped>
.redemption-code-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}
.redemption-code-content {
  width: 400px;
  margin: 0 auto;
}
.input {
  width: 400px;
  height: 50px;
  background: #f0f0f0;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  margin-top: 10px;
}
input {
  border: none;
  background-color: transparent;
  outline: none;
  text-align: center;
}
.redemption-code-btn {
  width: 400px;
  height: 50px;
  background: util.$ThemeColors;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  margin-top: 10px;
}
.redemption-code-hint-bar {
  width: 600px;
  height: 80px;
  background: #fff9f0;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 20px;
}
.go-study-btn {
  width: 140px;
  height: 50px;
  background: #df444e;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  color: white;
  margin-left: 10px;
}
.redemption-code-tips {
  width: 600px;
  padding: 30px;
  box-sizing: border-box;
  margin: 0 auto;
  background: #fff9f0;
  border-radius: 12px;
  margin-top: 20px;
}
.tips-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
}
.tips-content {
  line-height: 34px;
}
</style>
