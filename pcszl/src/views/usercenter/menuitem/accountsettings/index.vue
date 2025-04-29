<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 13:44:36
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-29 17:02:10
 * @FilePath: \pcszl\src\views\usercenter\menuitem\accountsettings\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="account-settings from-cont">
      <el-form :model="form" label-width="auto" style="max-width: 240px">
        <el-form-item label="头像">
          <div class="header-img">
            <img src="@/assets/images/none_header.png" />
          </div>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.resource">
            <el-radio value="Sponsor">男</el-radio>
            <el-radio value="Venue">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区">
          <!-- <el-input v-model="form.name" /> -->
          <el-cascader
            size="large"
            :options="regionData"
            ref="cascaderRef"
            v-model="form.provinces"
            @change="handleChange"
            placeholder="请选择省市区"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <div class="submit-bar f-ac">
        <div>取消</div>
        <div>提交</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { Avatar } from "@element-plus/icons-vue";
import { regionData } from "element-china-area-data";
const isEdit = ref(false);

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  provinces: "",
});

const onSubmit = () => {
  console.log("submit!");
};

const cascaderRef = ref<any>();

const handleChange = (value: any) => {
  const checkedNodes = cascaderRef.value.getCheckedNodes(false) || [];
  console.log(checkedNodes[0].pathLabels.join(""));
};
</script>

<style lang="scss" scoped>
.header-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  background-color: rgb(192, 196, 204);
}
.header-img img {
  width: 100%;
  height: 100%;
}
:deep(.el-form-item__label-wrap) {
  align-items: center;
}
.submit-bar > div {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.submit-bar > div:first-child {
  background-color: #f5f5f5;
}
.submit-bar > div:last-child {
  background-color: util.$ThemeColors;
  margin-left: 10px;
}
</style>
