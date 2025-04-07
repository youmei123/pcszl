<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 10:06:14
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-07 17:17:01
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
    <div class="live-bar-cont"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

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
}
</style>
