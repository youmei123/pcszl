<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 15:27:34
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 17:49:37
 * @FilePath: \pcszl\src\views\usercenter\submitorder\components\VirtualOrder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="virtual-title">确认订单信息</div>
    <div class="virtual-product-content f-jb-ac">
      <div class="product-info f-ac" style="flex: 5">
        <div class="product-img f-shrink0">
          <img :src="data.img" />
        </div>
        <div>
          <div class="product-name u-lin-2">{{ data.name }}</div>
          <div class="specificationName">
            {{ data.specificationName }}
          </div>
        </div>
      </div>
      <div class="price-info f-ac" style="flex: 5">
        <div class="before-price" style="flex: 3.3">
          <div class="price-label">原价</div>
          <div style="height: 30px;line-height: 30px;" >￥{{ data.price }}</div>
        </div>
        <div class="product-count" style="flex: 3.3">
          <div class="price-label">数量</div>
          <div style="height: 30px;line-height: 30px;" v-if="type == 0">1</div>
          <el-input-number v-else v-model="num" :min="1" @change="handleChange" />
        </div>
        <div class="all-price" style="flex: 3.3">
          <div class="price-label">商品总价</div>
          <div style="height: 30px;line-height: 30px;" class="all-price-txt">￥{{ (data.price * num).toFixed(2) }}</div>
        </div>
      </div>
    </div>
    <div class="virtual-product-bottom f-jb-ac">
      <div class="Remarks-container f-as" style="flex: 1">
        <div>备注:</div>
        <div style="width: 85%">
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
        v-if="type != 0"
      >
        <div>配送服务</div>
        <div class="Delivery-info f-jb-ac">
          <div>快递</div>
          <div class="Delivery-price">￥{{ freightcharges }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

const emits = defineEmits<{
  (event: "productchange", {}): void;
}>();

const props = defineProps({
  type: {
    //0是虚拟   1是实体
    type: Number,
    default: 1,
  },
  data: {
    type: Object,
    default: {},
  },
  freightcharges: {
    //运费
    type: Number,
    default: 0,
  },
});
const num = ref(1);
const textarea = ref("");
console.log(props.data);
const handleChange = (value: number | undefined) => {
  console.log(value);
  emits("productchange", {
    count: value,
    remake: textarea.value,
    price: props.data.price,
  });
};
const getInfo = () => {
  return {
    remake: textarea.value,
    count: num.value,
    price: props.data.price,
  };
};

defineExpose({
  getInfo,
});
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
:deep(.Remarks-container){
  .el-textarea__inner:focus{
    box-shadow: 0 0 0 1px transparent inset !important;
  }
  textarea{
    padding: 0 !important;
    margin-top: -2px !important;
    margin-left: 8px !important;
  }
} 
:deep(.el-textarea__inner) {
  background-color: #f6f6f6;
  box-shadow: none;
}
:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #409eff inset;
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
.specificationName{
  color: #999999;
  font-size: 16px;
  margin-left: 30px;
  margin-top: 10px;
}
</style>
