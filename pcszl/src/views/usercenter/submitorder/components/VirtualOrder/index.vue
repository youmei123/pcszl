<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 15:27:34
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-12 16:40:01
 * @FilePath: \pcszl\src\views\usercenter\submitorder\components\VirtualOrder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="virtual-title">确认订单信息</div>
    <div class="virtual-product-content f-jb-ac">
      <div class="product-info f-ac" style="flex: 5">
        <div class="product-img">
          <img v-if="type == 1" :src="data.courseCoverImg" />
          <img v-else :src="data.img" />
        </div>
        <div class="product-name u-lin-2" v-if="type == 1">{{ data.courseName }}</div>
        <div class="product-name u-lin-2" v-else>{{ data.name }}</div>
      </div>
      <div class="price-info f-ac" style="flex: 5">
        <div class="before-price" style="flex: 3.3">
          <div class="price-label">原价</div>
          <div v-if="type == 1">￥{{ data.coursePrice }}</div>
          <div v-else>￥{{ data.price }}</div>
        </div>
        <div class="product-count" style="flex: 3.3">
          <div class="price-label">数量</div>
          <div v-if="type === 1">1</div>
          <el-input-number
            v-else
            v-model="num"
            :min="1"
            :max="10"
            @change="handleChange"
          />
        </div>
        <div class="all-price" style="flex: 3.3">
          <div class="price-label">商品总价</div>
          <div class="all-price-txt" v-if="type == 1">￥{{ data.coursePrice * num }}</div>
          <div class="all-price-txt" v-else>￥{{ data.price * num }}</div>
        </div>
      </div>
    </div>
    <div class="virtual-product-bottom f-jb-ac">
      <div class="Remarks-container f-as" style="flex: 1">
        <div>备注:</div>
        <div style="width: 90%">
          <el-input
            v-model="textarea"
            style="width: 100%"
            :rows="2"
            type="textarea"
            resize="none"
            placeholder="请输入备注"
          />
        </div>
      </div>
      <div
        class="Delivery-container Delivery"
        style="flex: 1; margin-left: 20px"
        v-if="type != 1"
      >
        <div>配送服务</div>
        <div class="Delivery-info f-jb-ac">
          <div>快递 包邮</div>
          <div class="Delivery-price">￥0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

const num = ref(1);
const textarea = ref("");

const props = defineProps({
  type: {
    //1是虚拟   2是实体
    type: Number,
    default: 1,
  },
  data: {
    type: Object,
    default: {},
  },
});

const handleChange = (value: number | undefined) => {
  console.log(value);
};
</script>

<style lang="scss" scoped>
.virtual-title {
  font-size: 22px;
  font-weight: bold;
}
.virtual-product-content {
  width: 100%;
  background: #f6f6f6;
  border-radius: 10px;
  height: 100px;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 10px;
}
.product-img {
  width: 60px;
  height: 60px;
  background-color: util.$ThemeColors;
  overflow: hidden;
}
.product-img img {
  width: 100%;
  height: 100%;
}
.product-name {
  margin-left: 30px;
}
.price-info > div {
  text-align: center;
}
.price-label {
  margin-bottom: 10px;
}
.all-price-txt {
  color: #fb2b1e;
}
.virtual-product-bottom {
  margin-top: 10px;
}
.Remarks-container,
.Delivery-container {
  width: 370px;
  background: #f6f6f6;
  height: 80px;
  border-radius: 10px;
  padding-left: 20px;
  padding-top: 15px;
  box-sizing: border-box;
}
:deep(.el-textarea__inner) {
  background-color: #f6f6f6;
  box-shadow: none;
}
:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px util.$ThemeColors inset;
  outline: none;
}
.Delivery {
  padding-right: 20px;
  box-sizing: border-box;
}
.Delivery-info {
  margin-top: 15px;
  color: #999999;
}
.Delivery-price {
  color: #fb2b1e;
}
</style>
