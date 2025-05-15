<template>
  <div class="refund-steps-container">
    <div>
      <div class="step" v-if="single.logs.length>0">
        <div class="step_box">
          <!-- 左侧进度线 -->
          <div class="step_left"></div>
          <div class="step_right">
            <div class="right_content" v-for="(item, index) in single.logs" :key="index">
              <!-- 进度名称 -->
              <div>
                <p class="title f-ae" :class="{ 'titleActive': index == 0 }"
                  :style="{ color: item.textColor, fontWeight: index == 0 ? 'bold' : '400' }">
                  {{ item.text }}
                  <span class="title-active" v-if="(single.status == 10 || single.status == 9) && index == 0">
                    钱款退回至原账户
                  </span>
                </p>
              </div>
              <!--备注 -->
              <p class="result" v-if="item.desc && item.desc !== ''">
                <span>{{ item.desc }}</span>
              </p>
              <p class="result" v-if="(single.status == 3 || single.status == 4) && index == 0">
                <span style="color: red;">拒绝理由：{{ single.rejectReason }}</span>
              </p>
              <!-- 倒计时 -->
              <p class="result f-ac" v-if="index == 0 && item.endtime">
                <span>剩余{{ times.days > 0 ? `${times.days}天` : '' }}</span>
                <span class="active">
                  <el-countdown format="HH:mm:ss" :value="times.Timestamp" @finish="finish" />
                </span>
              </p>
              <!-- 进度时间 -->
              <p class="times" v-if="item.addtime && !item.endtime || (item.endtime && index != 0)">
                {{ timeFormat(item.addtime, 'yyyy-mm-dd hh:MM:ss') }}</p>
              <!-- 右侧的进度点 -->
              <p class="status" :class="{ 'statusActive': index == 0 }"
                :style="{ background: index == 0 ? '#fcdc46' : '#ccc', borderColor: index == 0 ? '#fcdc46' : '#ccc' }">
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="options-btn-bar">
      <div class="option-btn pointer" @click="revoke()" v-if="single.refundStatus == 0 && !single.deliveryNumber">取消退款
      </div>
    </div>
    <div class="address-bar f-jb-ac" v-if="order.isEntity == 1 && (single.status == 5 || single.deliveryNumber)">
      <div>
        <div class="receiving-cont">
          <div>收货人：{{ single.aftersaleCompanyAddress?.name }} {{ single.aftersaleCompanyAddress?.mobile }}</div>
          <div>{{ single.aftersaleCompanyAddress?.address }}</div>
        </div>
        <div class="sending-cont" v-if="single.deliveryName && single.deliveryNumber">
          <div class="sending-title">退货寄件信息</div>
          <div class="sending-info">快递公司：{{ single.deliveryName }}</div>
          <div class="sending-info">快递单号：{{ single.deliveryNumber }}</div>
        </div>
      </div>
      <div>
        <div class="add-address-btn pointer" @click="handlesendingpopup"
          v-if="!single.deliveryName || !single.deliveryNumber">
          填写退货寄件信息
        </div>
      </div>
    </div>

    <el-dialog v-model="addressDialogVisible" title="编辑邮寄信息" width="470" align-center>
      <div class="dialog-content">
        <el-form :model="addressform" label-width="auto" style="max-width: 400px">
          <el-form-item label="快递公司" prop="deliveryName">
            <el-select v-model="addressform.deliveryName" placeholder="请选择快递公司">
              <el-option :label="item.name" :value="item.name" v-for="(item, index) in CodeList" :key="index" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单单号" prop="deliveryNumber">
            <el-input v-model="addressform.deliveryNumber" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="save-btn pointer" @click="address">保存</div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { aftersale } from "@/utiles/types";
import {
  aftersaleAddress,
  companyCodeList,
  aftersaleCancel,
} from "@/api/order";
import { ElMessageBox, ElMessage } from "element-plus";
import { useUserStore } from "@/store/userStore";
import { defineEmits } from 'vue';
import { timeFormat } from "@/utiles/public"
const userStore = useUserStore();
const emit = defineEmits(['Steps']);
const props = defineProps({
  order: {
    type: Object,
    default: {}
  },
  single: {
    type: Object,
    default: <aftersale>{}
  },
});
const addressDialogVisible = ref(false);
const addressform = reactive({
  deliveryName: "",
  deliveryNumber: "",
});
const CodeList = ref(<any>[])
const times = ref({
  days: 0,
  hours: 24,
  minutes: 0,
  seconds: 0,
  Timestamp: 0
})
const logs = ref(<any>{})

