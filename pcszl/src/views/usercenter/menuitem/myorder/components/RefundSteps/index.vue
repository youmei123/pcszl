<template>
  <div class="refund-steps-container">
    <div class="refund-title">商家已同意退款申请，请尽早发货</div>
    <div class="refund-last-time">剩余6天<span>23时59分</span></div>
    <div class="options-btn-bar">
      <div class="option-btn pointer">取消退款</div>
    </div>
    <div class="address-bar f-jb-ac">
      <div>
        <div class="receiving-cont">
          <div>收货人：师芝林退货 17712341234</div>
          <div>山东省临沂市北城新区颐高上海街一期</div>
        </div>
        <div class="sending-cont" v-if="false">
          <div class="sending-title">退货寄件信息</div>
          <div class="sending-info">快递公司：申通</div>
          <div class="sending-info">快递单号：1234567890</div>
        </div>
      </div>
      <div>
        <div class="add-address-btn pointer" v-if="true" @click="handlesendingpopup">
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
          <el-form-item label="快递公司" prop="detailaddress">
            <el-input v-model="addressform.company" />
          </el-form-item>
          <el-form-item label="订单单号" prop="name">
            <el-input v-model="addressform.ordernumber" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="save-btn pointer">保存</div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
const addressDialogVisible = ref(false);

const addressform = reactive({
  company: "",
  ordernumber: "",
});

const handlesendingpopup = () => {
  addressDialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.refund-steps-container {
  padding: 20px;
  box-sizing: border-box;
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
