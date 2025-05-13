<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:28:42
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-13 11:05:19
 * @FilePath: \pcszl\src\views\usercenter\menuitem\mycourse\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="continue-bar f-jb-ac" v-if="mycourseRecord">
      <div class="f-ac">
        <div>上次观看至</div>
        <div class="continue-time">
          {{ mycourseRecord?.videoName }}
          {{ formatDuration(mycourseRecord?.watchTime || 0) }}
        </div>
      </div>
      <div>
        <div class="continue-btn f-jc-ac pointer" @click="continueplaywahtch">
          <el-icon :size="24"><CaretRight /></el-icon>继续观看
        </div>
      </div>
    </div>
    <div class="my-course-list" v-if="!isloading && mycourseList.length > 0">
      <MyCourseItem v-for="(item, index) in mycourseList" :data="item" :key="index" />
    </div>
    <div v-else style="height: 400px; position: relative">
      <loading
        v-if="isloading"
        :translateY="50"
        color="#FCDC46"
        active
        text="正在加载中..."
      />
      <el-empty v-else description="暂无数据" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { CaretRight } from "@element-plus/icons-vue";
import MyCourseItem from "../mycourse/components/MyCourseItem.vue";
import { listBuyCourse, getWatchTime } from "@/api/usercenter";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";
// 我的课程类型
interface MyCourseType {
  id: string;
  userId?: string;
  courseId?: string;
  courseExpireTime?: number;
  truePrice?: number;
  addtime?: number;
  courseName?: string;
  courseDescription?: string;
  courseSimpleDescription?: string;
  courseCoverImg?: string;
  szlWatchRecord?: {
    id: string;
    userId?: string;
    courseId?: string;
    videoId?: string;
    watchTime?: number;
    watchTimeAll?: number;
    maxWatchTime?: number;
    hwassetId?: string;
    addtime?: number;
    hwSize?: number;
    videoName?: string;
    bdMerchantId?: string;
    videoClassifyId?: string;
  };
  schedule?: number;
}
//我的看课记录类型
interface VideoWatchRecord {
  id: string;
  userId?: string;
  courseId?: string;
  videoId?: string;
  watchTime?: number;
  watchTimeAll?: number;
  maxWatchTime?: number;
  hwassetId?: string;
  addtime?: number;
  hwSize?: number;
  videoName?: string;
  bdMerchantId?: string;
  videoClassifyId?: string;
}

const userStore = useUserStore();
const mycourseList = ref<MyCourseType[]>([]);
const mycourseRecord = ref<VideoWatchRecord>();
const isloading = ref(false);
const router = useRouter();

onMounted(() => {
  getMyCourseList();
  getMyCourseRecord();
});

const getMyCourseList = async () => {
  isloading.value = true;
  const { data } = await listBuyCourse({
    userId: userStore.userId,
  });
  isloading.value = false;
  mycourseList.value = data;
  console.log(data);
};

const getMyCourseRecord = async () => {
  const { data } = await getWatchTime({
    userId: userStore.userId,
  });
  mycourseRecord.value = data;
  console.log(data);
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds =
    Math.round((seconds - hours * 3600 - minutes * 60) * 100) / 100;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

const continueplaywahtch = () => {
  if (mycourseRecord.value) {
    router.push({
      path: "/coursevideo",
      query: {
        courseId: mycourseRecord.value.courseId,
        watchTime: mycourseRecord.value.watchTime,
        videoId: mycourseRecord.value.videoId,
        videoClassifyId: mycourseRecord.value.videoClassifyId || 0,
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.continue-bar {
  width: 100%;
  height: 60px;
  background: #fdf8e2;
  border-radius: 4px;
  padding: 0 25px;
  box-sizing: border-box;
}
.continue-btn {
  width: 110px;
  height: 36px;
  background: util.$ThemeColors;
  border-radius: 18px;
}
.continue-time {
  margin-left: 15px;
  color: #ce9433;
}
</style>
