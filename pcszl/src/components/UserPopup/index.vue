<template>
  <div>
    <el-popover
      class="box-item"
      placement="bottom-end"
      width="380"
      @before-enter="handleBeforeEnter"
    >
      <template #reference>
        <div class="user-btn f-shrink0">
          <div v-if="!headImg" class="iconfont icon-denglu"></div>
          <img v-else :src="headImg" alt="" />
        </div>
      </template>
      <div>
        <div class="user-util-box">
          <div class="head-bar f-ac">
            <div class="user-head-img">
              <img v-if="headImg" :src="headImg" alt="" />
              <img
                v-else
                src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2023/4/26/8589512583855728879/tx.png"
                alt=""
              />
            </div>
            <div class="user-info">
              <div class="user-name e-line-1" v-if="userStore.userId">
                {{ nickname || formatPhoneNumber(mobile || "") }}
              </div>
              <div class="user-name e-line-1 pointer" v-else @click="handlelogin">
                点击登录
              </div>
              <!-- <div class="vip-end-time">会员至：2024-12-31 ></div> -->
            </div>
          </div>
          <div class="user-record-bar f-jb-ac">
            <div class="record-item">
              <div class="record-val">{{ record.totalWatchTimeMin || "-" }}</div>
              <div class="record-txt">累计学习(分钟)</div>
            </div>
            <div class="record-item">
              <div class="record-val">{{ record.todayWatchTime || "-" }}</div>
              <div class="record-txt">今日学习(分钟)</div>
            </div>
            <div class="record-item">
              <div class="record-val">{{ record.watchRecordCount || "-" }}</div>
              <div class="record-txt">已看课程(节)</div>
            </div>
          </div>
          <div class="user-menu-list">
            <!-- <div class="user-menu-item img-menu">
                <div>
                  <div class="arrow-right-btn f-jc-ac">
                    <el-icon :size="14">
                      <ArrowRight />
                    </el-icon>
                  </div>
                </div>
              </div> -->
            <div class="user-menu-item f-jb-ac" @click="linusercenter">
              <div class="menu-icon f-ac">
                <div class="iconfont icon-kechengguanli"></div>
                <div class="menu-text">我的课程</div>
              </div>
              <div>
                <el-icon :size="14">
                  <ArrowRight />
                </el-icon>
              </div>
            </div>
            <div class="user-menu-item f-jb-ac" @click="linmmyorder">
              <div class="menu-icon f-ac">
                <div class="iconfont icon-dingdan"></div>
                <div class="menu-text">我的订单</div>
              </div>
              <div>
                <el-icon :size="14">
                  <ArrowRight />
                </el-icon>
              </div>
            </div>
          </div>
          <div class="user-out f-ac pointer" @click="hanldoutlogin">
            <div class="iconfont icon-tuichu"></div>
            <div>退出</div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/store/userStore";
import { statisticsWatchRecord } from "@/api/usercenter";
import { useModalStore } from "@/store/loginStore";
import { useRouter } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
const record = ref({
  todayWatchTime: 0,
  totalWatchTime: 0,
  totalWatchTimeMin: 0,
  watchRecordCount: 0,
});
const userStore = useUserStore();
const modalStore = useModalStore();
const nickname = ref(userStore.UserInfo.nickname);
const headImg = ref(userStore.UserInfo.headImg);
const mobile = ref(userStore.UserInfo.mobile);
const router = useRouter();
const handleBeforeEnter = async () => {
  nickname.value = userStore.UserInfo.nickname;
  headImg.value = userStore.UserInfo.headImg;
  mobile.value = userStore.UserInfo.mobile;
  console.log(nickname.value);
  console.log(headImg.value);
  console.log(mobile.value);
  if (!userStore.userId) return;
  console.log("before enter");
  const { data } = await statisticsWatchRecord({
    userId: userStore.userId,
  });
  record.value = data;
  console.log(data);
};

const handlelogin = () => {
  if (!userStore.token) {
    modalStore.showLoginModal();
    return;
  }
};

const linusercenter = () => {
  if (!userStore.token) {
    modalStore.showLoginModal();
    ElMessage({
      type: "warning",
      message: "请先登录",
    });
    return;
  }
  router.push({
    path: "/usercenter/mycourse",
  });
};

const linmmyorder = () => {
  if (!userStore.token) {
    modalStore.showLoginModal();
    ElMessage({
      type: "warning",
      message: "请先登录",
    });
    return;
  }
  router.push({
    path: "/usercenter/myorder",
  });
};

const hanldoutlogin = () => {
  ElMessageBox.confirm("是否要退出登录？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      userStore.resetState();
      nickname.value = "";
      headImg.value = "";
      record.value = {
        todayWatchTime: 0,
        totalWatchTime: 0,
        totalWatchTimeMin: 0,
        watchRecordCount: 0,
      };
      ElMessage({
        type: "success",
        message: "已退出登录",
      });
      setTimeout(() => {
        router.push({
          path: "/",
        });
      }, 1000);
    })
    .catch(() => {
      // ElMessage({
      //   type: "info",
      //   message: "Delete canceled",
      // });
    });
};

const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber || phoneNumber.length !== 11) {
    return phoneNumber; // 如果不是11位，直接返回原字符串
  }

  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
};
</script>

<style lang="scss" scoped>
.user-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  line-height: 40px;
  background-color: initial;
  transition: background-color 0.3s ease;
}
.user-btn img {
  width: 100%;
  height: 100%;
}
.user-btn:hover {
  background-color: util.$ThemeColors;
}
.user-util-box {
  padding: 8px;
  padding-bottom: 0;
  box-sizing: border-box;
}

.user-head-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: util.$ThemeColors;
  overflow: hidden;
  margin-right: 5px;
}
.user-head-img img {
  width: 100%;
  height: 100%;
}
.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #212930;
}
.vip-end-time {
  font-size: 16px;
  color: #999999;
  margin-top: 8px;
}
.user-record-bar {
  margin-top: 10px;
}
.record-item {
  text-align: center;
}
.record-val {
  font-size: 22px;
  color: #212930;
  font-weight: bold;
}
.record-txt {
  font-size: 16px;
  color: #999999;
}
.user-menu-list {
  margin-top: 20px;
}
.user-menu-item {
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 0 15px;
  box-sizing: border-box;
  background: #f6f6f6;
  color: #212930;
  margin-bottom: 10px;
  cursor: pointer;
}
.img-menu {
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/12/171448580541481026/vip_bar.png");
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
.menu-text {
  margin-left: 7px;
  font-size: 16px;
}
.arrow-right-btn {
  position: absolute;
  background: linear-gradient(0deg, #f9cf7e, #fff7ef);
  width: 22px;
  height: 22px;
  border-radius: 11px;
  right: 20px;
  top: 20px;
}
.user-out {
  font-size: 16px;
  color: #999999;
}
</style>
