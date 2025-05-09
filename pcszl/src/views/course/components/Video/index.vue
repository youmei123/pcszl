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
import { saveWatchTimeNewHuawei } from "@/api/course";
import { CourseVideoType } from "@/utiles/types";
import { useUserStore } from "@/store/userStore";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";
import HlsJsPlugin from "xgplayer-hls.js";
import { Events } from "xgplayer";

const userStore = useUserStore();
const xgplayer = ref<Player>();
const currentVideo = ref<CourseVideoType>();
const isshowposter = ref(true);

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
    plugins: [HlsJsPlugin],
  });
  console.log(xgplayer.value);
  // 播放时间改变
  xgplayer.value.on(Events.TIME_UPDATE, (e) => {
    emit("timeupdate", e.currentTime);
  });
  //播放资源发生变化 url 发生改变， 切换视频
  xgplayer.value.on(Events.URL_CHANGE, (e) => {
    console.log(e);
  });
};

onMounted(() => {
  getInit();
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

const startvideo = (item: CourseVideoType) => {
  let definition: any = [];
  if (xgplayer.value && xgplayer.value.cumulateTime > 0) {
    saveVideoRecord();
  }
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
  isshowposter.value = false;
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
  width: 840px;
  height: 473px;
  position: relative;
}
.poster-conter {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 9999;
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
</style>