// 打开地址弹窗
const handlesendingpopup = () => {
  addressDialogVisible.value = true;
};
// 确定地址
const address = async () => {
  if (!addressform.deliveryNumber) {
    ElMessage.error("请输入订单单号")
    return
  }
  const res = await aftersaleAddress({
    id: props.single.id,
    userId: userStore.userId,
    token: userStore.token,
    deliveryNumber: addressform.deliveryNumber,
    deliveryName: addressform.deliveryName
  });
  if (res.status == 0) {
    addressDialogVisible.value = false
    emit('Steps')
  }
}
// 撤销申请
const revoke = () => {
  ElMessageBox.confirm(
    '是否要撤销退款？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    const res = await aftersaleCancel({
      userId: userStore.userId,
      aftersaleId: props.single.id
    });
    if (res.status == 0) {
      ElMessage({
        type: 'success',
        message: '撤销成功!',
      })
      emit('Steps')
    }

  }).catch(() => { })
}
const getCodeList = async () => {
  const res = await companyCodeList({});
  if (res.status == 0) {
    CodeList.value = res.data
  }
}
const finish = () => {
  if (times.value.days == 0 && (times.value.hours == 0 && times.value.minutes == 0)) {
    emit('Steps')
  } else {
    formatTimeDifference(logs.value.endtime)
  }
}
const formatTimeDifference = (targetTimestamp: number) => {
  let currentTimestamp = Date.now();
  let differenceInMs = targetTimestamp - currentTimestamp;
  let totalSeconds = Math.floor(differenceInMs / 1000);
  // 计算天数
  let days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds %= (24 * 3600);
  // 计算小时数
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  // 计算分钟数
  let minutes = Math.floor(totalSeconds / 60);
  // 秒数
  let seconds = totalSeconds
  times.value.days = days
  times.value.hours = hours
  times.value.minutes = minutes
  times.value.seconds = seconds
  times.value.Timestamp = (hours * 3600 + minutes * 60 + seconds) * 1000
  console.log(times.value, 'times')
}
const onMountedClick = (singleData: any, orderData: any) => {
  // 判断是否需要快递公司信息
  if (orderData.isEntity == 1 && singleData.status == 5) {
    getCodeList()
  }
  // 判断是否需要倒计时
  if (singleData.logs && singleData.logs.length > 0) {
    logs.value = singleData.logs[0]
    if (logs.value.endtime) {
      formatTimeDifference(logs.value.endtime)
    }
  }
}
defineExpose({ onMountedClick })
</script>

<style lang="scss" scoped>
.refund-steps-container {
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.refund-title {
  font-size: 24px;
  font-weight: bold;
}

.refund-last-time {
  margin-top: 10px;
}

.refund-last-time .active {
  color: #ce9433;
}

.options-btn-bar {
  margin-top: 20px;
}

.option-btn {
  width: 150px;
  height: 50px;
  background: #ffffff;
  border-radius: 25px;
  border: 1px solid #dddddd;
  text-align: center;
  line-height: 50px;
}

.address-bar {
  width: 100%;
  background: #f6f6f6;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  margin-top: 20px;
}

.add-address-btn {
  width: 180px;
  height: 50px;
  background: util.$ThemeColors;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
}

.receiving-cont div:first-child {
  font-weight: bold;
  margin-bottom: 10px;
}

.sending-cont {
  margin-top: 25px;
}

.sending-title {
  font-size: 20px;
  font-weight: bold;
}

.sending-info {
  margin-top: 10px;
}

.save-btn {
  width: 200px;
  height: 50px;
  background: #fcdc46;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
}

p {
  margin: 0;
  padding: 0;
}

.step {
  // padding: 40px 0 30px;
}

.step_box {
  margin: 0 20px;
  margin-left: 10px;
  display: flex;

  .step_left {
    width: 2px;
    display: block;
    background-color: #DDDDDD;
    overflow: hidden;
  }

  .step_right {
    margin-left: 22px;
    margin-top: -10px;

    .right_content {
      position: relative;
      margin-bottom: 20px;

      .title {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #333333;
      }

      .title-active {
        font-size: 16px;
        color: #CE9433;
        margin-left: 5px;
      }

      .titleActive {
        font-size: 20px;
      }

      .times {
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 23px;
      }

      .status {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        border: 2px solid #ccc;
        position: absolute;
        top: 11px;
        background-color: #ccc;
        left: -28px;
        color: white;
        line-height: 12px;
        font-size: 10px;
        text-align: center;
      }

      .statusActive {
        width: 10px;
        height: 10px;
        left: -30px;
      }

      .result {
        font-size: 13px;
        margin: 2px 0;
      }

      &:last-of-type {
        margin-bottom: 0;

        .status {
          top: 14upx;
        }

        &::before {
          content: '';
          width: 6px;
          height: 100%;
          background-color: #FFFFFF;
          position: absolute;
          top: 22px;
          left: -24px;
        }
      }
    }
  }
}
</style>
