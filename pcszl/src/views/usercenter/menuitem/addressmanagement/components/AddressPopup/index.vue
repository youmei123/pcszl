<template>
  <div>
    <el-dialog
      v-model="addressDialogVisible"
      :title="addressform.id ? '修改地址' : '添加地址'"
      width="470"
      align-center
    >
      <div class="dialog-content">
        <el-form
          :model="addressform"
          :rules="rules"
          ref="ruleFormRef"
          label-width="auto"
          style="max-width: 400px"
        >
          <el-form-item label="地址信息" prop="arrayCodeList">
            <el-cascader
              size="large"
              :options="regionData"
              ref="cascaderRef"
              v-model="addressform.arrayCodeList"
              @change="handleChange"
              placeholder="请选择省市区"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="addressform.address" />
          </el-form-item>
          <el-form-item label="收货人信息" prop="name">
            <el-input v-model="addressform.name" />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="addressform.mobile" />
          </el-form-item>
          <el-form-item label="是否默认地址">
            <el-radio-group v-model="addressform.isDefault">
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="save-btn pointer" @click="submitForm(ruleFormRef)">保存</div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { addresssave, addressupdate } from "@/api/usercenter";
import { regionData } from "element-china-area-data";
import { AddressType } from "@/utiles/types";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/userStore";

const emit = defineEmits<{
  (e: "editsuccess"): void;
}>();

const cascaderRef = ref<any>();
const addressDialogVisible = ref(false);
const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>();
const addressform = ref<AddressType>({
  name: "",
  mobile: "",
  address: "",
  isDefault: 0,
  area: "",
  arrayCodeList: [],
});
const rules = reactive({
  name: [{ required: true, message: "请输入收货人姓名", trigger: "blur" }],
  arrayCodeList: [
    {
      required: true,
      message: "请选择省/市/区/街道",
      trigger: "blur",
    },
  ],
  address: [
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
    {
      validator: (
        rule: any,
        value: string,
        callback: (error?: Error | undefined) => void
      ) => {
        const reg = /^1[3-9]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      editaddress();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const editaddress = async () => {
  const { status, message } = addressform.value.id
    ? await addressupdate({ ...addressform.value, userId: userStore.userId })
    : await addresssave({ ...addressform.value, userId: userStore.userId });
  addressDialogVisible.value = false;
  if (status == "0") {
    if (addressform.value.id) {
      ElMessage({
        message: "修改地址成功",
        type: "success",
      });
    } else {
      ElMessage({
        message: "保存地址成功",
        type: "success",
      });
    }
    emit("editsuccess");
  } else {
    if (message) {
      ElMessage({
        message: message,
        type: "warning",
      });
    }
  }
};
const handleChange = (value: any) => {
  console.log(addressform.value);
  const checkedNodes = cascaderRef.value.getCheckedNodes(false) || [];
  addressform.value.area = checkedNodes[0].pathLabels.join("");
  console.log(addressform.value);
};

const addopen = () => {
  addressform.value = {
    name: "",
    mobile: "",
    address: "",
    isDefault: 0,
    area: "",
    arrayCodeList: [],
  };
  addressDialogVisible.value = true;
};

const editopen = (item: AddressType) => {
  addressform.value = item;
  addressDialogVisible.value = true;
};

defineExpose({
  addopen,
  editopen,
});
</script>

<style lang="scss" scoped>
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
