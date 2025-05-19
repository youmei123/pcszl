<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 15:27:28
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 17:48:46
 * @FilePath: \pcszl\src\views\usercenter\submitorder\components\EntityCreateOrder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="entity-tile-bar f-jb-ac">
      <div class="title-txt">确认收货地址</div>
      <div class="f-ac address-btn-group">
        <div class="add-address-btn pointer" @click="handleaddress">新建地址</div>
        <div class="manage-address-btn pointer" @click="handleaddressmg">管理地址</div>
      </div>
    </div>
    <div
      class="address-select-list f-jb-ac f-w"
      v-if="!isloading && tableData.length > 0"
    >
      <div
        class="address-item f-ac pointer"
        v-for="(item, ind) in tableData"
        @click="switchaddress(ind)"
        :class="{ active: select_address_index == ind }"
      >
        <div class="iconfont icon-ziyuan f-shrink0"></div>
        <div class="address-info">
          <div class="address-top-bar f-ac">
            <div class="address-name">{{ item.name }}</div>
            <div class="address-phone f-ac">
              <div class="phone-txt">{{ item.mobile }}</div>
              <div v-if="item.isDefault == 1" class="address-default">默认</div>
            </div>
          </div>
          <div class="address-text u-line-2">
            {{ item.area + " " + item.address }}
          </div>
        </div>
        <div
          v-if="select_address_index == ind"
          @click.stop="editaddress(item)"
          class="edit-address-btn pointer"
        >
          编辑
        </div>
      </div>
    </div>
    <div v-else style="height: 400px; position: relative">
      <loading
        v-if="isloading"
        :translateY="50"
        color="#FCDC46"
        active
        text="正在加载中..."
      />
      <el-empty v-else description="暂无数据" />
    </div>
    <AddressPopup ref="addressPopup" @editsuccess="editsuccess" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { addresslist } from "@/api/usercenter";
import { useUserStore } from "@/store/userStore";
import { AddressType } from "@/utiles/types";
import AddressPopup from "@/views/usercenter/menuitem/addressmanagement/components/AddressPopup/index.vue";
import { useRouter } from "vue-router";
onMounted(() => {
  getAddressList();
});

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

const emits = defineEmits<{
  (event: "addresschange", data: AddressType): void;
}>();

const router = useRouter();
const addressPopup = ref<InstanceType<typeof AddressPopup>>();
const select_address_index = ref(0);
const page = ref(1);
const tableData = ref<AddressType[]>([]);
const userStore = useUserStore();
const isloading = ref(false);

const getAddressList = async () => {
  const { data, count } = await addresslist({
    userId: userStore.userId,
    page: page.value,
  });
  tableData.value = data
  if(tableData.value.length>0){
    emits("addresschange", tableData.value[select_address_index.value]);
  }
  console.log(tableData.value);
};

const handleaddress = () => {
  if (addressPopup.value) {
    addressPopup.value.addopen();
  }
};

const editsuccess = () => {
  getAddressList();
};

const editaddress = (item: AddressType) => {
  if (addressPopup.value) {
    addressPopup.value.editopen(item);
  }
};

const handleaddressmg = () => {
  router.push("/usercenter/addressmanagement");
};

const switchaddress = (index: number) => {
  select_address_index.value = index;
  emits("addresschange", tableData.value[select_address_index.value]);
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
.address-top-bar{
  color: #000000;
}
.address-text{
  color: #000000;
}
.add-address-btn {
  margin-right: 30px;
}
.address-select-list {
  margin-bottom: 20px;
  margin-top:15px;
  max-height: 260px;
  overflow: auto;
}
.address-item {
  border: 1px solid #dddddd;
  width: 365px;
  height: 90px;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
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
