<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-07-18 15:23:12
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-18 16:23:45
 * @FilePath: \pcszl\src\views\encyclopedia\herbaldiet\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="herbaldiet-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/encyclopedia' }">百科</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            route.query.type == "1" ? "中成药" : "中医药膳"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="herbaldiet-content">
        <div class="medicinal-list-cont">
          <div
            :title="val.name"
            class="medicinal-item pointer u-line-1"
            v-for="(val, ind) in list"
            @click="linkdetail(val.id, val.name)"
            :key="val.id"
          >
            {{ val.name }}
          </div>
        </div>
        <Pagination
          @changePage="handlePageChange"
          :count="totalcount"
          :currentPage="page"
          :pageSize="84"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { listZcy, zyyslist } from "@/api/encyclopedia";
import { DArrowRight } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";

interface ChinesePatentMedicineType {
  id: number;
  name: string;
  majorDrug: string;
  ingredient?: string;
}

onMounted(() => {
  if (route.query.type == "1") {
    getlistZcy();
  } else {
    getzyyslist();
  }
});
const route = useRoute();
const router = useRouter();
const page = ref(1);
const list = ref<ChinesePatentMedicineType[]>([]);
const totalcount = ref(0);
const getlistZcy = async () => {
  const { data, count } = await listZcy({
    page: page.value,
    pageSize: 84,
  });
  list.value = data;
  totalcount.value = count;
  console.log(list.value);
};

const getzyyslist = async () => {
  const { data, count } = await zyyslist({
    page: page.value,
    pageSize: 84,
  });
  list.value = data;
  totalcount.value = count;
  console.log(list.value);
};

const handlePageChange = (p: number) => {
  console.log(p);
  page.value = p;
  if (route.query.type == "1") {
    getlistZcy();
  } else {
    getzyyslist();
  }
};

const linkdetail = (id: number, name: string) => {
  router.push({
    path: "/detailpage",
    query: {
      type: route.query.type == "1" ? 1 : 2,
      id: id,
    },
  });
};
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 20px 0;
  box-sizing: border-box;
}
.herbaldiet-content {
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
}
.medicinal-list-cont {
  display: grid;
  grid-template-columns: repeat(7, 14.5%);
}
.medicinal-item {
  width: 150px;
  height: 52px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 10px 0 10px 0;
  position: relative;
  margin-right: 18px;
  margin-bottom: 18px;
  text-align: center;
  line-height: 52px;
}
.medicinal-item::before {
  content: "";
  position: absolute;
  bottom: -1px;
  left: -1px;
  width: 25px;
  height: 25px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/7/15/2603892544788896298/bottom_left.png");
}
.medicinal-item::after {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  width: 25px;
  height: 25px;
  background-image: url("https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/7/15/2300088613686133196/top_right.png");
}
</style>
