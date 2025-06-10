<template>
  <div>
    <div style="position: relative;">
      <el-form :model="form" :rules="rules" label-width="auto" style="max-width: 500px">
      <el-form-item label="退货商品">
        <div class="form-product-bar f-ac">
          <div class="product-img-box">
            <img :src="order.productImg" />
          </div>
          <div class="product-info">
            <div>
              <div class="u-line-1">{{order.productName}}</div>
              <div class="u-line-1 order-product-SpecificationName" v-if="order.productSpecificationName">{{order.productSpecificationName}}</div>
            </div>
            <div class="f-ac">
              <div style="margin-right: 20px">￥{{order.productPrice}}</div>
              <div>X{{order.count}}</div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="申请类型" v-if="order.isEntity==1">
        <el-radio-group v-model="form.type" disabled>
          <el-radio :value="2">我要退货退款</el-radio>
          <el-radio :value="1">我要退款(无需退货)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收货状态" v-if="order.isEntity==1">
        <el-radio-group v-model="form.type" fill="red" disabled>
          <el-radio :value="2">已收到货</el-radio>
          <el-radio :value="1">未收到货</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="退款金额" prop="price">
        <!-- <view style="color:red;">
          <text>￥</text>
          <text>{{ form.price }}</text>
        </view> -->
        <el-input v-model="form.price" type="text"  placeholder="请输入退款金额" />
      </el-form-item>
      <el-form-item label="退款理由" prop="refundReason">
        <el-select v-model="form.refundReason" placeholder="请选择退款理由">
          <el-option :label="item" :value="item" v-for="(item,index) in refundReasonList" :key="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="退款说明">
        <el-input v-model="form.refundRemark" type="textarea" :rows="3" placeholder="请输入退款理由" />
      </el-form-item>
      <el-form-item label="上传凭证">
        <el-upload
          class="avatar-uploader"
          action="https://api.sdymei.com/api/upload/single"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.refundImg" :src="form.refundImg" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label=" ">
        <div class="submit-btn" @click="orderRefund()">提交</div>
      </el-form-item>
    </el-form>
    <div v-if="submitLoading">
      <loading :translateY="50"  color="#FCDC46" active text="正在加载中..." :height="550" />
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { ordersType } from "@/utiles/types";
import {
  reasonList,
  aftersaleSubmit,
 } from "@/api/order";
 import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();
const emit = defineEmits([ "Refund" ]);
const props = defineProps({
  order:{
    type: Object,
    default: <ordersType>{}
  },
  type:{
    type:Number,
    default:1
  },
});
//声明 uploadFile的类型
interface UploadFile {
  response: {
    data: string;
  };
}
const form = reactive({
  refundReason: "",//退款理由
  type: props.type,//售后类型 1:退款 2:退货退款
  refundRemark: "",//退款说明
  refundImg: "",
  price:0,//退款金额
});
const rules = reactive({
  refundReason: [
    { required: true, message: '请选择退款理由', trigger: 'change' },
  ],
  price:[
    { required: true, message: '请输入退款金额', trigger: 'blur' },
  ]
})
const refundReasonList=ref([])
const submitLoading=ref(false)
// 提交退款申请
const orderRefund = async () => {
  form.type=props.type
  if(Number(form.price)<= 0 || (Number(form.price) > Number(props.order.payPrice))){
    ElMessage.warning("退款金额不得小于0，不得大于实付金额！")
    return
  }
  // console.log(form)
  if(!form.refundReason){
    ElMessage.warning("请选择退款理由")
    return
  }
  submitLoading.value=true
  const res = await aftersaleSubmit({
    orderId: props.order.id,
    userId: userStore.userId,
    token: userStore.token,
    type:form.type,
    refundReason: form.refundReason,
    refundRemark: form.refundRemark,
    refundImg: form.refundImg,
    refundMoney: form.price,
  });
  submitLoading.value=false
  if(res.status==0){
    ElMessage.success("提交成功")
    emit('Refund')
  }
};
// 初始执行 外部调用
const onMountedClick=()=>{
  getReasonList()
  setTimeout(()=>{
    form.price=props.order.payPrice
  })
}
// 获取退款理由
const getReasonList= async ()=>{
  const res = await reasonList({});
  if(res.status==0){
    refundReasonList.value=res.data
  }
}
// 选择图片
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  console.log(uploadFile);
  const typedUploadFile = uploadFile as UploadFile;
  form.refundImg = typedUploadFile.response.data;
};
// 拦截过大图片
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("不得大于2MB!");
    return false;
  }
  return true;
};
defineExpose({onMountedClick})
</script>

<style lang="scss" scoped>
.product-info {
  margin-left: 10px;
}
.order-product-SpecificationName{
  font-size: 14px;
  color: #999999;
  margin-top: 3px;
}
.product-img-box {
  width: 60px;
  height: 60px;
  overflow: hidden;
  background-color: util.$ThemeColors;
}
.product-img-box img {
  width: 100%;
  height: 100%;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #dddddd;
}
.avatar-uploader img {
  width: 100px;
  height: 100px;
}

.el-icon.avatar-uploader-icon {
  font-size: 34px;
  color: #8c939d;
  text-align: center;
  width: 100px;
  height: 100px;
}
.submit-btn {
  width: 180px;
  height: 40px;
  background: util.$ThemeColors;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}


</style>
