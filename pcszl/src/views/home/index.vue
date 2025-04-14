<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 10:06:14
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-14 16:53:20
 * @FilePath: \pcszl\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEim
-->
<template>
  <div class="page-cont">
    <div class="banner-cont">
      <el-carousel height="600px">
        <el-carousel-item>
          <img
            src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/7/4046943659715620117/banner.png"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-main-cont">
      <div class="menu-list f-jb-ac">
        <div class="menu-item pointer" v-for="item in menuBarList">
          <div class="menu-img-box">
            <img :src="item.img" />
          </div>
          <div class="menu-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <SpecialColumn
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
    </SpecialColumn>
    <SpecialColumn
      title="校长推荐"
      desc="小黑校长推荐课程，拓展认知边界~"
      moretext="换一换"
      moreicon="icon-huanyihuan"
    >
      <div class="block-box f-jb-ac f-w">
        <CourseItem v-for="() in 4" />
      </div>
    </SpecialColumn>
    <SpecialColumn
      title="民间特色疗法专区"
      desc="更多精彩内容，等你来挖掘......"
      moretext="查看更多"
      moreicon="icon-sangejiantou-right"
    >
      <div class="block-box f-jb-ac">
        <FeatureZoneItem v-for="() in 2" />
      </div>
    </SpecialColumn>
    <SpecialColumn
      title="限时免费"
      desc="精品课程，等你来看"
      moretext="换一换"
      moreicon="icon-huanyihuan"
    >
      <div class="block-box f-jb-ac f-w">
        <CourseItem v-for="() in 4" />
      </div>
    </SpecialColumn>
  </div>
</template>

<script setup lang="ts">
import { listSzlLiveStreaming, listCourse } from "@/api/home";
import { ref, reactive, onMounted } from "vue";
import CourseItem from "@/components/CourseItem/index.vue";
import FeatureZoneItem from "@/views/home/components/FeatureZoneItem/index.vue";
import XcxLiveItem from "@/views/home/components/XcxLiveItem/index.vue";
import SpecialColumn from "@/views/home/components/SpecialColumn/index.vue";
import { LiveListType, CourseListType } from "@/utiles/types";

import { $loginPopup } from "@/utiles/login-popup";
const loginPopupInstance = $loginPopup();
// loginPopupInstance.open();

onMounted(() => {
  getHomeLiveList();
  getHomeRecommendedList();
});

const live_loading = ref(false); // 加载动画
const livelist = reactive<LiveListType[]>([]); // 直播列表
const re_page = ref(1); // 推荐列表页码
const recommendcourselist = reactive<CourseListType[]>([]); // 推荐课程列表

const getHomeLiveList = async () => {
  live_loading.value = true;
  const { data } = await listSzlLiveStreaming({
    page: 1,
    pageSize: 3,
    mobile: "",
    userId: "",
  });
  livelist.splice(0, livelist.length, ...(data || []));
  live_loading.value = false;
  console.log(data);
};

const getHomeRecommendedList = async () => {
  const { data } = await listCourse({
    page: re_page.value,
    pageSize: 4,
    userId: "",
    types: 1,
  });
  recommendcourselist.splice(0, recommendcourselist.length, ...(data || []));
};

const menuBarList = reactive([
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/2197420638247659067/menu1.png",
    name: "针灸",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5950198688186327326/menu2.png",
    name: "推拿正骨",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/6595341156466738813/menu3.png",
    name: "经典经方",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/7304042390437673174/menu4.png",
    name: "辩证论证",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5831443570271046801/menu5.png",
    name: "养生",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/8827289048460756305/menuimg.png",
    name: "门诊运营",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5348321836512636398/menu9.png",
    name: "特色疗法",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5187121458019833523/menu8.png",
    name: "更多课程",
  },
]);
</script>

<style lang="scss" scoped>
.page-cont {
  background-color: rgb(246, 246, 246);
  padding-bottom: 30px;
  box-sizing: border-box;
}
.home-main-cont {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.menu-list {
  text-align: center;
}
.menu-text {
  margin-top: 15px;
  color: #212930;
  font-size: 18px;
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
</style>
