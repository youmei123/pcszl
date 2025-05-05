<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 500px">
      <el-form-item label="退货商品">
        <div class="form-product-bar f-ac">
          <div class="product-img-box"></div>
          <div class="product-info">
            <div class="u-line-1">砭石按摩锥点按穴位文化用品</div>
            <div class="f-ac">
              <div style="margin-right: 20px">￥168</div>
              <div>X1</div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="申请类型">
        <el-radio-group v-model="form.resource">
          <el-radio value="Sponsor">我要退货退款</el-radio>
          <el-radio value="Venue">我要退款(无需退货)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收获状态">
        <el-radio-group v-model="form.resource" fill="red">
          <el-radio value="Sponsor">已收到货</el-radio>
          <el-radio value="Venue">未收到货</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="退款理由">
        <el-select v-model="form.region" placeholder="请选择退款理由">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="退款说明">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入退款理由" />
      </el-form-item>
      <el-form-item label="上传凭证">
        <el-upload
          class="avatar-uploader"
          action="https://api.sdymei.com/api/upload/single"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label=" ">
        <div class="submit-btn">提交</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  imageUrl: "",
});

//声明 uploadFile的类型
interface UploadFile {
  response: {
    data: string;
  };
}

const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  console.log(uploadFile);
  const typedUploadFile = uploadFile as UploadFile;
  form.imageUrl = typedUploadFile.response.data;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="scss" scoped>
.product-info {
  margin-left: 10px;
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
  width: 100%;
  height: 100%;
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
}
</style>
