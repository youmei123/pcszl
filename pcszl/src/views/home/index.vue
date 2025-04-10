<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 10:06:14
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-10 16:52:26
 * @FilePath: \pcszl\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 10:06:14
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-09 15:54:23
 * @FilePath: \pcszl\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
      <div class="block-box f-jb-ac">
        <XcxLiveItem v-for="() in 3" />
        <!-- <loading :translateY="50" color="#FCDC46" active text="正在加载中..." /> -->
      </div>
    </SpecialColumn>
    <SpecialColumn
      title="校长推荐"
      desc="小黑校长推荐课程，拓展认知边界~"
      moretext="换一换"
      moreicon="icon-huanyihuan"
    >
      <div class="block-box f-jb-ac f-w">
        <ProductItem v-for="() in 4" />
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
        <ProductItem v-for="() in 4" />
      </div>
    </SpecialColumn>
  </div>
</template>

<script setup lang="ts">
import { listSzlLiveStreaming } from "@/api/home";
import { reactive, onMounted } from "vue";
import ProductItem from "@/components/ProductItem/index.vue";
import FeatureZoneItem from "@/components/FeatureZoneItem/index.vue";
import XcxLiveItem from "@/components/XcxLiveItem/index.vue";
import SpecialColumn from "@/components/SpecialColumn/index.vue";

onMounted(() => {
  getHomeLiveList();
});

const getHomeLiveList = async () => {
  const { data } = await listSzlLiveStreaming({
    page: 1,
    pageSize: 3,
    mobile: "",
    userId: "",
  });
  console.log(data);
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
