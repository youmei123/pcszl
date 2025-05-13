<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-11 11:00:20
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-13 10:58:22
 * @FilePath: \pcszl\src\views\course\coursevideo\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="video-content">
      <div class="content">
        <div class="breadcrumb-cont">
          <el-breadcrumb :separator-icon="DArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/course' }">全部课程</el-breadcrumb-item>
            <el-breadcrumb-item>看课</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="f-as" v-if="course">
          <div v-if="course?.courseCoverImg">
            <XGplayer
              ref="xgPlayer"
              :poster="course?.courseCoverImg"
              @timeupdate="(e) => videoCatalogue && videoCatalogue.upldateprogress(e)"
              @playdefaultvideo="
                () => videoCatalogue && videoCatalogue.playdefaultvideo()
              "
            />
            <VideoActionBar
              @actionbarserachchange="
                (e) => videoCatalogue && videoCatalogue.serachvideo(e)
              "
            />
          </div>
          <VideoCatalogue
            ref="videoCatalogue"
            :ispay="ispay"
            :classifyCount="course?.classifyCount"
            :courseId="course.id"
            :continue_watchtime="continue_watchtime"
            :continue_videoId="continue_videoId"
            :continue_videoClassifyId="continue_videoClassifyId"
            @ActiveVideo="handleActiveVideo"
          />
        </div>
        <div class="product-course-bar f-jb-ac">
          <div class="course-info">
            <div class="f-ac">
              <div class="course-title">{{ course?.courseName }}</div>
              <div class="vip-icon">svip免费</div>
            </div>
            <div class="watch-count">
              播放量{{transNumberToShort(course?.playCount!)}}
            </div>
          </div>
          <div class="pay-cont f-ac" v-if="ispay">
            <div class="price"><span>￥</span>{{ course?.coursePrice }}</div>
            <div class="pay-btn pointer" @click="coursepay">购买</div>
          </div>
          <div v-else></div>
        </div>
      </div>
    </div>
    <div class="product-course-info content f-jb-as">
      <div class="product-html">
        <div class="recommended-title">课程简介</div>
        <div v-html="course?.courseDescription"></div>
      </div>
      <div class="recommended-list">
        <div class="recommended-title">推荐课程</div>
        <div v-if="!re_loading && RecommendedCourseList.length > 0">
          <CourseItem
            v-for="(item, index) in RecommendedCourseList"
            :data="item"
            :key="index"
          />
        </div>
        <div v-else style="height: 400px; position: relative">
          <loading
            v-if="re_loading"
            :translateY="50"
            color="#FCDC46"
            active
            text="正在加载中..."
          />
          <el-empty v-else description="暂无数据" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import XGplayer from "../components/Video/index.vue";
import VideoCatalogue from "../components/VideoCatalogue/index.vue";
import VideoActionBar from "../components/VideoActionBar/index.vue";
import CourseItem from "@/components/CourseItem/index.vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { singleCourse } from "@/api/course";
import { CourseListType } from "@/utiles/types";
import { transNumberToShort } from "@/utiles/public";
import { ref, onMounted } from "vue";
import { CourseVideoType } from "@/utiles/types";
import { listCourse } from "@/api/home";
//继承接口
interface courseType extends CourseListType {
  classifyCount: number; //有无标签
}

const userStore = useUserStore();

onMounted(() => {
  getSingleCourse();
  getRecommendedCourseList();
});

const route = useRoute();
const courseId = route.query.courseId as string; //课程id
const course = ref<courseType>(); //课程对象
const currentVideo = ref<CourseVideoType>(); //当前播放的视频对象
const xgPlayer = ref<InstanceType<typeof XGplayer> | null>(null); //视频播放组件对象
const videoCatalogue = ref<InstanceType<typeof VideoCatalogue> | null>(null); //视频目录组件对象
const ispay = ref(false); //是否需要付费
const RecommendedCourseList = ref<CourseListType[]>([]); //推荐课程列表
const re_loading = ref(false); //推荐课程列表加载状态

const continue_watchtime: number = Number(route.query.watchTime) || 0; //继续观看时长
const continue_videoId: string = (route.query.videoId as string) || ""; //继续观看的视频id
const continue_videoClassifyId: string = (route.query.videoClassifyId as string) || ""; //继续观看的视频分类id

const getSingleCourse = async () => {
  const { data } = await singleCourse({
    courseId: courseId,
    userId: userStore.userId,
  });
  const { listVideo, ...singlecourse } = data;
  course.value = singlecourse as courseType;
  ispay.value = course.value.ispay <= 0 && course.value.isfree != 1 ? true : false;
  console.log(ispay.value);
  console.log(course.value);
};

const getRecommendedCourseList = async () => {
  re_loading.value = true;
  const { data } = await listCourse({
    page: 1,
    pageSize: 4,
    userId: userStore.userId,
    types: 1,
  });
  re_loading.value = false;
  RecommendedCourseList.value = data;
  console.log(data);
};

const handleActiveVideo = async (item: CourseVideoType) => {
  console.log(item);
  currentVideo.value = item;
  console.log(xgPlayer.value);
  if (xgPlayer.value) {
    xgPlayer.value.startvideo(item);
  }
};

const router = useRouter();
const coursepay = () => {
  router.push({
    path: "/submitorder",
    query: {
      types: 1,
      courseId: courseId,
    },
  });
};
</script>

<style lang="scss" scoped>
.page-container {
  padding-bottom: 15px;
  box-sizing: border-box;
}
.video-content {
  width: 100%;
  height: 710px;
  background-color: white;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.product-course-bar {
  height: 108px;
}
.course-title {
  font-size: 28px;
  font-weight: bold;
}
.vip-icon {
  background: linear-gradient(90deg, #ea4109, #f99202);
  border-radius: 4px 14px 4px 14px;
  width: 84px;
  height: 28px;
  font-size: 16px;
  color: #fff5e5;
  text-align: center;
  line-height: 28px;
  margin-left: 8px;
}
.watch-count {
  color: #ce9433;
  font-size: 16px;
  margin-top: 10px;
}
.price {
  font-size: 30px;
  color: #fb2b1e;
  font-weight: bold;
  margin-right: 30px;
}
.price span {
  font-size: 16px;
}
.pay-btn {
  width: 260px;
  height: 60px;
  background: util.$ThemeColors;
  border-radius: 30px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}
.product-course-info {
  padding-top: 20px;
  box-sizing: border-box;
}
.product-html {
  width: 810px;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  background-color: white;
}
.recommended-list {
  width: 370px;
  border-radius: 10px;
  padding: 25px 30px;
  box-sizing: border-box;
  background-color: white;
}
.product-item {
  display: block !important;
}
:deep(.product-poster) {
  width: 310px;
  height: 174px;
}
:deep(.product-info) {
  height: 104px;
  margin-top: 12px;
  margin-bottom: 20px;
}
.recommended-title {
  font-size: 24px;
  color: #212930;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
