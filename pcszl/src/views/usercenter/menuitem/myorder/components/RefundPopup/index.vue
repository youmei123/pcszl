<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-05 10:07:57
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 14:25:02
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\components\RefundPopup\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="shad-box" v-if="visible" @click="$emit('close')">
    <div @click.stop class="popup-content">
      <div class="title-bar f-jb-ac">
        <div class="title-txt" v-if="order.status==1">商品已确认收货，{{order.deliveryName}}包裹:{{order.deliveryNumber}}</div>
        <div class="title-txt" v-if="order.status==3">商品还未发货</div>
        <div class="title-txt" v-if="order.status==4">商品已发货，{{order.deliveryName}}包裹:{{order.deliveryNumber}}</div>
        <div class="pointer" v-if="order.status==4">
          <el-icon :size="24" color="#B1B1B1"><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="refund-bar f-jb-ac pointer"  @click="linkToRefundPage(1)">
        <div class="f-ac">
          <div class="iconfont icon-tuihuo"></div>
          <div class="refund-txt">
            <div>我要退款（无需退货）</div>
            <div>未收到货，或与商家协商之后申请</div>
          </div>
        </div>
        <div class="pointer">
          <el-icon :size="24" color="#B1B1B1"><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="refund-bar f-jb-ac pointer" @click="linkToRefundPage(2)">
        <div class="f-ac">
          <div class="iconfont icon-tuihuo1"></div>
          <div class="refund-txt">
            <div>已收到货，我要退货退款</div>
            <div>需要您寄回已收到的货物</div>
          </div>
        </div>
        <div class="pointer">
          <el-icon :size="24" color="#B1B1B1"><ArrowRight /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  order:{
    type: Object,
    default: {}
  }
});
const router = useRouter();
const linkToRefundPage = (type: number) => {
  if(props.order.status==1 && type==1){
      ElMessage({
        type: 'warning',
        message: '当前已确认收货，请选择退货退款！',
      })
      return
  }else if(props.order.status==3 && type==2){
      ElMessage({
        type: 'warning',
        message: '暂未发货，请选择退款！',
      })
      return
  }
  router.push({
    path:"/orderrefund",
    query:{
      orderId:props.order.id,
      type:type
    }
  });
};
</script>

<style lang="scss" scoped>
.shad-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.popup-content {
  width: 500px;
  background: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  box-sizing: border-box;
}
.title-bar {
  width: 100%;
  height: 60px;
  background: #f6f6f6;
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
}
.title-txt {
  color: #000000;
}
.refund-bar {
  width: 100%;
  height: 90px;
  background: #f6f6f6;
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
}
.icon-tuihuo,
.icon-tuihuo1 {
  color: #fb2b1e;
  font-size: 24px;
  margin-right: 15px;
}
.refund-txt div:first-child {
  color: #212930;
}
.refund-txt div:last-child {
  color: #999999;
  margin-top: 10px;
}
</style>
