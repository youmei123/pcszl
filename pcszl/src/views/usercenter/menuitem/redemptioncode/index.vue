<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 13:43:32
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-17 09:47:21
 * @FilePath: \pcszl\src\divs\usercenter\menuitem\redemptioncode\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container" >
    <div class="redemption-code-title">兑换码兑换</div>
    <div class="redemption-code-content">
      <div class="redemption-code-input input">
        <input type="text" v-model="redeemCode" placeholder="请输入兑换码" />
      </div>
      <div class="redemption-code-pwd-input input">
        <input type="text" v-model="redeemPassword" placeholder="请输入兑换码密码" />
      </div>
      <div class="redemption-code-btn pointer" @click="handredeem">立即兑换</div>
    </div>
    <div class="redemption-code-hint-bar f-jc-ac">
      <div>如您已兑换过，可直接点击</div>
      <div class="go-study-btn pointer" @click="router.push('/usercenter/mycourse')">
        立即学习>>
      </div>
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
    <div class="shad-cont" v-if="isshowpopup">
      <div class="popup">
        <img
          src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2024/12/9/4806325649084888448/popup_box_top.png"
        />
        <div class="popup_box">
          <div v-if="!isUse">
            <div class="box_title">兑换成功！</div>
            <div class="popup_content" v-if="messageType() == '课程'">
              已为您开通<span class="popup_content_red">{{ showmessage }}</span
              >，可在我的课程页面查看。
            </div>
            <div class="popup_content" v-if="messageType() == '会员'">
              已为您开通<span class="popup_content_red">{{ showmessage }}</span
              >，以下为全部免费学习(罗老师专区除外)。
            </div>
            <div class="popup_content" v-if="messageType() == '2D/3D'">
              已为您开通<span class="popup_content_red">{{ showmessage }}</span
              >，可在 百科-2D或3D经络穴位 中查看所有经络穴位进行学习。
            </div>
            <div class="popup_course" v-if="messageType() == '课程'">
              <div class="box_title">同时赠送您以下赠品</div>
              <div class="rows">
                <div class="rows_text">
                  <span class="rows_active">赠品一：</span>
                  师芝林VIP会员1个月
                </div>
              </div>
              <div class="rows">
                <div class="rows_text">
                  <span class="rows_active">赠品二：</span>
                  师芝林2D/3D模型会员1年
                </div>
              </div>
              <div class="rows">
                <div class="rows_text">
                  <span class="rows_active">赠品三:</span>
                  《人体穴位精讲》课程10年免费观看
                </div>
              </div>
              <div class="rows">
                <div class="rows_text">
                  <span class="rows_active">赠品四:</span>
                  《神农本草经》课程10年免费观看
                </div>
              </div>
            </div>
            <div class="popup_course" v-if="messageType() == '会员'">
              <div class="columnList" v-for="(item, index) in columnList" :key="index">
                {{ item }}
              </div>
            </div>
            <div
              class="popup_btn"
              v-if="messageType() == '课程'"
              @click="router.push('/usercenter/mycourse')"
            >
              立即查看
            </div>
          </div>
          <div v-if="isUse">
            <div class="box_title use_title">您已兑换过了！</div>
            <div class="popup_content use_content">
              兑换的课程在有效期内可享免费观看，兑换的课程可在“我的课程”页面查看。
            </div>
            <div class="popup_content use_content">
              兑换的会员，2D/3D经络穴位会员，在有效期内免费使用。
            </div>
            <div class="popup_btn use_btn" @click="router.push('/usercenter/mycourse')">
              立即学习
            </div>
          </div>
          <div class="liveclose-btn f-jc-ac pointer" @click="isshowpopup = false">
            <el-icon :size="30"><Close /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { redeemuse } from "@/api/usercenter";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { Close } from "@element-plus/icons-vue";
const columnList = [
  "小程序内全部课程(罗老师专区除外)",
  "2D/3D经络穴位(穴位540个)",
  "中医医案21036个、中医典籍588本",
  "中医方剂959个、常用中药439味",
  "短视频中医动画故事",
];

const redeemCode = ref("");
const redeemPassword = ref("");
const router = useRouter();
const userStore = useUserStore();
const isUse = ref(false);
const showmessage = ref("");
const isshowpopup = ref(false);

const handredeem = async () => {
  if (!redeemCode.value) {
    ElMessage.warning("请输入兑换码");
    return;
  }
  if (!redeemPassword.value) {
    ElMessage.warning("请输入兑换码密码");
    return;
  }
  if (!userStore.userId) {
    ElMessage.warning("请先登录");
    return;
  }
  const { status, message } = await redeemuse({
    redeemCode: redeemCode.value,
    redeemPassword: redeemPassword.value,
    userId: userStore.userId,
  });
  if (status == "0") {
    showmessage.value = message;
    ElMessage.success("兑换成功,请前往我的课程进行学习");
    redeemCode.value = "";
    redeemPassword.value = "";
    isUse.value = false;
    isshowpopup.value = true;
  } else {
    if (message && message == "兑换码已被使用") {
      isUse.value = true;
      isshowpopup.value = true;
    }
    // ElMessage.info(message);
  }
};

const messageType = () => {
  let type = "";
  if (showmessage.value.includes("课程")) {
    type = "课程";
  } else if (showmessage.value.includes("2D/3D")) {
    type = "2D/3D";
  } else {
    return "会员";
  }
  return type;
};
</script>

<style lang="scss" scoped>
.container{
  min-height: 650px;
}
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
.shad-cont {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 200;
}

.popup {
  width: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.popup > img {
  width: 80%;
  height: 132px;
  position: absolute;
  top: -125px;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, 0);
}

.popup_box {
  width: 100%;
  background-color: #fff9f0;
  padding: 0 30px;
  border-radius: 15px;
  // position: absolute;
  z-index: 5;
  padding-bottom: 30px;
  padding-top: 30px;
  box-sizing: border-box;
}

.box_title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 15px 0;
  box-sizing: border-box;
}

.popup_content {
  font-size: 28px;
  margin: 15px 0;
  width: 100%;
  line-height: 45px;
}

.popup_course {
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 27px;
  border-radius: 15px;
}

.rows {
  margin: 15px 0;
  font-size: 25px;
}

.rows_active {
  color: red;
  font-weight: bold;
}

.rows_text {
  color: #000;
}
.popup_btn {
  width: 50%;
  padding: 20px 0;
  box-sizing: border-box;
  font-size: 28px;
  background-color: var(--ThemeColors);
  color: #000;
  border-radius: 50px;
  margin: 20px auto;
  text-align: center;
  margin-bottom: 0 !important;
}
.liveclose-btn {
  position: absolute;
  bottom: -90px;
  left: 50%;
  transform: translate(-50%, 0);
  border: 2px solid #fff;
  border-radius: 50%;
  color: #fff;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
}
.popup_content_red {
  color: red;
}
.columnList {
  font-size: 27px;
  margin: 10px 0;
  width: 100%;
  text-align: center;
}
.use_title {
  font-size: 35px;
  margin: 20px 0;
}
.use_btn {
  padding: 15px 0;
}
.use_content {
  margin: 0;
}
</style>
