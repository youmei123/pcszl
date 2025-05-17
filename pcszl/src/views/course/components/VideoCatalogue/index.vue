<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-11 16:29:55
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-17 14:53:38
 * @FilePath: \pcszl\src\views\course\components\VideoCatalogue\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="video-catalogue">
    <!-- <div class="catalogue-title">目录</div> -->
    <div class="catalogue-cont" v-if="classifyCount > 0 && !loadingstatus">
      <el-collapse v-model="activeNames">
        <el-collapse-item :name="item.id" v-for="(item, index) in classifyVideoList">
          <template #title
            ><div class="item-title" :style="{ 'font-size': userStore.FontSize + 'px' }">
              {{ item.classifyName }}
            </div>
          </template>
          <div class="subitem-list">
            <div
              class="subitem f-jb-ac pointer"
              :style="{ 'font-size': userStore.FontSize + 'px' }"
              :class="{ active: activeId == val.id }"
              v-for="(val, ind) in item.videoList"
              @click="handlevideoclick(val, ind, index, item)"
            >
              <div class="f-as">
                <div class="iconfont icon-24gf-playCircle"></div>
                <div class="subitem-info">
                  <div class="sub-title u-line-2">{{ val.videoName }}</div>
                  <div class="sub-progress" v-if="val.watchTime && val.watchTime > 0">
                    已看{{ percentage(val) }}%
                  </div>
                  <div class="sub-progress" v-else>未看</div>
                </div>
              </div>
              <div v-if="ispay">
                <div v-if="val.isaudition && val.isaudition == 1" class="free-btn">
                  免费
                </div>
                <div v-else class="iconfont icon-lock"></div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      class="catalogue-cont notclassifyCount"
      v-else-if="classifyCount <= 0 && !loadingstatus"
    >
      <div class="subitem-list">
        <div
          class="subitem f-jb-ac pointer"
          :style="{ 'font-size': userStore.FontSize + 'px' }"
          :class="{ active: activeId == item.id }"
          v-for="(item, index) in videoList"
          @click="handlevideoclick(item, index)"
        >
          <div class="f-as">
            <div class="iconfont icon-24gf-playCircle"></div>
            <div class="subitem-info">
              <div class="sub-title u-line-2">
                {{ item.videoName }}
              </div>
              <div class="sub-progress" v-if="item.watchTime && item.watchTime > 0">
                已看{{ percentage(item) }}%
              </div>
              <div class="sub-progress" v-else>未看</div>
            </div>
          </div>
          <div v-if="ispay" :style="{ 'font-size': userStore.FontSize + 'px' }">
            <div v-if="item.isaudition && item.isaudition == 1" class="free-btn">
              免费
            </div>
            <div v-else class="iconfont icon-lock"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <loading
        v-if="loadingstatus"
        :translateY="50"
        :height="552"
        color="#fff"
        backgroundColor="#212930"
        active
        textColor="#fff"
        text="正在加载中..."
      />
      <el-empty v-else description="暂无数据" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import { szlCourseVideo, videolist } from "@/api/course";
import { useUserStore } from "@/store/userStore";
import { CourseVideoType } from "@/utiles/types";
import { ElMessage } from "element-plus";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance()?.appContext.config.globalProperties; // 获取全局属性
const props = defineProps({
  classifyCount: {
    //当前视频是否有无标签
    type: Number,
    default: 1,
  },
  courseId: {
    //课程id
    type: String,
    default: "",
  },
  currentTime: {
    //当前播放时间
    type: Number,
    default: 0,
  },
  ispay: {
    //是否需要支付购买
    type: Boolean,
    default: true,
  },
  continue_watchtime: {
    //继续观看时间
    type: Number,
    default: 0,
  },
  continue_videoId: {
    //继续观看视频id
    type: String,
    default: "",
  },
  continue_videoClassifyId: {
    //继续观看视频分类id
    type: String,
    default: "",
  },
});

