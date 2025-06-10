<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-06 09:38:40
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-06-03 13:52:13
 * @FilePath: \pcszl\src\views\home\components\MenuBar\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
import { HomeMenuList } from "@/utiles/staticdata";
const router = useRouter();

interface menuItem {
  img: string;
  name: string;
  id: string;
}

const menuBarList = HomeMenuList as menuItem[];

const handlemenuitemclick = (item: menuItem) => {
  console.log(item.id);
  if (item.name == "特色疗法") {
    router.push({ path: "/FeatureZone" });
  } else {
    router.push({ path: "/course", query: { id: item.id } });
  }
};
</script>

<style lang="scss" scoped>
.home-main-cont {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 10px;
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
.menu-item:hover .menu-text {
  color: #ce9433 !important;
}
</style>
