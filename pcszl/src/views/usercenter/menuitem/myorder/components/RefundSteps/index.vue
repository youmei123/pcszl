<template>
  <div class="refund-steps-container">
    <div class="refund-title">{{ single.statusText }}</div>
    <div class="refund-last-time">剩余6天<span>23时59分</span></div>
    <div class="options-btn-bar">
      <div class="option-btn pointer" @click="revoke()" v-if="single.refundStatus==0 && !single.deliveryNumber">取消退款</div>
    </div>
    <div class="address-bar f-jb-ac" v-if="order.isEntity==1 && (single.status==5 || single.deliveryNumber)">
      <div>
        <div class="receiving-cont">
          <div>收货人：{{ single.aftersaleCompanyAddress?.name }} {{ single.aftersaleCompanyAddress?.mobile }}</div>
          <div>{{ single.aftersaleCompanyAddress?.address }}</div>
        </div>
        <div class="sending-cont" v-if="single.deliveryName && single.deliveryNumber">
          <div class="sending-title">退货寄件信息</div>
          <div class="sending-info">快递公司：{{single.deliveryName}}</div>
          <div class="sending-info">快递单号：{{single.deliveryNumber}}</div>
        </div>
      </div>
      <div>
        <div class="add-address-btn pointer" @click="handlesendingpopup" v-if="!single.deliveryName || !single.deliveryNumber">
          填写退货寄件信息
        </div>
      </div>
    </div>
   
    <el-dialog
      v-model="addressDialogVisible"
      title="编辑邮寄信息"
      width="470"
      align-center
    >
      <div class="dialog-content">
        <el-form :model="addressform" label-width="auto" style="max-width: 400px">
          <el-form-item label="快递公司" prop="deliveryName">
             <el-select v-model="addressform.deliveryName" placeholder="请选择快递公司">
              <el-option :label="item.name" :value="item.name" v-for="(item,index) in CodeList" :key="index" />
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
import { ElMessageBox,ElMessage } from "element-plus";
import { useUserStore } from "@/store/userStore";
import { defineEmits } from 'vue';
const userStore = useUserStore();
const emit = defineEmits(['Steps']);
const props = defineProps({
  order:{
    type: Object,
    default: {}
  },
  single:{
    type: Object,
    default:<aftersale>{}
  },
});
const addressDialogVisible = ref(false);
const addressform = reactive({
  deliveryName: "",
  deliveryNumber: "",
});
const CodeList =ref(<any>[])
// 打开地址弹窗
const handlesendingpopup = () => {
  addressDialogVisible.value = true;
};
// 确定地址
const address = async ()=>{
    if(!addressform.deliveryNumber){
       ElMessage.error("请输入订单单号")
      return
    }
    const res = await aftersaleAddress({
      id:props.single.id,
      userId: userStore.userId,
      token: userStore.token,
      deliveryNumber:addressform.deliveryNumber,
      deliveryName:addressform.deliveryName
    });
    if(res.status==0){
      addressDialogVisible.value = false
      emit('Steps')
    }
}
// 撤销申请
const revoke =()=>{
  ElMessageBox.confirm(
    '是否要撤销退款？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
    const res = await aftersaleCancel({
      userId: userStore.userId,
      aftersaleId:props.single.id
    });
    if(res.status==0){
      ElMessage({
        type: 'success',
        message: '撤销成功!',
      })
      emit('Steps')
    }
    
  }).catch(() => {})
}
const getCodeList=async ()=>{
  const res = await companyCodeList({});
  if(res.status==0){
    CodeList.value=res.data
  }
}
// 判断是否需要快递公司信息
// if(props.order.isEntity==1 && props.single.status==5){
  getCodeList()
// }
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
.refund-last-time span {
  color: #ce9433;
}
.options-btn-bar {
  margin-top: 10px;
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
</style>
