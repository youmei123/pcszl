<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 10:06:14
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 16:30:57
 * @FilePath: \pcszl\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEim
-->
<template>
  <div class="page-cont">
    <div class="banner-cont">
      <el-carousel height="600px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img width="100%" height="100%" :src="item.imgurl" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <MenuBar />
    </div>
    <!-- <SpecialColumn
      title="直播"
      desc="直播课程，老师精讲"
      moretext="查看更多"
      moreicon="icon-sangejiantou-right"
    >
      <div class="block-box f-ac">
        <XcxLiveItem
          v-for="(item, index) in livelist"
          :data="item"
          v-if="!live_loading && livelist.length > 0"
        />
        <loading v-else :translateY="50" color="#FCDC46" active text="正在加载中..." />
      </div>
    </SpecialColumn> -->
    <SpecialColumn
      title="校长推荐"
      desc="小黑校长推荐课程，拓展认知边界~"
      moretext="换一换"
      moreicon="icon-huanyihuan"
      @btnchange="handlebtnchange"
    >
      <div class="block-box f-jb-ac f-w">
        <CourseItem
          v-if="!recommendcourse_loading && recommendcourselist.length > 0"
          v-for="(item, index) in recommendcourselist"
          :data="item"
        />
        <loading v-else :translateY="50" color="#FCDC46" active text="正在加载中..." />
      </div>
    </SpecialColumn>
    <SpecialColumn
      title="民间特色疗法专区"
      desc="更多精彩内容，等你来挖掘......"
      moretext="查看更多"
      moreicon="icon-sangejiantou-right"
      @btnchange="handlebtnchange"
    >
      <div class="block-box f-jb-ac">
        <FeatureZoneItem
          v-if="!precinctList_loading && precinctList.length > 0"
          v-for="(item, index) in precinctList"
          :data="item"
        />
        <loading v-else :translateY="50" color="#FCDC46" active text="正在加载中..." />
      </div>
    </SpecialColumn>
    <SpecialColumn
      title="限时免费"
      desc="精品课程，等你来看"
      moretext="换一换"
      moreicon="icon-huanyihuan"
      @btnchange="handlebtnchange"
    >
      <div class="block-box f-jb-ac f-w free">
        <CourseItem
          v-if="!fr_loading && fr_list.length > 0"
          v-for="(item, index) in fr_list"
          :data="item"
        />
        <loading v-else :translateY="50" color="#FCDC46" active text="正在加载中..." />
      </div>
    </SpecialColumn>
  </div>
</template>

<script setup lang="ts">
import { listSzlLiveStreaming, listCourse, zonelist, listBanner } from "@/api/home";
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import MenuBar from "@/views/home/components/MenuBar/index.vue";
import CourseItem from "@/components/CourseItem/index.vue";
import FeatureZoneItem from "@/views/home/components/FeatureZoneItem/index.vue";
import XcxLiveItem from "@/views/home/components/XcxLiveItem/index.vue";
import SpecialColumn from "@/views/home/components/SpecialColumn/index.vue";
import { LiveListType, CourseListType } from "@/utiles/types";
import { useRouter } from "vue-router";

onMounted(() => {
  getBanner(); //banners
  // getHomeLiveList(); //直播
  getHomeRecommendedList(); //推荐课程
  getPrecinctList(); //专区
  getFreecourse(); //免费课程
});

const userStore = useUserStore();
const router = useRouter();

const bannerList = ref<any[]>([
  {
    id: "1",
    imgurl:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/5/15/7243095221545083702/1.jpg",
  },
  {
    id: "2",
    imgurl:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/5/15/5511654677825041644/2.jpg",
  },
]); // 轮播图列表

const live_loading = ref(false); // 直播列表加载动画
const livelist = reactive<LiveListType[]>([]); // 直播列表

const re_page = ref(1); // 推荐列表页码
const recommendcourselist = reactive<CourseListType[]>([]); // 推荐课程列表
const recommendcourse_loading = ref(false); // 推荐课程列表加载动画
const re_count = ref(0); // 推荐课程总数

const pi_page = ref(1); // 专区列表页码
const precinctList = reactive<CourseListType[]>([]); // 专区列表
const precinctList_loading = ref(false); // 专区加载动画

const fr_page = ref(1); // 限时免费列表页码
const fr_count = ref(0); // 限时免费总数
const fr_loading = ref(false); // 限时免费列表加载动画
const fr_list = reactive<CourseListType[]>([]); // 限时免费列表

const getBanner = async () => {
  const { data } = await listBanner({
    type: 2,
  });
  bannerList.value = data || [];
  console.log(data);
};

const getHomeLiveList = async () => {
  live_loading.value = true;
  const { data } = await listSzlLiveStreaming({
    page: 1,
    pageSize: 3,
    mobile: "",
    userId: userStore.userId || "",
  });
  livelist.splice(0, livelist.length, ...(data || []));
  live_loading.value = false;
  console.log(data);
};

const getHomeRecommendedList = async () => {
  recommendcourse_loading.value = true;
  const { data, count } = await listCourse({
    page: re_page.value,
    pageSize: 4,
    userId: userStore.userId || "",
    types: 1,
  });
  recommendcourselist.splice(0, recommendcourselist.length, ...(data || []));
  re_count.value = count || 0;
  recommendcourse_loading.value = false;
};

const getPrecinctList = async () => {
  recommendcourse_loading.value = true;
  const { data, count } = await zonelist({
    page: pi_page.value,
    size: 2,
  });
  precinctList.splice(0, precinctList.length, ...(data || []));
  precinctList_loading.value = false;
};

const getFreecourse = async () => {
  fr_loading.value = true;
  const { data, count } = await listCourse({
    page: fr_page.value,
    pageSize: 4,
    userId: userStore.userId || "",
    types: 3,
    isfree: 1,
  });
  fr_list.splice(0, fr_list.length, ...(data || []));
  fr_count.value = count || 0;
  fr_loading.value = false;
};

const handlebtnchange = (title: string) => {
  if (title == "校长推荐") {
    if (re_page.value * 4 >= re_count.value) {
      re_page.value = 1;
    } else {
      re_page.value++;
    }
    getHomeRecommendedList();
  }
  if (title == "限时免费") {
    if (fr_page.value * 4 >= fr_count.value) {
      fr_page.value = 1;
    } else {
      fr_page.value++;
    }
    getFreecourse();
  }
  if (title == "民间特色疗法专区") {
    router.push({ name: "FeatureZone" });
  }
};
</script>

<style lang="scss" scoped>
.page-cont {
  background-color: rgb(246, 246, 246);
  padding-bottom: 30px;
  box-sizing: border-box;
}

.product-item {
  margin-bottom: 30px;
}
.product-item:nth-child(n + 3):nth-child(-n + 4) {
  margin-bottom: 0;
}
.block-box {
  position: relative;
  min-height: 150px;
}
.free :deep(.product-item){
  margin-bottom: 0;
}
</style>
