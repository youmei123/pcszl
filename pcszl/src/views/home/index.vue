<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 10:06:14
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-09 16:00:39
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
    <div class="live-bar-cont">
      <div class="module-title-bar f-jb-ac">
        <div class="m-title-left f-ae">
          <div class="m-title">直播</div>
          <div class="iconfont icon-sangejiantou-right"></div>
        </div>
        <div class="m-title-right">直播课程，老师精讲</div>
      </div>
      <div class="live-list f-jb-ac">
        <div class="live-item f-ac" v-for="item in 3">
          <div class="live-poster-img f-shrink0">
            <img src="@/assets/images/menu1.png" />
          </div>
          <div class="live-info fd-c f-jb">
            <div class="live-title u-line-1">
              中医针灸学基础理论及六中医针灸学基础理论及六
            </div>
            <div class="live-time">10月18日 20:00</div>
            <div class="live-tearcher">李老师</div>
            <div class="xcx-btn f-jc-ac pointer">
              <div class="iconfont icon-xiaochengxu"></div>
              <div>去小程序查看</div>
            </div>
          </div>
        </div>
      </div>
      <div class="more-btn pointer f-jc-ac">
        <div style="margin-top: 10px" class="f-ac">
          查看更多
          <div class="iconfont icon-sangejiantou-right"></div>
        </div>
      </div>
    </div>
    <div class="module-cont">
      <div class="module-title-bar f-jb-ac">
        <div class="m-title-left f-ae">
          <div class="m-title">校长推荐</div>
          <div class="iconfont icon-sangejiantou-right"></div>
        </div>
        <div class="m-title-right">小黑校长推荐课程，拓展认知边界~</div>
      </div>
      <div class="product-list f-jb-ac f-w">
        <ProductItem v-for="() in 4" />
      </div>
      <div class="more-btn pointer f-jc-ac">
        <div class="f-ac" style="margin-top: 10px">
          换一换
          <div class="iconfont icon-huanyihuan"></div>
        </div>
      </div>
    </div>
    <div class="module-cont">
      <div class="module-title-bar f-jb-ac">
        <div class="m-title-left f-ae">
          <div class="m-title">民间特色疗法专区</div>
          <div class="iconfont icon-sangejiantou-right"></div>
        </div>
        <div class="m-title-right">更多精彩内容，等你来挖掘......</div>
      </div>
      <div class="featurezone-list f-jb-ac">
        <FeatureZoneItem v-for="() in 2" />
      </div>
      <div class="more-btn pointer f-jc-ac">
        <div style="margin-top: 10px" class="f-ac">
          查看更多
          <div class="iconfont icon-sangejiantou-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import ProductItem from "@/components/ProductItem/index.vue";
import FeatureZoneItem from "@/components/FeatureZoneItem/index.vue";
import menu1 from "@/assets/images/menu1.png";
import menu2 from "@/assets/images/menu2.png";
import menu3 from "@/assets/images/menu3.png";
import menu4 from "@/assets/images/menu4.png";
import menu5 from "@/assets/images/menu5.png";
import menuimg from "@/assets/images/menuimg.png";
import menu9 from "@/assets/images/menu9.png";
import menu8 from "@/assets/images/menu8.png";

const menuBarList = reactive([
  {
    img: menu1,
    name: "针灸",
  },
  {
    img: menu2,
    name: "推拿正骨",
  },
  {
    img: menu3,
    name: "经典经方",
  },
  {
    img: menu4,
    name: "辩证论证",
  },
  {
    img: menu5,
    name: "养生",
  },
  {
    img: menuimg,
    name: "门诊运营",
  },
  {
    img: menu9,
    name: "特色疗法",
  },
  {
    img: menu8,
    name: "更多课程",
  },
]);
</script>

<style lang="scss" scoped>
.page-cont {
  background-color: rgb(246, 246, 246);
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
.live-bar-cont {
  max-width: 1200px;
  height: 320px;
  border-radius: 10px;
  background-color: white;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
}
.module-title-bar {
  width: 100%;
  margin-bottom: 20px;
}
.m-title {
  font-size: 30px;
  font-weight: bold;
}
.m-title-left .iconfont {
  font-size: 24px;
  margin-left: 10px;
  transform: translateY(10%);
}
.m-title-right {
  color: #ce9433;
  font-size: 16px;
}
.live-poster-img {
  width: 130px;
  height: 130px;
  border-radius: 20px;
  overflow: hidden;
  background-color: util.$ThemeColors;
}
.live-poster-img img {
  width: 100%;
  height: 100%;
}
.live-info {
  width: 210px;
  height: 130px;
  margin-left: 15px;
}
.live-title {
  font-weight: bold;
  font-size: 18px;
}
.live-time {
  color: #999999;
  font-size: 16px;
}
.live-tearcher {
  font-size: 16px;
  color: #ce9433;
}
.xcx-btn {
  width: 150px;
  height: 40px;
  border-radius: 20px;
  background: #efefef;
}
.more-btn {
  width: 209px;
  height: 74px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/9/4334976739655543468/btn_bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 0 auto;
  color: white;
  font-size: 16px;
  margin-top: 15px;
  padding-right: 20px;
  box-sizing: border-box;
}

.more-btn .iconfont {
  margin-left: 5px;
}

.module-cont {
  max-width: 1200px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 30px;
  box-sizing: border-box;
}
.product-item {
  margin-bottom: 30px;
}
.product-item:nth-child(n + 3):nth-child(-n + 4) {
  margin-bottom: 0;
}
</style>
