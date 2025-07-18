<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-14 16:39:26
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-18 14:50:46
 * @FilePath: \pcszl\src\views\encyclopedia\medicinal\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container f-jc-as">
    <el-affix :offset="0" position="top" z-index="20" target=".page-container">
      <div class="sticky-nav">
        <div
          class="nav-item pointer"
          :class="{ 'sel-nav': SelectNavIndex == index }"
          v-for="(item, index) in navlist"
          @click="handnavclick(index)"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </div>
    </el-affix>
    <div class="medicinal-container content f-shrink0">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/encyclopedia' }">百科</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            route.query.type == "1" ? "中医方剂" : "常用中药"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="medicinal-content">
        <div class="title-bar f-jb-ac">
          <div class="f-ac">
            <div class="title-txt f-shrink0">{{ Diaphoretic?.name }}</div>
            <div class="title-desc u-line-1">
              {{ Diaphoretic?.abbreviation }}
            </div>
          </div>
          <div>
            <div class="title-btn pointer f-jc-ac" @click="linkdetail">
              查看详情<el-icon :size="16"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
        <div
          class="medicinal-box"
          v-for="(item, index) in DecoctionCategorylist"
          :key="item.id"
        >
          <div class="medicinal-title">{{ item.name }}</div>
          <div class="medicinal-list-cont">
            <div
              class="medicinal-item pointer"
              @click="linkdetailthree(val, index)"
              v-for="(val, ind) in item.thirdList"
              :key="val.id"
            >
              {{ val.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  firstlist,
  secondlist,
  listCyzyFirst,
  listCyzySecond,
  listCyzyThird,
} from "@/api/encyclopedia";
import { DArrowRight, ArrowRight } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
interface DiaphoreticType {
  id: string;
  name: string;
  type: string;
  attention: string;
  abbreviation: string;
}

interface DecoctionCategoryType {
  id: string;
  name: string;
  thirdList: Array<{
    id: string;
    name: string;
    composition: string;
  }>;
}

onMounted(() => {
  if (route.query.type == "1") {
    getfirstlist();
  } else {
    getlistCyzyFirst();
  }
});

const navlist = ref<DiaphoreticType[]>([]);
const SelectNavIndex = ref(0);
const Diaphoretic = ref<DiaphoreticType>();
const DecoctionCategorylist = ref<DecoctionCategoryType[]>([]);

const getfirstlist = async () => {
  const { data } = await firstlist();
  console.log(data);
  navlist.value = data || [];
  if (navlist.value.length > 0) {
    Diaphoretic.value = navlist.value[0];
    getsecondlist();
  }
};

const getlistCyzyFirst = async () => {
  const { data } = await listCyzyFirst();
  console.log(data);
  navlist.value = data || [];
  if (navlist.value.length > 0) {
    Diaphoretic.value = navlist.value[0];
    getlistCyzySecond();
  }
};

const getlistCyzySecond = async () => {
  const { data } = await listCyzySecond({
    firstId: navlist.value[SelectNavIndex.value].id,
  });
  if (data.length > 0) {
    const updatedData = await Promise.all(
      data.map(async (item: { id: number; name: string; composition: string }) => {
        const list = await getlistCyzyThird(item.id);
        return {
          ...item,
          thirdList: list,
        }; // 使用展开运算符创建新的对象
      })
    );
    DecoctionCategorylist.value = updatedData;
    console.log(DecoctionCategorylist.value);
  }
};

const getlistCyzyThird = async (id: number) => {
  const { data } = await listCyzyThird({
    secondId: id,
  });
  return data;
};

const getsecondlist = async () => {
  console.log(navlist.value);
  const { data } = await secondlist({
    firstId: navlist.value[SelectNavIndex.value].id,
  });
  if (data.length > 0) {
    DecoctionCategorylist.value = data;
  }
};

const handnavclick = (index: number) => {
  SelectNavIndex.value = index;
  Diaphoretic.value = navlist.value[index];
  getsecondlist();
};

const linkdetail = () => {
  console.log(Diaphoretic.value);
  if (route.query.type == "1") {
    router.push({
      path: "/detailpage",
      query: {
        type: 4,
        index: SelectNavIndex.value,
      },
    });
  } else {
    router.push({
      path: "/detailpage",
      query: {
        type: 5,
        id: navlist.value[SelectNavIndex.value].id,
      },
    });
  }
};

const linkdetailthree = (
  item: {
    id: string;
    name: string;
    composition: string;
  },
  index: number
) => {
  console.log(item);
  if (route.query.type == "1") {
    router.push({
      path: "/detailpage",
      query: {
        type: 3,
        id: item.id,
      },
    });
  } else {
    router.push({
      path: "/detailpage",
      query: {
        type: 6,
        id: item.id,
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.medicinal-container {
  position: relative;
}
.breadcrumb-cont {
  padding: 20px 0;
  box-sizing: border-box;
}
.medicinal-content {
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
}
.title-bar {
  width: 100%;
  height: 70px;
  background: #fcdc46;
  border-radius: 10px;
  padding: 15px 30px;
  box-sizing: border-box;
}
.title-txt {
  font-weight: bold;
  font-size: 22px;
  margin-right: 30px;
}
.title-desc {
  color: #212930;
}
.title-btn {
  width: 110px;
  height: 40px;
  background: #212930;
  border-radius: 20px;
  color: #fcdc46;
}
.medicinal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 30px;
}
.medicinal-item {
  padding: 18px 28px;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #dddddd;
  border-radius: 10px;
  position: relative;
  margin-right: 18px;
  margin-bottom: 18px;
}
.medicinal-item::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: -2px;
  width: 25px;
  height: 25px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/7/15/2603892544788896298/bottom_left.png");
}
.medicinal-item::after {
  content: "";
  position: absolute;
  top: -2px;
  right: -2px;
  width: 25px;
  height: 25px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/7/15/2300088613686133196/top_right.png");
}
.sticky-nav {
  position: absolute;
  width: 120px;
  height: 710px;
  background: #ffffff;
  border-radius: 10px;
  padding: 25px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  scrollbar-width: none;
  left: 210px;
  margin-top: 50px;
}
.sticky-nav::-webkit-scrollbar {
  display: none;
}
.nav-item {
  margin-bottom: 30px;
  text-align: center;
}
.sel-nav {
  color: #ce9433;
}
</style>
