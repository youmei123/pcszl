<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 11:24:05
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-14 14:33:33
 * @FilePath: \pcszl\src\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-page-navbar f-ja-ac" :class="{ ishome: currentPath == '/' }">
    <div class="logo-box f-shrink0">
      <img
        src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/7/2951187417718319454/logo.png"
        alt=""
      />
    </div>
    <div class="menu-list f-ja-ac">
      <div
        class="mebu-item"
        :class="{ isActive: currentPath == item.path }"
        v-for="item in navMenuList"
        @click="handmenu(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="user-box f-ac">
      <SerachBar bg-color="#F6F6F6" icon-color="#212930" color="#999999" />
      <el-popover
        class="box-item"
        placement="bottom-end"
        width="380"
        @before-enter="handleBeforeEnter"
      >
        <template #reference>
          <div class="user-btn f-shrink0">
            <div class="iconfont icon-denglu"></div>
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
                  {{ nickname || formatPhoneNumber(mobile) }}
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
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import SerachBar from "@/components/SerachBar/index.vue";
import { ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { statisticsWatchRecord } from "@/api/usercenter";
import { ElMessage, ElMessageBox } from "element-plus";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance()?.appContext.config.globalProperties; // 获取全局属性

const userStore = useUserStore();
const nickname = ref(userStore.UserInfo.nickname);
const headImg = ref(userStore.UserInfo.headImg);
const mobile = ref(userStore.UserInfo.mobile);

defineProps({
  moretext: {
    type: String,
    default: "查看更多",
  },
});

const route = useRoute();
const currentPath = ref(route.path);
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
  }
);
const router = useRouter();
const handmenu = (item: any) => {
  if (currentPath.value == item.path || !item.path) return;
  router.push({
    path: item.path,
  });
};

const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber || phoneNumber.length !== 11) {
    return phoneNumber; // 如果不是11位，直接返回原字符串
  }

  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
};

const linusercenter = () => {
  if (!userStore.token) {
    instance?.$openLoginPopup();
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
    instance?.$openLoginPopup();
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

const navMenuList = reactive([
  {
    name: "首页",
    path: "/",
  },
  {
    name: "全部课程",
    path: "/course",
  },
  {
    name: "特色疗法",
  },
  {
    name: "直播",
  },
  {
    name: "短视频",
  },
  {
    name: "百科",
  },
  {
    name: "商城",
    path: "/mall",
  },
  {
    name: "关于我们",
  },
  {
    name: "联系我们",
  },
]);

const record = ref({
  todayWatchTime: 0,
  totalWatchTime: 0,
  totalWatchTimeMin: 0,
  watchRecordCount: 0,
});

const handleBeforeEnter = async () => {
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
    instance?.$openLoginPopup();
    return;
  }
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
    })
    .catch(() => {
      // ElMessage({
      //   type: "info",
      //   message: "Delete canceled",
      // });
    });
};
</script>

<style lang="scss" scoped>
.home-page-navbar {
  width: 100%;
  background-color: white;
  height: 100px;
  box-shadow: 0px 1px 10px 0px rgba(219, 219, 219, 0.5);
}
.ishome {
  background-color: rgba(252, 220, 70, 0.1);
  box-shadow: none;
  position: absolute;
  top: 0;
  z-index: 5;
}
.logo-box {
  width: 210px;
  height: 51px;
}
.logo-box img {
  width: 100%;
  height: 100%;
}
.menu-list {
  max-width: 1200px;
  width: 100%;
}
.mebu-item {
  color: #212930;
  font-size: 18px;
  cursor: pointer;
}
.user-box {
  width: 300px;
}
.user-box .iconfont {
  font-size: 28px;
}
.user-box div {
  cursor: pointer;
}
:deep(.search-container) {
  margin-right: 40px;
}
.isActive {
  color: #ce9433 !important;
}
.user-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  background-color: initial;
  transition: background-color 0.3s ease;
}
.user-btn:hover {
  background-color: util.$ThemeColors;
}
.user-util-box {
  padding: 8px;
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
}
.vip-end-time {
  font-size: 16px;
  color: #999999;
  margin-top: 8px;
}
.user-record-bar {
  margin-top: 25px;
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