// 定义请求传参类型
interface szlCourseVideoParams {
  courseId: string;
  userId: string;
  condition?: string;
}

//定义 标签视频列表类型
interface classifyvideotype {
  id: string;
  classifyName: string;
  videoList?: CourseVideoType[];
}

const emits = defineEmits<{
  (event: "ActiveVideo", item: CourseVideoType): void;
}>();

const loadingstatus = ref(false); //加载状态
const activeNames = ref(["1"]); //展开标签列表
const userStore = useUserStore(); //用户信息
const videoList = ref<CourseVideoType[]>([]); //视频列表
const classifyVideoList = ref<classifyvideotype[]>([]); //标签列表
const activeId = ref<string>(""); //选中视频id
const activeIndex = ref<number>(0); //选中视频index
const lastclassifyId = ref<string>(""); //最后一次选中的标签id
const classifyIndex = ref<number>(0); //选中标签视频index
const condition = ref<string>(""); //搜索条件

const loadData = async () => {
  if (props.classifyCount > 0) {
    getvideolist(0);
  } else {
    getSzlCourseVideo(0);
  }
};

// 获取非标签视频列表
const getSzlCourseVideo = async (type: number = 0) => {
  let params: szlCourseVideoParams = {
    courseId: props.courseId,
    userId: userStore.userId,
  };
  if (type == 1) {
    params.condition = condition.value;
  }
  loadingstatus.value = true;
  const { data } = await szlCourseVideo(params);
  loadingstatus.value = false;
  videoList.value = data;
  //默认加载时有播放进度参数，则直接播放
  if (type == 0) {
    if (props.continue_videoId && props.continue_watchtime > 0) {
      let videoindex = videoList.value.findIndex(
        (item) => item.id == props.continue_videoId
      );
      activeId.value = props.continue_videoId;
      activeIndex.value = videoindex;
      emits("ActiveVideo", videoList.value[videoindex]);
    }
  }
  //清空搜索条件后，重置下标
  if (type == 2 || type == 1) {
    console.log("重新赋值");
    activeIndex.value = videoList.value.findIndex((item) => item.id == activeId.value);
    console.log(activeIndex.value);
  }
  console.log(videoList);
};
// 获取标签视频列表
const getvideolist = async (type: number = 0) => {
  let params: szlCourseVideoParams = {
    courseId: props.courseId,
    userId: userStore.userId,
  };
  if (type == 1) {
    console.log("type==1");
    params.condition = condition.value;
  }
  loadingstatus.value = true;
  const { data } = await videolist(params);
  loadingstatus.value = false;
  classifyVideoList.value = data;
  //默认加载时有播放进度参数，则直接播放
  if (type == 0) {
    if (
      props.continue_videoId &&
      props.continue_watchtime > 0 &&
      props.continue_videoClassifyId
    ) {
      let classify_Index = classifyVideoList.value.findIndex(
        (item) => item.id == props.continue_videoClassifyId
      );
      if (classifyVideoList.value[classify_Index].videoList) {
        let video_index = classifyVideoList.value[classify_Index].videoList.findIndex(
          (item) => item.id == props.continue_videoId
        );
        activeId.value = props.continue_videoId;
        activeIndex.value = video_index;
        classifyIndex.value = classify_Index;
        activeNames.value.push(classifyVideoList.value[classify_Index].id);
        emits(
          "ActiveVideo",
          classifyVideoList.value[classify_Index].videoList[video_index]
        );
      }
    }
  }
  if (type == 2 || type == 1) {
    console.log("重新赋值");
    classifyIndex.value = classifyVideoList.value.findIndex((item) => {
      return lastclassifyId.value == item.id;
    });
    const category = classifyVideoList.value[classifyIndex.value];
    if (category) {
      const videolist = category.videoList;
      if (videolist && videolist.length > 0) {
        activeIndex.value = videolist.findIndex((item) => item.id == activeId.value);
      }
    }
  }
  console.log(classifyVideoList.value);
};

