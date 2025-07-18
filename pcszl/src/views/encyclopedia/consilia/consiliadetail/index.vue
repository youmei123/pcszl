<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-06-10 15:45:29
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-07-14 16:23:30
 * @FilePath: \pcszl\src\views\encyclopedia\consilia\consiliadetail\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="consiliadetail-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/encyclopedia' }">百科</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/consilia' }">名家医案</el-breadcrumb-item>
          <el-breadcrumb-item>{{ singleCase?.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="consiliadetail-content">
        <div class="page-title">
          <div>{{ singleCase?.name }}</div>
          <div class="page-title-icon"></div>
        </div>
        <div class="consiliadetail-item f-ac" v-if="singleCase?.doctor">
          <div class="label">医家:</div>
          <div class="text">{{ singleCase.doctor }}</div>
        </div>
        <div class="consiliadetail-item f-ac" v-if="singleCase?.symptom">
          <div class="label">症状:</div>
          <div class="text">{{ singleCase.symptom }}</div>
        </div>
        <!-- <div class="consiliadetail-item f-ac">
          <div class="label">提要:</div>
          <div class="text">两肩疼，颈椎骨质增生。桂枝汤治痹证。</div>
        </div> -->
        <div class="line"></div>
        <div class="subject-title f-ac">
          <div class="subject-title-text">诊断</div>
          <img
            src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2024/9/4/6293567052712973405/disease_img.png"
          />
        </div>
        <div class="detail-item-cont" v-if="singleCase?.noOwnership">
          <div class="row-text">{{ singleCase.noOwnership }}</div>
        </div>
        <div class="detail-item-cont" v-if="singleCase?.patient">
          <div class="row-label">患者</div>
          <div class="row-text">{{ singleCase.patient }}</div>
        </div>
        <div class="detail-item-cont" v-if="singleCase?.firstVisit">
          <div class="row-label">初诊</div>
          <div class="row-text">{{ singleCase.firstVisit }}</div>
          <div class="row-text" v-if="singleCase.firstPrescription">
            {{ singleCase.firstPrescription }}
          </div>
        </div>
        <div class="detail-item-cont" v-if="singleCase?.secondVisit">
          <div class="row-label">二诊</div>
          <div class="row-text">{{ singleCase.secondVisit }}</div>
          <div class="row-text" v-if="singleCase.secondPrescription">
            {{ singleCase.secondPrescription }}
          </div>
        </div>
        <div class="detail-item-cont" v-if="singleCase?.thirdVisit">
          <div class="row-label">三诊</div>
          <div class="row-text">{{ singleCase.thirdVisit }}</div>
          <div class="row-text" v-if="singleCase.thirdPrescription">
            {{ singleCase.thirdPrescription }}
          </div>
        </div>
        <div class="detail-item-cont" v-if="singleCase?.fourthVisit">
          <div class="row-label">四诊</div>
          <div class="row-text">{{ singleCase.fourthVisit }}</div>
          <div class="row-text" v-if="singleCase.fourthPrescription">
            {{ singleCase.fourthPrescription }}
          </div>
        </div>
        <div class="detail-item-cont" v-if="singleCase?.fifthVisit">
          <div class="row-label">五诊</div>
          <div class="row-text">{{ singleCase.fifthVisit }}</div>
          <div class="row-text" v-if="singleCase.fifthPrescription">
            {{ singleCase.fifthPrescription }}
          </div>
        </div>
        <div class="detail-item-cont" v-if="singleCase?.sixthVisit">
          <div class="row-label">五诊</div>
          <div class="row-text">{{ singleCase.sixthVisit }}</div>
          <div class="row-text" v-if="singleCase.sixthPrescription">
            {{ singleCase.sixthPrescription }}
          </div>
        </div>
        <div class="btn-bar f-jc-ac">
          <div
            class="btn pointer f-jc-ac"
            @click="pageTurning('prev')"
            :class="{ disabled: currentIndex == 0 }"
          >
            <el-icon :size="18"><ArrowLeft /></el-icon>看上一篇
          </div>
          <div
            class="btn pointer f-jc-ac"
            @click="pageTurning('next')"
            :class="{ disabled: currentIndex == idlist.length - 1 }"
          >
            看下一篇<el-icon :size="18"><ArrowRight /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { singleMjyaSecond, listMjyaSecond } from "@/api/encyclopedia";
import { ArrowLeft, ArrowRight, DArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { ElMessage } from "element-plus";
onMounted(() => {
  getsingleMjyaSecond();
  getlistMjyaSecond();
});

const route = useRoute();
const userStore = useUserStore();
const singleCase = ref();
const idlist = ref<number[]>([]);
const currentIndex = ref(0);
const id = ref<number>(Number(route.query.id));
const getsingleMjyaSecond = async () => {
  const { data } = await singleMjyaSecond({
    id: id.value,
    userId: userStore.userId,
  });
  singleCase.value = data;
  console.log(data);
};

const getlistMjyaSecond = async () => {
  const { data } = await listMjyaSecond({
    page: route.query.page,
    firstId: route.query.firstId,
    pageSize: 24,
  });
  idlist.value = data.map((item: { id: number }) => item.id);
  currentIndex.value = idlist.value.indexOf(Number(route.query.id));
};

const pageTurning = (type: string) => {
  if (type === "prev") {
    if (currentIndex.value === 0) {
      ElMessage.warning("已经是当前页的第一篇了");
      return;
    }
    currentIndex.value--;
  } else {
    if (currentIndex.value === idlist.value.length - 1) {
      ElMessage.warning("已经是当前页的最后一篇了");
      return;
    }
    currentIndex.value++;
  }
  id.value = idlist.value[currentIndex.value];
  getsingleMjyaSecond();
};
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 30px 0;
  box-sizing: border-box;
}
.consiliadetail-content {
  padding: 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
}
.page-title {
  font-weight: bold;
  font-size: 26px;
  color: #212930;
  position: relative;
  margin-bottom: 10px;
}
.page-title div:first-child {
  position: relative;
  z-index: 10;
}
.page-title-icon {
  position: absolute;
  left: -7px;
  bottom: -4px;
  width: 22px;
  height: 22px;
  background: #fcdc46;
  z-index: 5;
}
.consiliadetail-item {
  line-height: 40px;
}
.consiliadetail-item .label {
  color: #ce9433;
  margin-right: 25px;
}
.consiliadetail-item .text {
  color: #212930;
}
.line {
  width: 100%;
  border-top: 1px solid #dddddd;
  margin: 20px 0;
}
.subject-title {
  margin-bottom: 20px;
}
.subject-title-text {
  font-size: 22px;
  font-weight: bold;
  margin-right: 5px;
}
.detail-item-cont {
  line-height: 30px;
}
.detail-item-cont .row-label {
  color: #ce9433;
}
.detail-item-cont .row-text {
  color: #212930;
}
.btn-bar {
  margin-top: 30px;
}
.btn {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ce9433;
  color: #ce9433;
  margin: 0 10px;
}
.disabled {
  color: #bbbbbb !important;
  border-color: #bbbbbb !important;
}
</style>
