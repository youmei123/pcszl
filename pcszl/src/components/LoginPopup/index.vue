<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 10:10:42
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 16:25:36
 * @FilePath: \pcszl\src\components\loginpopup\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="shad-box" v-if="isopen">
    <div class="login-box">
      <div class="logo-box">
        <img
          src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/14/5090787630086403142/log.png"
        />
      </div>
      <div class="popup-title">{{ type == 0 ? "密码登录" : "重置密码" }}</div>
      <div class="popup-desc" v-if="type == 0">欢迎登录，登录即默认注册</div>
      <div class="form-box">
        <div class="label-item f-jb-ac">
          <div>
            <input type="text" v-model="account" placeholder="请输入手机号" />
          </div>
          <div>
            <div v-if="type == 1" class="get-code-btn pointer">获取验证码</div>
          </div>
        </div>
        <div class="label-item f-jb-ac" v-if="type == 1">
          <div>
            <input type="text" placeholder="请输入验证码" />
          </div>
          <div></div>
        </div>
        <div class="label-item f-jb-ac">
          <div>
            <input
              :type="isshowpwd == true ? 'text' : 'password'"
              v-model="password"
              placeholder="请输入密码"
            />
          </div>
          <div>
            <div
              v-if="!isshowpwd"
              class="iconfont icon-xianshimima pointer"
              @click="isshowpwd = true"
            ></div>
            <div
              v-if="isshowpwd"
              class="iconfont icon-yincangmima pointer"
              @click="isshowpwd = false"
            ></div>
          </div>
        </div>
        <div class="label-item f-jb-ac" v-if="type == 1">
          <div>
            <input type="text" placeholder="再次输入密码" />
          </div>
          <div></div>
        </div>
      </div>
      <div class="submit-btn pointer" @click="loginsubmit">确认</div>
      <div class="agreement f-ac" v-if="type == 0">
        <el-checkbox v-model="checked" size="large" />
        <div style="margin-left: 5px">
          我已阅读并同意<span class="pointer">《用户协议》</span
          ><span class="pointer">《隐私协议》</span>
        </div>
      </div>
      <div class="cut-bar f-jc-ac">
        <div v-if="type == 0" class="pointer" @click="handswitchtype">忘记密码</div>
        <div
          v-if="type == 1"
          class="pointer"
          style="margin-top: 20px"
          @click="handswitchtype"
        >
          去登录
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { loginUser } from "@/api/login";
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();

const account = ref(""); // 账号
const password = ref(""); // 密码

const isopen = ref(false);
const type = ref(0); // 0: 登录 1: 注册
const checked = ref(false); //是否勾选协议
const isshowpwd = ref(false); // 是否显示密码

const open = () => {
  isopen.value = true;
};

const loginsubmit = () => {
  if (type.value == 0) {
    if (checked.value) {
      hnadlogin();
    } else {
      ElMessage({
        message: "请阅读并同意协议！",
        grouping: true,
        type: "warning",
      });
    }
  } else {
    console.log("注册");
  }
};

const hnadlogin = async () => {
  if (account.value == "") {
    ElMessage({
      message: "请输入手机号！",
      grouping: true,
      type: "warning",
    });
    return;
  }
  if (password.value == "") {
    ElMessage({
      message: "请输入密码！",
      grouping: true,
      type: "warning",
    });
    return;
  }
  const { data } = await loginUser({
    mobile: account.value,
    password: password.value,
    miniAppType: 1,
    deviceType: 3,
  });
  if (data) {
    userStore.setUserInfo(data);
    userStore.setToken(data.token);
    userStore.setUserId(data.id);
    isopen.value = false;
    ElMessage({
      message: "登录成功",
      grouping: true,
      type: "success",
    });
  }
};

const handswitchtype = () => {
  type.value = type.value == 0 ? 1 : 0;
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.shad-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.login-box {
  width: 400px;
  border-radius: 10px;
  background: #ffffff;
  padding: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0px 2px 20px 0px rgba(117, 117, 117, 0.3);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #212930;
}
.logo-box {
  width: 110px;
  height: 80px;
  margin: 0 auto;
}
.logo-box img {
  width: 100%;
  height: 100%;
}
.popup-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
}
.popup-desc {
  font-size: 16px;
  margin-top: 10px;
}
.form-box {
  margin-top: 15px;
}
input {
  border: none;
  outline: none;
  background-color: transparent;
}
.label-item {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #f6f6f6;
  padding-left: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.get-code-btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: util.$ThemeColors;
  font-size: 16px;
  color: #212930;
  text-align: center;
  line-height: 40px;
  margin-right: 5px;
}
.iconfont {
  margin-right: 20px;
  font-size: 24px;
  color: rgba(170, 170, 170, 1);
}
.submit-btn {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background-color: util.$ThemeColors;
  font-size: 16px;
  color: #212930;
  text-align: center;
  line-height: 50px;
}
.agreement {
  font-size: 16px;
}
.agreement span {
  color: rgba(206, 148, 51, 1);
}
.cut-bar {
  width: 100%;
}
.cut-bar div {
  font-size: 16px;
  color: #999999;
}
</style>
