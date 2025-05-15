<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-24 13:44:36
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-15 10:32:07
 * @FilePath: \pcszl\src\views\usercenter\menuitem\accountsettings\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="account-settings from-cont">
      <div class="edit-btn pointer" v-if="!isEdit" @click="isEdit = true">修改资料</div>
      <el-form :model="user" :rules="rules" label-width="auto" style="max-width: 240px">
        <el-form-item label="头像" prop="headImg">
          <el-upload
            v-if="isEdit"
            class="avatar-uploader f-jc-ac"
            action="https://api.sdymei.com/api/upload/single"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div class="header-img" v-if="user.headImg">
              <img :src="user.headImg" />
            </div>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="header-img" v-else>
            <img src="@/assets/images/none_header.png" />
          </div>
        </el-form-item>
        <el-form-item label="账号">
          {{ user.mobile }}
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-if="isEdit" v-model="user.nickname" placeholder="请输入昵称" />
          <div v-else>
            {{ user.nickname || "暂无姓名" }}
          </div>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-if="isEdit" v-model="user.realname" placeholder="请输入真实姓名" />
          <div v-else>
            {{ user.realname || "暂无真实姓名" }}
          </div>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="user.sex" :disabled="!isEdit">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-if="isEdit" v-model="user.address" placeholder="请输入地区" />
          <div v-else>
            {{ user.address || "暂无地区" }}
          </div>
          <!-- <el-cascader
            size="large"
            :options="regionData"
            ref="cascaderRef"
            v-model="user.address"
            @change="handleChange"
            placeholder="请选择省市区"
          ></el-cascader> -->
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-if="isEdit" v-model="user.wechatId" placeholder="请输入微信号" />
          <div v-else>
            {{ user.wechatId || "暂无微信号" }}
          </div>
        </el-form-item>
        <!-- <el-form-item label="密码">
          <el-input v-model="form.name" />
        </el-form-item> -->
      </el-form>
      <div class="submit-bar f-ac" v-if="isEdit">
        <div @click="isEdit = false">取消</div>
        <div @click="saveUserInfo">提交</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { singleUser, updateUser } from "@/api/usercenter";
import { useUserStore } from "@/store/userStore";
import { UserInfo } from "@/utiles/types";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";

onMounted(() => {
  getSingleUser();
});

const userStore = useUserStore();
const isEdit = ref(false);

const user = ref<UserInfo>({
  nickname: "",
  sex: "",
  realname: "",
  address: "",
  wechatId: "",
  mobile: "",
  headImg: "",
});

const onSubmit = () => {
  console.log("submit!");
};
const cascaderRef = ref<any>();

const getSingleUser = async () => {
  const { data } = await singleUser({
    id: userStore.userId,
  });
  user.value = data;
  console.log(user.value);
};

const rules = reactive({
  headImg: [{ required: true, message: "请选择头像", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
});

const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  user.value.headImg = response.data;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const saveUserInfo = async () => {
  const { status } = await updateUser(user.value);
  if (status == "0") {
    ElMessage.success("修改成功");
    isEdit.value = false;
    getSingleUser();
  } else {
    ElMessage.error("修改失败");
  }
};
</script>

<style lang="scss" scoped>
.account-settings {
  position: relative;
}
.edit-btn {
  position: absolute;
  top: 0;
  right: 0;
}
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

.avatar-uploader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed #d9d9d9;
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
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
