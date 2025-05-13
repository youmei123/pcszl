<template>
  <div>
    <div class="address-management-bar f-jb-ac">
      <div class="title">收货地址管理</div>
      <div class="add-address-btn pointer" @click="hanldaddress">添加地址</div>
    </div>
    <div class="address-table">
      <el-table :data="tableData" border style="width: 100%" :table-layout="tableLayout">
        <el-table-column prop="name" label="收货人" width="180" align="center" />
        <el-table-column prop="mobile" label="手机号" width="180" align="center" />
        <el-table-column prop="area" label="所在地区" align="center" />
        <el-table-column prop="address" label="详细地址" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <div class="btns-bar f-jb-ac pointer">
              <div>编辑</div>
              <div>删除</div>
              <div :class="{ default: row.isDefault == 1 }">
                {{ row.isDefault == 1 ? "默认地址" : "设为默认" }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-top: 30px">
        <Pagination
          @changePage="handlePageChange"
          :count="totalcount"
          :currentPage="page"
        />
      </div>
    </div>
    <AddressPopup ref="addressPopup" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { TableInstance } from "element-plus";
import { addresslist } from "@/api/usercenter";
import { useUserStore } from "@/store/userStore";
import { AddressType } from "@/utiles/types";
import AddressPopup from "./components/AddressPopup/index.vue";

const tableLayout = ref<TableInstance["tableLayout"]>("fixed");
const addressDialogVisible = ref(false);

const page = ref(1);
const tableData = ref<AddressType[]>([]);
const totalcount = ref(0);
const userStore = useUserStore();

const addressPopup = ref<InstanceType<typeof AddressPopup>>();

onMounted(() => {
  getAddressList();
});

const getAddressList = async () => {
  const { data, count } = await addresslist({
    userId: userStore.userId,
    page: page.value,
  });
  tableData.value = data;
  totalcount.value = count;
  console.log(tableData.value);
};

const hanldaddress = () => {
  if (addressPopup.value) {
    addressPopup.value.addopen();
  }
};

const handlePageChange = (p: number) => {
  console.log(page);
  page.value = p;
  getAddressList();
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
.add-address-btn {
  width: 101px;
  height: 37px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  text-align: center;
  line-height: 37px;
}
:deep(.el-table th.el-table__cell) {
  background-color: rgb(245, 247, 249);
  color: #212930;
  font-weight: bold;
  font-size: 14px;
}
.address-table {
  margin-top: 15px;
}
:deep(.el-cascader) {
  width: 318px;
}

.btns-bar div {
  padding: 4px 4px;
  box-sizing: border-box;
  border-radius: 4px;
}
.default {
  background-color: util.$ThemeColors;
}
</style>
