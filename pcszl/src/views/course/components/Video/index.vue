<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-11 16:03:51
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-17 17:13:41
 * @FilePath: \pcszl\src\views\course\components\Video\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="video-container">
    <div id="xgplayer"></div>
    <div class="poster-conter" v-if="isshowposter">
      <img :src="poster" alt="poster" />
      <div class="shad-box pointer" @click="playdefaultvideo">
        <div class="iconfont icon-24gf-playCircle"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { saveWatchTimeNewHuawei, customerServiceMobile } from "@/api/course";
import { CourseVideoType } from "@/utiles/types";
import { useUserStore } from "@/store/userStore";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import HlsJsPlugin from "xgplayer-hls.js";
import { Events } from "xgplayer";
import Danmu from "xgplayer/es/plugins/danmu";
import "xgplayer/es/plugins/danmu/index.css";
import logoPlugin from "./Plugins/logoPlugin/logo.js";
import "./Plugins/logoPlugin/logo.css";

const userStore = useUserStore();
const xgplayer = ref<any>();
const currentVideo = ref<CourseVideoType>();
const isshowposter = ref(true);
const mobile = ref<string>("");
const lastUpdateTime = ref(-1);

const props = defineProps({
  poster: {
    type: String,
    default: "",
  },
});

const getInit = () => {
  console.log(props.poster);
  xgplayer.value = new Player({
    id: "xgplayer",
    width: "100%",
    height: "100%",
    lang: "zh-cn",
    autoplay: true,
    poster: props.poster,
    startTime: 0,
    plugins: [HlsJsPlugin, Danmu, logoPlugin],
  });
  console.log(xgplayer.value.plugins);

  // 播放时间改变
  xgplayer.value.on(Events.TIME_UPDATE, (e: any) => {
    const currentTime = Math.floor(e.currentTime); // 获取当前时间并向下取整
    if (currentTime > 0 && currentTime !== lastUpdateTime.value) {
      console.log("当前时间", currentTime);
      if (currentTime % 20 == 0) {
        if (xgplayer.value) {
          xgplayer.value.danmu.sendComment({
            duration: 10000,
            id: new Date().getTime(),
            txt: `师芝林老师助理:${mobile.value}`,
            style: {
              fontSize: "32px",
              color: "#666666",
              paddingTop: "200px",
            },
          });
        }
      }
      lastUpdateTime.value = currentTime;
    }
    emit("timeupdate", e.currentTime);
  });
  //播放资源发生变化 url 发生改变， 切换视频
  xgplayer.value.on(Events.URL_CHANGE, (e) => {
    console.log(e);
  });
};

onMounted(() => {
  getInit();
  getCustomerServiceMobile();
});

onUnmounted(() => {
  saveVideoRecord();
});

const saveVideoRecord = async () => {
  if (currentVideo.value && xgplayer.value) {
    const video = currentVideo.value;
    const player = xgplayer.value;
    if (player.currentTime <= 0 || player.cumulateTime <= 0) return;
    await saveWatchTimeNewHuawei({
      courseId: video.courseId,
      userId: userStore.userId,
      videoId: video.id,
      watchTimeAll: video.hwDuration || 0,
      hwassetId: video.hwassetId,
      hwSize: video.hwSize,
      realityWatchTime: Math.round(player.cumulateTime / 1000 || 0),
      watchTime:
        Math.round(player.currentTime || 0) >= (video.hwDuration || 0)
          ? video.hwDuration || 0
          : Math.round(player.currentTime || 0),
    });
  }
};

const getCustomerServiceMobile = async () => {
  const { data, status } = await customerServiceMobile();
  console.log(data);
  mobile.value = data.mobile || "";
};

const startvideo = (item: CourseVideoType) => {
  let definition: any = [];
  if (xgplayer.value && xgplayer.value.cumulateTime > 0) {
    saveVideoRecord();
  }
  //获取 logo 插件
  const logo = xgplayer.value.getPlugin("logoPlugin");
  if (item.isWatermark == 1) {
    logo.root.style.display = "block";
  } else {
    logo.root.style.display = "none";
  }
  isshowposter.value = false;
  currentVideo.value = item;
  console.log(item);
  if (item.qualityList && item.qualityList.length > 0) {
    definition = item.qualityList.map((val) => {
      let txt;
      if (val.quality == "1") {
        txt = "原画质";
      }
      if (val.quality == "2") {
        txt = "标清";
      }
      if (val.quality == "3") {
        txt = "高清";
      }
      return {
        text: txt,
        url: val.url,
      };
    });
  }
  console.log(definition);
  if (xgplayer.value) {
    if (definition.length <= 0) {
      xgplayer.value.src = item.hwUrl;
    } else {
      xgplayer.value.emit("resourceReady", definition);
      xgplayer.value.plugins.definition.changeDefinition(definition[0]);
    }
    xgplayer.value.currentTime = item.watchTime || 0;
    // setTimeout(() => {
    //   if (xgplayer.value) {
    //     xgplayer.value.currentTime = 0;
    //   }
    // }, 500);
  }
};

const playdefaultvideo = () => {
  emit("playdefaultvideo", "");
};

const emit = defineEmits<{
  (e: "timeupdate", event: number): void;
  (e: "playdefaultvideo", event: string): void;
}>();

defineExpose({
  startvideo,
});
</script>

<style lang="scss" scoped>
.video-container {
  width: 1200px;
  height: 675px;
  position: relative;
}
.poster-conter {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 99;
}
.poster-conter img {
  width: 100%;
  height: 100%;
}
.shad-box {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.shad-box .iconfont {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 100px;
}
:deep(.xgplayer .xgplayer-progress-played) {
  background: util.$ThemeColors;
}
:deep(.xgplayer .xg-options-list li.selected) {
  color: util.$ThemeColors;
}
:deep(.xgplayer .xg-options-list li:hover) {
  color: util.$ThemeColors;
}
:deep(.xgplayer .xgplayer-drag) {
  background: util.$ThemeColors;
}
:deep(.xgplayer .xgplayer-progress-btn) {
  background: rgba(252, 220, 70, 0.3);
}
:deep(.danmu-icon) {
  display: none;
}
</style>