//观看进度
const percentage = (item: CourseVideoType): number => {
  if (!item.watchTime || !item.hwDuration) {
    return 0;
  }
  let percentage = (item.watchTime / item.hwDuration) * 100;
  if (percentage > 100) {
    return 100;
  } else {
    return Number(percentage.toFixed(2));
  }
};
//更新观看进度
const upldateprogress = (e: number) => {
  if (props.classifyCount > 0) {
    const category = classifyVideoList.value[classifyIndex.value];
    if (category && category.videoList) {
      const video = category.videoList[activeIndex.value];
      if (video) {
        video.watchTime = e;
      }
    }
  } else {
    videoList.value[activeIndex.value].watchTime = e;
  }
};
//点击视频
const handlevideoclick = (
  item: CourseVideoType,
  index: number,
  pindex?: number,
  pitem?: classifyvideotype
) => {
  if (!userStore.token) {
    instance?.$openLoginPopup();
    return;
  }
  if (item.isaudition != 1 && props.ispay) {
    ElMessage.warning("请先购买课程");
    return;
  }
  activeId.value = item.id;
  activeIndex.value = index;
  console.log(activeId.value);
  if (props.classifyCount > 0 && pindex) {
    classifyIndex.value = pindex;
    if (pitem) {
      lastclassifyId.value = pitem.id;
    }
  }
  emits("ActiveVideo", item);
};

const playdefaultvideo = async () => {
  if (!userStore.token) {
    instance?.$openLoginPopup();
    return;
  }
  if (props.ispay) {
    ElMessage.warning("请先购买课程");
    return;
  }
  console.log("播放默认视频");
  if (props.classifyCount > 0) {
    if (classifyVideoList.value.length > 0) {
      const category = classifyVideoList.value[0];
      if (category && category.videoList) {
        const video = category.videoList[0];
        if (video) {
          activeId.value = video.id;
          activeIndex.value = 0;
          classifyIndex.value = 0;
          lastclassifyId.value = category.id;
          activeNames.value.push(category.id);
          emits("ActiveVideo", video);
        }
      }
    }
  } else {
    if (videoList.value.length > 0) {
      activeId.value = videoList.value[0].id;
      activeIndex.value = 0;
      emits("ActiveVideo", videoList.value[0]);
    }
  }
};

const serachvideo = (e: string) => {
  console.log("传进来了~");
  console.log(e);
  condition.value = e;
  if (props.classifyCount > 0) {
    getvideolist(1);
  } else {
    getSzlCourseVideo(1);
  }
};
// 导出方法
defineExpose({
  upldateprogress,
  serachvideo,
  playdefaultvideo,
  loadData,
});
</script>

<style lang="scss" scoped>
.video-catalogue {
  position: relative;
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
  overflow-y: auto;
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
  border-bottom: 1px solid #eee;
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
    border-bottom: 1px solid #eee;
  }
}

:deep(.el-collapse :not(.is-active) button) {
  // 应用动画，设置动画名称、动画持续时间、延迟时间和播放次数
  animation: addBorder 0.1s 0.3s 1 forwards;
}

:deep(.el-collapse-item__arrow){
  font-size: 26px; 
}

.item-title {
  height: 16px;
  line-height: 16px;
  border-left: 3px solid util.$ThemeColors;
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
  color: #212930;
  // font-size: 16px;
}
.sub-progress {
  color: #999999;
}
.icon-lock {
  color: #949494;
  font-size: 24px;
}
.icon-24gf-playCircle {
  color: #dddddd;
  font-size: 22px;
}
.notclassifyCount {
  padding-top: 10px;
  box-sizing: border-box;
}
.active {
  color: #d0e1f0 !important;
}
.free-btn {
  width: 60px;
  height: 34px;
  background: #ffffff;
  border-radius: 17px;
  border: 1px solid #ce9433;
  text-align: center;
  line-height: 34px;
  font-size: 16px;
  color: #ce9433;
}
</style>
