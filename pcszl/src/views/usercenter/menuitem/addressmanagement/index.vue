<template>
  <div>
    <div class="address-management-bar f-jb-ac">
      <div class="title">收货地址管理</div>
      <div class="add-address-btn pointer" @click="addressDialogVisible = true">
        添加地址
      </div>
    </div>
    <div class="address-table">
      <el-table :data="tableData" border style="width: 100%" :table-layout="tableLayout">
        <el-table-column prop="name" label="收货人" width="180" align="center" />
        <el-table-column prop="mobile" label="手机号" width="180" align="center" />
        <el-table-column prop="address" label="所在地区" align="center" />
        <el-table-column prop="detailaddress" label="详细地址" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }"> 操作。。。 </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="addressDialogVisible"
      title="添加收货地址"
      width="470"
      align-center
    >
      <div class="dialog-content">
        <el-form
          :model="addressform"
          :rules="rules"
          label-width="auto"
          style="max-width: 400px"
        >
          <el-form-item label="地址信息" prop="address">
            <!-- <el-input v-model="form.name" /> -->
            <el-cascader
              size="large"
              :options="regionData"
              ref="cascaderRef"
              v-model="addressform.address"
              @change="handleChange"
              placeholder="请选择省市区"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailaddress">
            <el-input v-model="addressform.detailaddress" />
          </el-form-item>
          <el-form-item label="收货人信息" prop="name">
            <el-input v-model="addressform.name" />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="addressform.mobile" />
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
import type { TableInstance } from "element-plus";
import { regionData } from "element-china-area-data";

const tableLayout = ref<TableInstance["tableLayout"]>("fixed");
const addressDialogVisible = ref(false);

const addressform = reactive({
  name: "",
  mobile: "",
  address: "",
  detailaddress: "",
});

const tableData = ref([
  {
    mobile: "18766169804",
    name: "小明",
    address: "山东省 济南市 天桥区 宝华街道",
    detailaddress: "堤口路68号名泉广场C座1904",
  },
]);

const rules = reactive({
  name: [{ required: true, message: "请输入收货人姓名", trigger: "blur" }],
  address: [
    {
      required: true,
      message: "请选择省/市/区/街道",
      trigger: "blur",
    },
  ],
  detailaddress: [
    {
      required: true,
      message: "请输入详细地址信息",
      trigger: "blur",
    },
  ],
  mobile: [
    {
      required: true,
      message: "请输入手机号码",
      trigger: "blur",
    },
  ],
});

const cascaderRef = ref<any>();

const handleChange = (value: any) => {
  const checkedNodes = cascaderRef.value.getCheckedNodes(false) || [];
  console.log(checkedNodes[0].pathLabels.join(""));
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
