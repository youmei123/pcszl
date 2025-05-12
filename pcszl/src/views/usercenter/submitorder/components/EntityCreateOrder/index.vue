<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 15:27:28
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-12 16:32:22
 * @FilePath: \pcszl\src\views\usercenter\submitorder\components\EntityCreateOrder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="entity-tile-bar f-jb-ac">
      <div class="title-txt">确认收货地址</div>
      <div class="f-ac address-btn-group">
        <div class="add-address-btn pointer">新建地址</div>
        <div class="manage-address-btn pointer">管理地址</div>
      </div>
    </div>
    <div class="address-select-list f-jb-ac f-w">
      <div
        class="address-item f-jb-ac pointer"
        v-for="(item, index) in 3"
        @click="switchaddress(index)"
        :class="{ active: select_address_index == index }"
      >
        <div class="iconfont icon-ziyuan f-shrink0"></div>
        <div class="address-info">
          <div class="address-top-bar f-ac">
            <div class="address-name">小明</div>
            <div class="address-phone f-ac">
              <div class="phone-txt">13500100203</div>
              <div v-if="index == 0" class="address-default">默认</div>
            </div>
          </div>
          <div class="address-text u-line-2">
            山东省济南市历城区王舍人街(济南东站地 铁站出口步行120米)
          </div>
        </div>
        <div
          v-if="select_address_index == index"
          @click.stop=""
          class="edit-address-btn pointer"
        >
          编辑
        </div>
      </div>
    </div>
    <VirtualCreateOrder :type="2" :data="product" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import VirtualCreateOrder from "../VirtualOrder/index.vue";
const select_address_index = ref(0);

const props = defineProps({
  type: {
    //1是虚拟   2是实体
    type: Number,
    default: 1,
  },
  product: {
    type: Object,
    default: {},
  },
});

const switchaddress = (index: number) => {
  select_address_index.value = index;
  console.log(select_address_index.value);
};
</script>

<style lang="scss" scoped>
.title-txt {
  font-size: 22px;
  font-weight: bold;
}
.address-btn-group {
  font-size: 16px;
}
.add-address-btn {
  margin-right: 30px;
}
.address-select-list {
  margin-bottom: 30px;
}
.address-item {
  border: 1px solid #dddddd;
  width: 365px;
  height: 100px;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 15px;
  position: relative;
}
.address-name {
  margin-right: 20px;
}
.address-text {
  line-height: 20px;
  margin-top: 10px;
}
.icon-ziyuan {
  font-size: 20px;
  margin-right: 10px;
}
.active {
  border: 1px solid #fb2b1e !important;
  color: #fb2b1e !important;
}
.edit-address-btn {
  width: 32px;
  height: 20px;
  background: #999999;
  border-radius: 5px 0px 9px 0px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.address-default {
  width: 32px;
  height: 20px;
  font-size: 12px;
  color: white;
  border-radius: 5px;
  background: #fb2b1e;
  margin-left: 5px;
  text-align: center;
  line-height: 20px;
}
</style>
