<template>
  <div class="home-main-cont">
    <div class="menu-list f-jb-ac">
      <div
        class="menu-item pointer"
        v-for="item in menuBarList"
        @click="handlemenuitemclick(item)"
      >
        <div class="menu-img-box">
          <img :src="item.img" />
        </div>
        <div class="menu-text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

interface menuItem {
  img: string;
  name: string;
  id: string;
}

const menuBarList = reactive([
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/2197420638247659067/menu1.png",
    name: "针灸",
    id: "rFKwCKLPSemtdt4vqEE2ag",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5950198688186327326/menu2.png",
    name: "推拿正骨",
    id: "9x9keDO0QyyAqv3uc3Qkrg",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/6595341156466738813/menu3.png",
    name: "经典经方",
    id: "EPG7cTKOR3SNhm--YuFztA",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/7304042390437673174/menu4.png",
    name: "辩证论证",
    id: "r1LdlA76Tj6I1MMkpNY54w",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5831443570271046801/menu5.png",
    name: "养生",
    id: "xkOClhIDTp-2l7Z5bYPfHA",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/8827289048460756305/menuimg.png",
    name: "门诊运营",
    id: "YSeZqRvISiugwSkiAPV_ow",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5348321836512636398/menu9.png",
    name: "特色疗法",
    id: "",
  },
  {
    img:
      "https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/10/5187121458019833523/menu8.png",
    name: "更多课程",
    id: "",
  },
]);

const handlemenuitemclick = (item: menuItem) => {
  console.log(item.id);
  router.push({ path: "/course", query: { id: item.id } });
};
</script>

<style lang="scss" scoped>
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
</style>
